import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content" style={{ backgroundColor: '#55beb0', padding: '10px 0' }}>
    <Row>
      <Col md="12" className="text-center">
        <p>
          <Translate contentKey="footer">© Copyright 2023-2024</Translate>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
