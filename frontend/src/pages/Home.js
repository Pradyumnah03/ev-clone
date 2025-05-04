import React, { useRef } from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';

const HomeContainer = styled.div`
  scroll-snap-type: y proximity; // Changed from mandatory to proximity
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Add smooth scrolling behavior */
  scroll-behavior: smooth;
`;

const Home = () => {
  const containerRef = useRef(null);

  return (
    <HomeContainer ref={containerRef}>
      <Hero
        title="Model S"
        subtitle="Order Online for Touchless Delivery"
        backgroundImage="https://digitalassets.tesla.com/tesla-contents/image/upload/h_2400,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-S-Desktop-LHD"
        primaryButtonText="Custom Order"
        primaryButtonLink="/customize/model-s"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/products/model-s"
      />
      
      <ProductSection
        title="Model 3"
        subtitle="Leasing starting at $349/mo"
        backgroundImage="https://digitalassets.tesla.com/tesla-contents/image/upload/h_2400,w_2880,c_fit,f_auto,q_auto:best/Model-3-Main-Hero-Desktop-LHD"
        primaryButtonText="Custom Order"
        primaryButtonLink="/customize/model-3"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/products/model-3"
      />
      
      <ProductSection
        title="Model X"
        subtitle="Order Online for Touchless Delivery"
        backgroundImage="https://digitalassets.tesla.com/tesla-contents/image/upload/h_2400,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-X-Desktop-LHD"
        primaryButtonText="Custom Order"
        primaryButtonLink="/customize/model-x"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/products/model-x"
      />
      
      <ProductSection
        title="Model Y"
        subtitle="Order Online for Touchless Delivery"
        backgroundImage="https://digitalassets.tesla.com/tesla-contents/image/upload/h_2400,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Global-Desktop"
        primaryButtonText="Custom Order"
        primaryButtonLink="/customize/model-y"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/products/model-y"
      />
      
      <ProductSection
        title="Solar Panels"
        subtitle="Lowest Cost Solar Panels in America"
        backgroundImage="https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/425_HP-SolarPanels-D"
        primaryButtonText="Order Now"
        primaryButtonLink="/energy/solar-panels"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/energy/solar-panels"
        textColor="#fff"
      />
    </HomeContainer>
  );
};

export default Home;
