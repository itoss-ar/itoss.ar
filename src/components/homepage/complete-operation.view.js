import clsx from 'clsx';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AliceCarousel from 'react-alice-carousel';
const featureList = [
  { title: "Operational state", icon: "/icons/operational-state.gif", description: "Our app is currently operational, ensuring an optimal and uninterrupted user experience. " },
  { title: "KPI processing", icon: "/icons/KPI_processing.gif", description: "Our application is actively optimizing Key Performance Indicators (KPIs), ensuring efficient and real-time analysis." },
  { title: "Life cycle management",icon: "/icons/life_cycle_management.gif", description: "Efficient life cycle management is underway in our application, ensuring seamless progression and functionality." },
  { title: "Traking", icon: "/icons/traking.gif", description: "Our application is adept at precise tracking, providing real-time insights into user activities." },
  { title: "Customer operational database", icon: "/icons/customer_operational_database.gif", description: "Facilitating seamless operations, our application maintains a robust customer database, ensuring efficient organization and accessibility of customer-related information." },
  { title: "Performance, configuration, security and more", icon: "/icons/Performance_configuration_security_and_more.gif", description: "Exceling in performance, configuration, security, and other essential aspects, the application ensures top-notch functionality." }
]
const FeatureView = ({ icon, title, description }) => {
  return (
    <div style={{ margin: '20px', minHeight: '500px', maxHeight: '500px', height: '500px', fontSize: '115%'}}>
      <div className='box text--center'>
        <div className='hide-on-hover' style={{marginTop: "-15px"}}>
          <img src={icon}></img>
        </div>
        <div className='keep-on-hover'>
          <p><strong>{title}</strong></p>
        </div>
        <div className='show-on-hover'>
          <p style={{ fontSize: "16px" }}>{description}</p>
        </div>
      </div>
    </div>
  );
}
const FeatureGalleryView = () => {
  const handleDragStart = (e) => e.preventDefault();
  const items = featureList.map((props, idx) => <FeatureView key={idx} {...props} onDragStart={handleDragStart} />);

  const responsive = {
    0: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 3 },
    1024: { items: 3 },
    1400: { items: 4 },
    1600: { items: 5 }
  };

  return (
    <div className='features'>
      <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={false} disableDotsControls={true} paddingLeft={10} paddingRight={10} />
    </div>
  );
}
export const CompleteOperation = () => {
  //modificar el html para cambiar el formato del titulo 19 -23
  return (
    <>
      <section className="home-features">
        <div className="features">
          <div className="container">
            <h2 className="text--center">
              <strong>Complete operation</strong>
            </h2>
          </div>
        </div>
        <div><hr className="separator" /></div>
        <div className={clsx('features-gallery')}>
          <FeatureGalleryView />
        </div>


      </section>
    </>
    //   <>  

    //     <div className="features" style={{paddingBottom: 0, backgroundColor: "#212121", color: "#ffffff"}}>
    //       <div className="container">
    //         <h2 className="text--center">
    //           <strong>Complete operation</strong>

    //         </h2>
    //         <hr className='separator'/>
    //       </div>   

    //       <FeatureGalleryView></FeatureGalleryView>

    //       {/*<div className="container">
    //         <h2 class="text--center"> 
    //           <strong>Complete operation2</strong>
    //           <hr className='separator'/>
    //         </h2>
    // </div>*/}

    //     </div>



    //         <div className="features" style={{paddingBottom: 0, backgroundColor: "#212121", color: "##ffffff"}}>
    //       <Container className={clsx('col-12 home-complete-operation')} style={{backgroundColor: "#212121", color: "##ffffff"}}>
    //         <Row className="justify-content-md-center">
    //           <Col>
    //             <ul>
    //               <li>Operational state</li>
    //               <li>KPI processing</li>
    //             </ul>
    //           </Col>
    //           <Col>
    //             <ul>
    //               <li>Lyfe cycle management</li>
    //               <li>Tracking</li>
    //             </ul>
    //           </Col>
    //           <Col>
    //             <ul>
    //               <li>Customer operational database</li>
    //               <li>Performance, configuration, security and more</li>
    //             </ul>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //     <div style={{backgroundColor: "#212121", paddingTop: '20px'}}><hr className="separator-more" /></div>
    //   </>
  )
}