import React from 'react';
import { Link } from 'react-router-dom';
import PatientPortal from './PatientPortal';
import InsurerPortal from './InsurerPortal';
import { FileCheck, Shield, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ClaimCare</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-gray-300 text-blue-600 rounded-lg hover:bg-gray-100">About</button>
            <button className="px-4 py-2 border border-gray-300 text-blue-600 rounded-lg hover:bg-gray-100">Features</button>
            <button className="px-4 py-2 border border-gray-300 text-blue-600 rounded-lg hover:bg-gray-100">Contact</button>
            <Link to="/login"><button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign In</button></Link>
          </div>
        </div>
      </header>

      {/* Main Hero */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Simplifying Healthcare Claims Management</h2>
            <p className="text-xl mb-8">A streamlined platform for patients and insurers to manage healthcare claims efficiently and transparently.</p>
            <div className="flex gap-4">
            <Link to="/login">
              <button className="px-6 py-2 bg-white text-blue-700 hover:bg-gray-100 rounded-lg">
                Patient Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              </Link>
              <Link to="/login  ">
              <button className="px-6 py-2 border border-white text-white hover:bg-blue-600 rounded-lg">
                Insurer Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/api/placeholder/600/400" 
              alt="Claims management dashboard" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">User-Friendly Portal</h3>
              <p className="text-gray-600">Simple interfaces for both patients and insurers, designed for ease of use and efficiency.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">Monitor claims status in real-time with comprehensive dashboards and notifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4 rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Document Handling</h3>
              <p className="text-gray-600">Upload and manage claim documents securely with encrypted storage and transmission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Preview Tabs */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Preview</h2>
          
          <div className="flex justify-center mb-8">
            <div className="flex gap-8">
              <Link to="/patient-portal"><button className="px-4 py-2 text-blue-600 border border-gray-300 rounded-lg hover:bg-blue-100">Patient Portal</button></Link>
              <Link to="/insurer-portal"><button className="px-4 py-2 text-blue-600 border border-gray-300 rounded-lg hover:bg-blue-100">Insurer Portal</button></Link>
            </div>
          </div>

          {/* Patient Tab Content */}
          <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Patient Portal</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Submit new claims with document uploads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Track claim status and updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>View claim history and approved amounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Receive notifications on claim status changes</span>
                  </li>
                </ul>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Explore Patient Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/api/placeholder/500/300" 
                  alt="Patient portal dashboard" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Insurer Tab Content */}
          <div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Insurer Portal</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Review and process incoming claims</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Filter claims by status, amount, and date</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Add comments and update claim status</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Access claim documents and history</span>
                  </li>
                </ul>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Explore Insurer Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/api/placeholder/500/300" 
                  alt="Insurer portal dashboard" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Claims Process?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join ClaimCare today to experience a more efficient, transparent, and user-friendly healthcare claims management system.</p>
          <div className="flex justify-center gap-4">
          <Link to="/login"><button className="px-6 py-2 bg-white text-blue-700 hover:bg-gray-100 rounded-lg">Sign Up Now</button></Link>
            <button className="px-6 py-2 border border-white text-white hover:bg-blue-700 rounded-lg">Request Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">ClaimCare</h3>
              </div>
              <p>Simplifying healthcare claims management for patients and insurers.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li>Patient Portal</li>
                <li>Insurer Dashboard</li>
                <li>Document Management</li>
                <li>Claim Tracking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>Documentation</li>
                <li>API Guidelines</li>
                <li>Support Center</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>info@claimcare.com</li>
                <li>1-800-CLAIMS</li>
                <li>123 Healthcare Ave</li>
                <li>San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 ClaimCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
