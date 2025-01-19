import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './templates/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

 
    try {
      const response = await axios.post('https://ats-resume-parser.onrender.com/api/login', { email, password });

      if (response.data.success) {
        Cookies.set('authToken', response.data.token, { expires: 7, path: '/' });
        // console.log('Logged in successfully', response.data.user);
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg animate-fadeIn bg-white sm:w-full">
      <Navbar />
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600 transition duration-300 hover:text-blue-800">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600 hover:scale-105"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
