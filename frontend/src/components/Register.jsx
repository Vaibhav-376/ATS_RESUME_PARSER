import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
import Navbar from "./templates/Navbar";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
      return;
    }

    try {
      const response = await axios.post("https://ats-resume-parser.onrender.com/api/register", { name, email, password });

      if (response.data.success) {

        Cookies.set('authToken', response.data.token, { expires: 7 });

        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white animate-fadeIn sm:w-full">
      <Navbar />
      <h2 className="text-2xl font-semibold text-center mb-6 text-green-600 transition duration-300 hover:text-green-800">
        Sign Up
      </h2>
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md transition duration-300 hover:bg-green-600 hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
