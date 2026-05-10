import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = role === 'customer' ? '/auth/customer/login' : '/auth/vendor/login';
      const { data } = await api.post(endpoint, formData);
      login(data);
      navigate(role === 'customer' ? '/dashboard' : '/vendor-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#003b95]">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95] focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003b95] focus:border-transparent"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-[#003b95] bg-[#ffb700] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb700] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-[#0071c2] font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
