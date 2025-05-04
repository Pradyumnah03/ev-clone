import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProduct } from '../services/products';

const ProductContainer = styled.div`
  padding-top: 60px;
`;

const HeroSection = styled.div`
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 2rem 2rem;
`;

const ProductHeader = styled.div`
  text-align: center;
`;

const ProductTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.textColor || '#000'};
`;

const ProductSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${props => props.textColor || '#000'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

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
`;

const SpecsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
`;

const SpecsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const SpecCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SpecValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SpecLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

const GallerySection = styled.section`
  padding: 4rem 2rem;
`;

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const GalleryImage = styled.div`
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const CTASection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: red;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to load product details. Please try again later.');
        setTimeout(() => {
          navigate('/');
        }, 3000); // Redirect to home after 3 seconds if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading product details...</div>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>{error}</div>
      </ErrorContainer>
    );
  }

  if (!product) {
    return (
      <ErrorContainer>
        <div>Product not found</div>
      </ErrorContainer>
    );
  }

  // Get the first variant for specs
  const variant = product.variants[0];

  return (
    <ProductContainer>
      <HeroSection backgroundImage={product.hero_image}>
        <ProductHeader>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductSubtitle>{product.description}</ProductSubtitle>
          <ButtonContainer>
            <Button to={`/customize/${product.id}`} className="primary">
              Order Now
            </Button>
            <Button to="#specs" className="secondary">
              View Specs
            </Button>
          </ButtonContainer>
        </ProductHeader>
      </HeroSection>

      <SpecsSection id="specs">
        <SpecsContainer>
          <SectionTitle>Vehicle Specifications</SectionTitle>
          <SpecsGrid>
            <SpecCard>
              <SpecValue>${variant.price.toLocaleString()}</SpecValue>
              <SpecLabel>Starting Price</SpecLabel>
            </SpecCard>
            {variant.range && (
              <SpecCard>
                <SpecValue>{variant.range} mi</SpecValue>
                <SpecLabel>Range (EPA est.)</SpecLabel>
              </SpecCard>
            )}
            {variant.acceleration && (
              <SpecCard>
                <SpecValue>{variant.acceleration}s</SpecValue>
                <SpecLabel>0-60 mph</SpecLabel>
              </SpecCard>
            )}
            {variant.top_speed && (
              <SpecCard>
                <SpecValue>{variant.top_speed} mph</SpecValue>
                <SpecLabel>Top Speed</SpecLabel>
              </SpecCard>
            )}
          </SpecsGrid>
        </SpecsContainer>
      </SpecsSection>

      <GallerySection>
        <GalleryContainer>
          <SectionTitle>Gallery</SectionTitle>
          <GalleryGrid>
            {product.images.map((image, index) => (
              <GalleryImage key={index} image={image} />
            ))}
          </GalleryGrid>
        </GalleryContainer>
      </GallerySection>

      <CTASection>
        <CTAContainer>
          <CTATitle>Design Your {product.name}</CTATitle>
          <CTAText>
            Create a {product.name} that's uniquely yours. Choose your color, wheels, and interior options.
          </CTAText>
          <Button to={`/customize/${product.id}`} className="primary">
            Customize Now
          </Button>
        </CTAContainer>
      </CTASection>
    </ProductContainer>
  );
};

export default ProductDetail;
