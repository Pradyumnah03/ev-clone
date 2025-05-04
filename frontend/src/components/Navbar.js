import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3e6ae1;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  max-width: 300px;
  background-color: white;
  padding: 2rem;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  z-index: 101;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileNavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.5rem 0;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &.primary {
    background-color: #3e6ae1;
    color: white;
    
    &:hover {
      background-color: #2a4da0;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #000;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProductClick = (productPath) => {
    setMobileMenuOpen(false); // Close mobile menu if open
    // Force a reload when navigating to product
    navigate(productPath);
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Logo to="/">TESLA</Logo>
      
      <NavLinks>
        <NavLink to="#" onClick={() => handleProductClick('/products/model-s')}>Model S</NavLink>
        <NavLink to="#" onClick={() => handleProductClick('/products/model-3')}>Model 3</NavLink>
        <NavLink to="#" onClick={() => handleProductClick('/products/model-x')}>Model X</NavLink>
        <NavLink to="#" onClick={() => handleProductClick('/products/model-y')}>Model Y</NavLink>
      </NavLinks>
      
      <AuthButtons>
        {isAuthenticated ? (
          <>
            <Button as="button" className="secondary" onClick={handleLogout}>
              Logout
            </Button>
            <Button to="/profile" className="secondary">
              {currentUser?.username}
            </Button>
          </>
        ) : (
          <>
            <Button to="/login" className="secondary">
              Login
            </Button>
            <Button to="/register" className="primary">
              Register
            </Button>
          </>
        )}
      </AuthButtons>
      
      <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
        ☰
      </MobileMenuButton>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={() => setMobileMenuOpen(false)}>✕</CloseButton>
        <MobileNavLink to="#" onClick={() => handleProductClick('/products/model-s')}>
          Model S
        </MobileNavLink>
        <MobileNavLink to="#" onClick={() => handleProductClick('/products/model-3')}>
          Model 3
        </MobileNavLink>
        <MobileNavLink to="#" onClick={() => handleProductClick('/products/model-x')}>
          Model X
        </MobileNavLink>
        <MobileNavLink to="#" onClick={() => handleProductClick('/products/model-y')}>
          Model Y
        </MobileNavLink>
        
        {isAuthenticated ? (
          <>
            <MobileNavLink as="button" onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}>
              Logout
            </MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
              {currentUser?.username}
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setMobileMenuOpen(false)}>
              Register
            </MobileNavLink>
          </>
        )}
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
