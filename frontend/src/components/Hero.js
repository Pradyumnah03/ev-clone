import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 2rem 2rem;
  color: ${props => props.textColor || '#000'};
  scroll-snap-align: start;
  position: relative;
`;

const HeroContent = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;

  &.primary {
    background-color: rgba(23, 26, 32, 0.8);
    color: white;
    
    &:hover {
      background-color: rgba(23, 26, 32, 1);
    }
  }

  &.secondary {
    background-color: rgba(255, 255, 255, 0.65);
    color: #393c41;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.85);
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const ScrollDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${props => props.textColor || '#000'};
  border-bottom: 2px solid ${props => props.textColor || '#000'};
  transform: rotate(45deg);
`;

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  primaryButtonText, 
  primaryButtonLink, 
  secondaryButtonText, 
  secondaryButtonLink,
  textColor
}) => {
  return (
    <HeroContainer backgroundImage={backgroundImage} textColor={textColor}>
      <HeroContent>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <ButtonContainer>
          {primaryButtonText && (
            <Button to={primaryButtonLink} className="primary">
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && (
            <Button to={secondaryButtonLink} className="secondary">
              {secondaryButtonText}
            </Button>
          )}
        </ButtonContainer>
      </HeroContent>
      
      <ScrollDown>
        <Arrow textColor={textColor} />
      </ScrollDown>
    </HeroContainer>
  );
};

export default Hero;
