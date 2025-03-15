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
        // Call login API
        response = await axios.post('/api/login', userData); // Change the URL to match your backend
      } else {
        // Call signup API
        response = await axios.post('/api/signup', userData); // Change the URL to match your backend
      }

      // Handle success: Redirect user based on role
      if (response.status === 200 || response.status === 201) {
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
        // If the error is related to incorrect password
        if (error.response.data.message.includes('Invalid password')) {
          setErrorMessage('Incorrect password. Please try again.');
        } else {
          setErrorMessage(error.response.data.message || 'Something went wrong.');
        }
      } else {
        setErrorMessage('Something went wrong. Please try again.');
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
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg ${isLogin ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-blue-600 text-blue-600 hover:bg-blue-100'}`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
