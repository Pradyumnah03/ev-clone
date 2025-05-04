import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f4f4f4;
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: #555;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3e6ae1;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #777;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Tesla</FooterTitle>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Vehicles</FooterTitle>
          <FooterLink to="/products/model-s">Model S</FooterLink>
          <FooterLink to="/products/model-3">Model 3</FooterLink>
          <FooterLink to="/products/model-x">Model X</FooterLink>
          <FooterLink to="/products/model-y">Model Y</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Energy</FooterTitle>
          <FooterLink to="/energy/solar-panels">Solar Panels</FooterLink>
          <FooterLink to="/energy/solar-roof">Solar Roof</FooterLink>
          <FooterLink to="/energy/powerwall">Powerwall</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink to="/support/help">Help Center</FooterLink>
          <FooterLink to="/support/service">Service</FooterLink>
          <FooterLink to="/support/warranty">Warranty</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Tesla Clone. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
