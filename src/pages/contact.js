import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const EMAILJS_SERVICE_ID = 'itoss_demo';
const EMAILJS_TEMPLATE_ID = 'itoss_contact_sales';
const EMAILJS_PUBLIC_KEY = 'gSf8iHWlXEam0Ujpk';

const INTERESTS = ['General monitoring', 'Multi-tenant for MSP', 'SAP BASIS', 'KPIs / Reporting', 'Migrate from classic OSS', 'Lifecycle / Patching'];
const SIZES = ['<10 hosts', '10-50 hosts', '50-200 hosts', '200-1000 hosts', '1000+ hosts'];
const ROLES = ['CTO / IT Director', 'IT Ops Manager', 'SRE / DevOps Lead', 'Sysadmin / Engineer', 'MSP Owner', 'SAP Consultant', 'Other'];

const fieldStyle = {
  background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-md)',
  padding: '12px 14px', color: 'var(--text)', fontFamily: 'inherit', fontSize: 14, outline: 'none', width: '100%',
};

function Field({label, children}) {
  return (
    <div style={{marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8}}>
      <label className="mono" style={{fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase'}}>{label}</label>
      {children}
    </div>
  );
}

function Chip({on, onClick, children}) {
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px',
      background: on ? 'rgba(0,229,255,0.1)' : 'var(--surface)',
      border: '1px solid ' + (on ? 'var(--cyan)' : 'var(--border-2)'),
      borderRadius: 999, fontSize: 13, color: on ? 'var(--cyan)' : 'var(--text-2)',
      cursor: 'pointer', userSelect: 'none', transition: 'all 0.15s',
    }}>{children}</span>
  );
}

function SuccessState() {
  const [id] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  return (
    <div style={{padding: '64px 40px', background: 'linear-gradient(180deg, rgba(163,255,111,0.06), var(--surface))', border: '1px solid rgba(163,255,111,0.3)', borderRadius: 'var(--r-lg)', textAlign: 'center'}}>
      <div style={{width: 72, height: 72, borderRadius: '50%', background: 'rgba(163,255,111,0.12)', border: '1px solid rgba(163,255,111,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'}}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h2 className="h2" style={{fontSize: 28, marginBottom: 12}}>Done. We'll get back to you shortly.</h2>
      <p style={{color: 'var(--text-2)', fontSize: 15, maxWidth: '46ch', margin: '0 auto 24px', lineHeight: 1.6}}>
        We received your request and a consultant will contact you within 24 business hours to schedule the demo.
      </p>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [interests, setInterests] = useState([INTERESTS[0], INTERESTS[1]]);
  const [size, setSize] = useState(SIZES[2]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const form = useRef(null);
  const toggle = (label) => setInterests((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!form.current || sending) return;
    setSending(true);
    setErrorMessage(null);
    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY,
      );
      console.log('EmailJS OK:', result.status, result.text);
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS ERROR:', err);
      setErrorMessage((err && err.text) || 'There was a problem sending your request. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout title="Request a demo" description="Schedule a guided ITOSS demo with a consultant.">
      <main>
        <section className="page-head">
          <div className="glow-bg"><div className="orb orb-cyan" style={{width: 500, height: 500, top: -250, left: -100}} /><div className="orb orb-lime" style={{width: 400, height: 400, bottom: -200, right: -100}} /><div className="grid-floor" /></div>
          <div className="itoss-container-wide" style={{position: 'relative', zIndex: 1}}>
            <span className="eyebrow">Contact</span>
            <h1 className="h1">Schedule a <span className="brand-grad-text">guided demo</span>.</h1>
            <p className="lede">30 minutes with a consultant. We'll show you ITOSS applied to your real use case — MSPs, SRE teams, SAP operations, whatever your team needs.</p>
          </div>
        </section>

        <section style={{padding: '64px 0 96px'}}>
          <div className="itoss-container-wide">
            <div style={{display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start'}} className="contact-grid">
              <div>
                {!submitted ? (
                  <form ref={form} onSubmit={sendEmail}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                      <Field label="First name"><input name="user_first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={fieldStyle} type="text" required placeholder="Maria Garcia" /></Field>
                      <Field label="Last name"><input name="user_last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={fieldStyle} type="text" required placeholder="Perez" /></Field>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                      <Field label="Work email"><input name="user_email" style={fieldStyle} type="email" required placeholder="maria@company.com" /></Field>
                      <Field label="Phone (optional)"><input name="user_phone" style={fieldStyle} type="tel" placeholder="+54 11 5555 5555" /></Field>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                      <Field label="Company"><input name="user_company" style={fieldStyle} type="text" required placeholder="Acme Inc." /></Field>
                      <Field label="Role"><select name="user_job" style={fieldStyle} required>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
                    </div>
                    <Field label="Approximate infrastructure size">
                      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>{SIZES.map((s) => <Chip key={s} on={size === s} onClick={() => setSize(s)}>{s}</Chip>)}</div>
                    </Field>
                    <Field label="What are you interested in exploring? (multi)">
                      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>{INTERESTS.map((s) => <Chip key={s} on={interests.includes(s)} onClick={() => toggle(s)}>{interests.includes(s) ? '✓ ' : '+ '}{s}</Chip>)}</div>
                    </Field>
                    <Field label="Message (optional)"><textarea name="message" style={{...fieldStyle, resize: 'vertical', minHeight: 100}} placeholder="Tell us briefly about your current operation…" /></Field>

                    {/* Non-input fields serialized for EmailJS */}
                    <input type="hidden" name="user_name" value={`${firstName} ${lastName}`.trim()} />
                    <input type="hidden" name="user_infra_size" value={size} />
                    <input type="hidden" name="user_interests" value={interests.join(', ')} />

                    {errorMessage && (
                      <p style={{color: 'var(--lime)', fontSize: 13, marginTop: 16}}>{errorMessage}</p>
                    )}
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, flexWrap: 'wrap', gap: 16}}>
                      <span className="mono" style={{fontSize: 11, color: 'var(--text-4)'}}>Your data stays private. No spam, no third parties.</span>
                      <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>{sending ? 'Sending…' : <>Send request <span className="arrow">→</span></>}</button>
                    </div>
                  </form>
                ) : <SuccessState />}
              </div>

              <aside style={{position: 'sticky', top: 96}}>
                <div className="card" style={{marginBottom: 16}}>
                  <div className="mono" style={{fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 14}}>WHAT TO EXPECT</div>
                  <ol style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, margin: 0, padding: 0}}>
                    {[
                      {n: '01', t: 'We reply within 24h', d: 'We set up a 30-min call — no generic slides.'},
                      {n: '02', t: 'Demo applied to your case', d: 'We get straight to the real question: "does this solve my problem or not".'},
                      {n: '03', t: 'POC on your infra (optional)', d: 'We help you spin up a no-commitment pilot with your own data.'},
                    ].map((s) => (
                      <li key={s.n} style={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14}}>
                        <span className="mono" style={{fontSize: 11, color: 'var(--cyan)', padding: '4px 8px', background: 'rgba(0,229,255,0.06)', borderRadius: 4, height: 'fit-content'}}>{s.n}</span>
                        <div><div style={{fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2}}>{s.t}</div><div style={{fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5}}>{s.d}</div></div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="card" style={{background: 'rgba(163,255,111,0.04)', borderColor: 'rgba(163,255,111,0.25)'}}>
                  <div className="mono" style={{fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em', marginBottom: 10}}>SELF-HOSTED</div>
                  <h3 style={{fontSize: 16, marginBottom: 6}}>Want to try it first?</h3>
                  <p style={{color: 'var(--text-3)', fontSize: 13, lineHeight: 1.55, marginBottom: 14}}>The self-hosted version is free. Spin it up in 5 minutes with Docker compose.</p>
                  <Link to="/docs/getting-started/quick-start" className="btn btn-secondary btn-sm">See quick start →</Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
