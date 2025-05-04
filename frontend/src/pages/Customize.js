import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Customizer from '../components/Customizer';
import { getProduct } from '../services/products';

const CustomizeContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const Customize = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <CustomizeContainer>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
      </CustomizeContainer>
    );
  }

  if (error) {
    return (
      <CustomizeContainer>
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</div>
      </CustomizeContainer>
    );
  }

  return (
    <CustomizeContainer>
      <Customizer product={product} />
    </CustomizeContainer>
  );
};

export default Customize;
