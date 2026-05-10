import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003b95]"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute role="customer">
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/vendor-dashboard" element={
            <ProtectedRoute role="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <footer className="bg-[#003b95] text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} QuickService. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
