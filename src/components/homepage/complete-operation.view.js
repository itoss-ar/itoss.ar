import clsx from 'clsx';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const CompleteOperation = () => { 
    return (
      <>        
        <div className="features" style={{paddingBottom: 0, backgroundColor: "#ffffff", color: "#222222"}}>
          <div className="container">
            <h2 className="text--center">
              <strong>Complete operation</strong>
            </h2>
          </div>        
        </div>
        <div className="features" style={{paddingBottom: 0, backgroundColor: "#ffffff", color: "#222222"}}>
          <Container className={clsx('col-12 home-complete-operation')} style={{backgroundColor: "#ffffff", color: "#222222"}}>
            <Row className="justify-content-md-center">
              <Col>
                <ul>
                  <li>Operational state</li>
                  <li>KPI processing</li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>Lyfe cycle management</li>
                  <li>Tracking</li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>Customer operational database</li>
                  <li>Performance, configuration, security and more</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{backgroundColor: "white", paddingTop: '20px'}}><hr className="separator-more" /></div>
      </>
    )
}