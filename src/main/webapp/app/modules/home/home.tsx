import React from 'react';
import { Row } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { Translate } from 'react-jhipster';
import Footer from 'app/shared/layout/footer/footer';
import OtherContainer from './othercontainer'; // Adjust the import path based on your project structure

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <div className="homepage-container">
      {/* First Row - Custom Message Column */}
      <Row>
        <div className="scrolling-text">
          <h2
            className="display-4 animated ova-move-up"
            style={{ animationDelay: '800ms', color: 'black', fontSize: '50px', fontWeight: 'bold', textAlign: 'center' }}
          >
            <Translate contentKey="home.reserveSport">RÉSERVER VOTRE SPORT À TOUT MOMENT</Translate>
          </h2>
          <p style={{ fontSize: '17px', fontWeight: 'bold', textAlign: 'center' }}>
            <Translate contentKey="home.withoutMoving">Et depuis votre maison sans vous déplacer</Translate>
          </p>
        </div>
      </Row>

      {/* Second Row - Photo Upload Column */}
      <Row>
        {/* Photo Upload Column Content */}
        {/* Add content for the second row as needed */}
      </Row>

      {/* Third Row - OtherContainer */}
      <Row>
        <OtherContainer />
      </Row>

      {/* Optionally, you can add more Rows or Components here */}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
