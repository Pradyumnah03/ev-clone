import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginForm } from '../components/AuthForms';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
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

const RegisterLink = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <LoginContainer>
      <Title>Login to Your Account</Title>
      <LoginForm onSubmit={handleLogin} error={error} />
      <RegisterLink>
        Don't have an account? <Link to="/register">Register here</Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;
