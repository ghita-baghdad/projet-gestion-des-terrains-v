import React from 'react';
import { Translate } from 'react-jhipster';

const OtherContainer = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Image */}
      <img src="content/images/logos7.png" alt="Description of the image" style={{ maxWidth: '50%', marginRight: '20px' }} />

      {/* Content */}
      <div>
        <h3>
          <Translate contentKey="global.ll.contactUs.title">Nous Contacter</Translate>
        </h3>
        <address>
          <p>Rue Atlas Etg 4 Apt 4, MAARIF CASABLANCA</p>
          <p>+212 682 082 040</p>
          <p>contact@LabHub.ma</p>
        </address>
      </div>
    </div>
  );
};

export default OtherContainer;
