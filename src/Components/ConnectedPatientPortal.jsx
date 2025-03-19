import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientPortal from './PatientPortal'; // Your existing component

const ConnectedPatientPortal = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base API URL
  const API_URL = 'http://localhost:5000/api';

  // Set up axios defaults
  axios.defaults.baseURL = API_URL;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/users/login', { email, password });
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch claims after login
      fetchClaims();
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setError(null);
      await axios.post('/users/register', { name, email, password });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setClaims([]);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Fetch claims from API
  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/claims');
      
      // Transform API data to match the format expected by PatientPortal component
      const formattedClaims = response.data.claims.map(claim => ({
        id: claim._id,
        name: claim.name,
        email: claim.email,
        claimAmount: claim.claimAmount,
        description: claim.description,
        status: claim.status,
        submissionDate: new Date(claim.submissionDate).toISOString().split('T')[0],
        approvedAmount: claim.approvedAmount || null,
        insurerComments: claim.insurerComments || null,
        document: claim.documentUrl ? claim.documentUrl.split('/').pop() : 'No document'
      }));
      
      setClaims(formattedClaims);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch claims');
      setLoading(false);
    }
  };

  // Submit new claim
  const submitClaim = async (claimData, file) => {
    try {
      setError(null);
      
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append('name', claimData.name);
      formData.append('email', claimData.email);
      formData.append('claimAmount', claimData.claimAmount);
      formData.append('description', claimData.description);
      
      if (file) {
        formData.append('document', file);
      }
      
      const response = await axios.post('/claims', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh claims list after submission
      fetchClaims();
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit claim');
      return false;
    }
  };

  // Load claims on component mount if token exists
  useEffect(() => {
    if (token) {
      fetchClaims();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Props to pass to PatientPortal
  const portalProps = {
    claims,
    isLoading: loading,
    error,
    isAuthenticated,
    user,
    onSubmitClaim: submitClaim,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    refreshClaims: fetchClaims
  };

  return <PatientPortal {...portalProps} />;
};

export default ConnectedPatientPortal;