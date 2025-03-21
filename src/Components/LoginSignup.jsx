import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { FileCheck } from 'lucide-react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    const userData = {
      username: email,
      password,
      role,
    };

    try {
      let response;

      if (isLogin) {
        // Call login API with the correct endpoint
        response = await axios.post('/api/login', userData);
      } else {
        // Call signup API with the correct endpoint
        response = await axios.post('/api/register', userData);
      }

      // Handle success: Store token and redirect user based on role
      if (response.status === 200 || response.status === 201) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Redirect based on role
        if (role === 'patient') {
          navigate('/patient-portal');
        } else {
          navigate('/insurer-portal');
        }
      }
    } catch (error) {
      // Handle error (invalid credentials, etc.)
      console.error(error);

      if (error.response && error.response.data) {
        // If the error is related to invalid credentials
        if (error.response.data.message.includes('Invalid credentials')) {
          setErrorMessage('Incorrect password or username. Please try again.');
        } else if (error.response.data.message.includes('User already exists')) {
          setErrorMessage('This email is already registered. Please login instead.');
        } else {
          setErrorMessage(error.response.data.message || 'Something went wrong.');
        }
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ClaimCare</h1>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-gray-100 ${isLogin ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-gray-100 ${!isLogin ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="role" className="block font-medium text-gray-700">
                I am a:
              </label>
              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="patient">Patient</option>
                <option value="insurer">Insurer</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="********"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;