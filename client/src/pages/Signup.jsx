import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', serviceType: 'AC Repair' });
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'customer') {
        const { data } = await api.post('/auth/customer/signup', formData);
        toast.success(data.message);
        setShowOtp(true);
      } else {
        const { data } = await api.post('/auth/vendor/signup', formData);
        toast.success('Vendor registered successfully');
        login(data);
        navigate('/vendor-dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/customer/verify', { email: formData.email, otp });
      toast.success('Email verified successfully');
      login(data);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#003b95]">Create Account</h2>
          <p className="text-gray-500 mt-2">Join QuickService today</p>
        </div>

        {!showOtp && (
          <div className="flex bg-gray-100 p-1 rounded-md mb-6">
            <button
              className={`flex-1 py-2 text-sm font-medium rounded ${role === 'customer' ? 'bg-white text-[#003b95] shadow' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRole('customer')}
            >
              Customer
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium rounded ${role === 'vendor' ? 'bg-white text-[#003b95] shadow' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRole('vendor')}
            >
              Vendor
            </button>
          </div>
        )}

        {!showOtp ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="phone" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={formData.password} onChange={handleChange} />
            </div>
            
            {role === 'vendor' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select name="serviceType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={formData.serviceType} onChange={handleChange}>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="Laptop Repair">Laptop Repair</option>
                  <option value="Car Wash">Car Wash</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-[#003b95] bg-[#ffb700] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb700] mt-6 disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-100">
              <p className="text-sm text-blue-800 text-center">We've sent an OTP to <strong>{formData.email}</strong>. Please check your console/email.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95]" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" />
            </div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-[#003b95] bg-[#ffb700] hover:bg-yellow-400 disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>
          </form>
        )}

        {!showOtp && (
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-[#0071c2] font-semibold hover:underline">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
