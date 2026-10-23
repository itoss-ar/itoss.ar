# Kubernetes User Creation for ITOSS Integration
## Purpose

This document describes two authentication methods for integrating ITOSS with the Kubernetes API:

1. **Bearer Token Authentication** using a Service Account with a long-lived token.

2. **Mutual TLS (mTLS)** using a client certificate.

For security reasons, a read-only RBAC role is recommended in both scenarios.

---

# Option 1 - Service Account with Bearer Token

## Architecture

```text
ITOSS
   |
   | HTTPS + Bearer Token
   |
   v
Kubernetes API Server
```

---

## Step 1 - Create the Service Account

Create the file:

`itoss-service-account.yaml`

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: itoss-reader
  namespace: kube-system
```

Apply it:

```bash
kubectl apply -f itoss-service-account.yaml
```

Verify:

```bash
kubectl get serviceaccount -n kube-system
```

---

## Step 2 - Create the Read-Only ClusterRole

Create the file:

`itoss-clusterrole.yaml`

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: itoss-readonly
rules:
  - apiGroups: [""]
    resources:
      - nodes
      - namespaces
      - pods
      - services
      - endpoints
      - events
      - persistentvolumes
      - persistentvolumeclaims
    verbs: ["get", "list", "watch"]

  - apiGroups: ["apps"]
    resources:
      - deployments
      - statefulsets
      - daemonsets
      - replicasets
    verbs: ["get", "list", "watch"]

  - apiGroups: ["batch"]
    resources:
      - jobs
      - cronjobs
    verbs: ["get", "list", "watch"]

  - apiGroups: ["networking.k8s.io"]
    resources:
      - ingresses
    verbs: ["get", "list", "watch"]

  - apiGroups: ["metrics.k8s.io"]
    resources:
      - nodes
      - pods
    verbs: ["get", "list"]
```

Apply it:

```bash
kubectl apply -f itoss-clusterrole.yaml
```

---

## Step 3 - Bind the Role to the Service Account

Create the file:

`itoss-clusterrolebinding.yaml`

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: itoss-readonly-binding
subjects:
  - kind: ServiceAccount
    name: itoss-reader
    namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: itoss-readonly
```

Apply it:

```bash
kubectl apply -f itoss-clusterrolebinding.yaml
```

---

## Step 4 - Create a Long-Lived Token

Recent Kubernetes releases generate temporary tokens with:

```bash
kubectl create token
```

To obtain a long-lived Service Account token, create a Secret explicitly.

Create:

`itoss-token-secret.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: itoss-token
  namespace: kube-system
  annotations:
    kubernetes.io/service-account.name: itoss-reader
type: kubernetes.io/service-account-token
```

Apply it:

```bash
kubectl apply -f itoss-token-secret.yaml
```

Verify:

```bash
kubectl get secret itoss-token -n kube-system
```

---

## Step 5 - Retrieve the Token

```bash
kubectl get secret itoss-token \
-n kube-system \
-o jsonpath='{.data.token}' \
| base64 -d
```

Example output:

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6...
```

Store this value securely.

---

## Step 6 - Export the Cluster CA Certificate

```bash
kubectl config view --raw \
-o jsonpath='{.clusters[0].cluster.certificate-authority-data}' \
| base64 -d > ca.crt
```

---

## Step 7 - Test Authentication

```bash
curl \
--cacert ca.crt \
-H "Authorization: Bearer TOKEN" \
https://K8S_SERVER:6443/api/v1/nodes
```

---

## ITOSS Configuration Parameters

```text
API URL
Bearer Token
CA Certificate
```

---

# Option 2 - Client Certificate Authentication (mTLS)

## Architecture

```text
ITOSS
   |
   | Mutual TLS (mTLS)
   |
   |-- ca.crt
   |-- itoss.crt
   |-- itoss.key
   |
   v
Kubernetes API Server
```

---

## Step 1 - Generate a Private Key

```bash
openssl genrsa -out itoss.key 4096
```

---

## Step 2 - Generate a Certificate Signing Request (CSR)

```bash
openssl req -new \
-key itoss.key \
-out itoss.csr \
-subj "/CN=itoss/O=monitoring"
```

Where:

```text
CN = Kubernetes Username
O  = Kubernetes Group
```

Result:

```text
Username: itoss
Group: monitoring
```

---

## Step 3 - Create the Kubernetes CSR

```bash
CSR_BASE64=$(base64 -w0 < itoss.csr)

cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: itoss-csr
spec:
  groups:
    - system:authenticated
  request: ${CSR_BASE64}
  signerName: kubernetes.io/kube-apiserver-client
  usages:
    - client auth
EOF
```

---

## Step 4 - Approve the CSR

```bash
kubectl certificate approve itoss-csr
```

---

## Step 5 - Retrieve the Signed Certificate

```bash
kubectl get csr itoss-csr \
-o jsonpath='{.status.certificate}' \
| base64 -d > itoss.crt
```

You should now have:

```text
itoss.crt
itoss.key
```

---

## Step 6 - Export the Cluster CA Certificate

```bash
kubectl config view --raw \
-o jsonpath='{.clusters[0].cluster.certificate-authority-data}' \
| base64 -d > ca.crt
```

---

## Step 7 - Create the Read-Only Role

Use the same `itoss-readonly` ClusterRole defined in Option 1.

---

## Step 8 - Bind the User to the Role

Create:

`itoss-certificate-binding.yaml`

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: itoss-certificate-binding
subjects:
  - kind: User
    name: itoss
    apiGroup: rbac.authorization.k8s.io
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: itoss-readonly
```

Apply it:

```bash
kubectl apply -f itoss-certificate-binding.yaml
```

---

## Step 9 - Test mTLS Authentication

```bash
curl \
--cacert ca.crt \
--cert itoss.crt \
--key itoss.key \
https://K8S_SERVER:6443/api/v1/nodes
```

---

## ITOSS Configuration Parameters

```text
API URL
CA Certificate
Client Certificate
Client Private Key
```

---

# Authentication Comparison

## Bearer Token

### Advantages

- Easy to configure
- Easy to integrate
- Supported by all Kubernetes distributions

### Disadvantages

- Token lifecycle management
- Possible expiration or rotation
- Less suitable for permanent integrations

### Recommended For

```text
Development
Testing
Proof of Concept (PoC)
Lab Environments
```

---

## Client Certificate (mTLS)

### Advantages

- No dependency on access tokens
- Very stable authentication model
- Suitable for long-term unattended integrations
- Strong mutual authentication

### Disadvantages

- Certificate lifecycle management
- More complex initial setup

### Recommended For

```text
Production Environments
24x7 Monitoring Platforms
Permanent Integrations
Enterprise Deployments
```

---

# Recommended Approach for ITOSS

For production environments:

```text
Client Certificate Authentication (mTLS)
```

For development, testing, or laboratory environments:

```text
Bearer Token Authentication
```

In both scenarios, the integration should use a dedicated read-only RBAC role:

```text
itoss-readonly
```

to restrict access to monitoring and inventory data only.
