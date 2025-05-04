import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/products';
import { useAuth } from '../context/AuthContext';

const CustomizerContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CustomizerHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const CustomizerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  height: 400px;
  border-radius: 8px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OptionSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OptionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.selected ? '#3e6ae1' : '#ddd'};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(62, 106, 225, 0.1)' : 'white'};
  color: ${props => props.selected ? '#3e6ae1' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3e6ae1;
  }
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? '#3e6ae1' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PriceContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &.total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const OrderButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #3e6ae1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2a4da0;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
`;

const LoginButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3e6ae1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2a4da0;
  }
`;

const Customizer = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [selectedInterior, setSelectedInterior] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (product) {
      // Set default selections
      setSelectedVariant(product.variants[0]);
      setSelectedColor(product.colors[0]);
      setSelectedWheel(product.wheels[0]);
      setSelectedInterior(product.interiors[0]);
    }
  }, [product]);
  
  useEffect(() => {
    if (selectedVariant && selectedColor && selectedWheel && selectedInterior) {
      const variantPrice = selectedVariant.price;
      const colorPrice = selectedColor.price;
      const wheelPrice = selectedWheel.price;
      const interiorPrice = selectedInterior.price;
      
      setTotalPrice(variantPrice + colorPrice + wheelPrice + interiorPrice);
    }
  }, [selectedVariant, selectedColor, selectedWheel, selectedInterior]);
  
  const handleOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      const orderData = {
        user_id: currentUser.id,
        product_id: product.id,
        variant: selectedVariant.name,
        color: selectedColor.name,
        wheel: selectedWheel.name,
        interior: selectedInterior.name,
        total_price: totalPrice
      };
      
      await createOrder(orderData);
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };
  
  if (!product || !selectedVariant || !selectedColor || !selectedWheel || !selectedInterior) {
    return <div>Loading...</div>;
  }
  
  return (
    <CustomizerContainer>
      <CustomizerHeader>
        <Title>{product.name} Customizer</Title>
        <Subtitle>Design your {product.name}</Subtitle>
      </CustomizerHeader>
      
      <CustomizerContent>
        <ProductImage image={selectedColor.image} />
        
        <OptionsContainer>
          <OptionSection>
            <SectionTitle>Variant</SectionTitle>
            <OptionsList>
              {product.variants.map((variant) => (
                <OptionButton
                  key={variant.name}
                  selected={selectedVariant.name === variant.name}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.name} - ${variant.price.toLocaleString()}
                </OptionButton>
              ))}
            </OptionsList>
          </OptionSection>
          
          <OptionSection>
            <SectionTitle>Paint</SectionTitle>
            <OptionsList>
              {product.colors.map((color) => (
                <ColorOption
                  key={color.name}
                  color={color.code}
                  selected={selectedColor.name === color.name}
                  onClick={() => setSelectedColor(color)}
                  title={`${color.name} - $${color.price.toLocaleString()}`}
                />
              ))}
            </OptionsList>
            <div style={{ marginTop: '0.5rem' }}>
              {selectedColor.name} - ${selectedColor.price.toLocaleString()}
            </div>
          </OptionSection>
          
          <OptionSection>
            <SectionTitle>Wheels</SectionTitle>
            <OptionsList>
              {product.wheels.map((wheel) => (
                <OptionButton
                  key={wheel.name}
                  selected={selectedWheel.name === wheel.name}
                  onClick={() => setSelectedWheel(wheel)}
                >
                  {wheel.name} - ${wheel.price.toLocaleString()}
                </OptionButton>
              ))}
            </OptionsList>
          </OptionSection>
          
          <OptionSection>
            <SectionTitle>Interior</SectionTitle>
            <OptionsList>
              {product.interiors.map((interior) => (
                <OptionButton
                  key={interior.name}
                  selected={selectedInterior.name === interior.name}
                  onClick={() => setSelectedInterior(interior)}
                >
                  {interior.name} - ${interior.price.toLocaleString()}
                </OptionButton>
              ))}
            </OptionsList>
          </OptionSection>
          
          <PriceContainer>
            <PriceRow>
              <span>Variant ({selectedVariant.name})</span>
              <span>${selectedVariant.price.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Paint ({selectedColor.name})</span>
              <span>${selectedColor.price.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Wheels ({selectedWheel.name})</span>
              <span>${selectedWheel.price.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Interior ({selectedInterior.name})</span>
              <span>${selectedInterior.price.toLocaleString()}</span>
            </PriceRow>
            <PriceRow className="total">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </PriceRow>
          </PriceContainer>
          
          {isAuthenticated ? (
            <OrderButton onClick={handleOrder}>
              Place Order
            </OrderButton>
          ) : (
            <LoginPrompt>
              <p>Please log in to place an order</p>
              <LoginButton onClick={() => navigate('/login')}>
                Log In
              </LoginButton>
            </LoginPrompt>
          )}
        </OptionsContainer>
      </CustomizerContent>
    </CustomizerContainer>
  );
};

export default Customizer;
