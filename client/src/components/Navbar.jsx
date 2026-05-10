import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Wrench } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#003b95] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="h-6 w-6 text-[#ffb700]" />
              <span className="text-[#ffb700]">Quick</span>Service
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to={user.role === 'vendor' ? '/vendor-dashboard' : '/dashboard'} 
                  className="hover:text-[#ffb700] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 bg-[#0071c2] px-3 py-1.5 rounded-full">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-white text-[#003b95] px-4 py-1.5 rounded text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-[#ffb700] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-[#003b95] px-4 py-2 rounded text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
