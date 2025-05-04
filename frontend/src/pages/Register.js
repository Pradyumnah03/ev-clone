import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { RegisterForm } from '../components/AuthForms';
import { register } from '../services/auth';

const RegisterContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const LoginLink = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.detail || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <RegisterContainer>
      <Title>Create an Account</Title>
      <RegisterForm 
        onSubmit={handleRegister} 
        error={error}
        success={success}
      />
      <LoginLink>
        Already have an account? <Link to="/login">Login here</Link>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;
