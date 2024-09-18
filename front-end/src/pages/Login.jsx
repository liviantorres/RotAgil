import React from 'react';
import Forms from '../components/Forms';

const Login = () => {
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/company/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token; 
        localStorage.setItem('authToken', token);
        window.location.href = '/trajetos';

      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }
    } catch (error) {
      throw error; 
    }
  };

  return <Forms type="Login" onSubmit={handleLogin} />;
};

export default Login;
