import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Wrench, Shield, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/bookings/services');
        setServices(data);
      } catch (error) {
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#003b95] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Expert Home Services, <span className="text-[#ffb700]">Delivered Quickly</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">
            Book trusted professionals for all your home needs. Transparent pricing, guaranteed quality.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#services" className="bg-[#ffb700] text-[#003b95] px-8 py-3 rounded font-bold text-lg hover:bg-yellow-400 transition-colors">
              Book a Service
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 text-[#003b95] rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Professionals</h3>
              <p className="text-gray-600">Highly trained and verified experts for every job.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 text-[#003b95] rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
              <p className="text-gray-600">Your safety is our priority. Secure payments and verified identity.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 text-[#003b95] rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">On-Time Service</h3>
              <p className="text-gray-600">We respect your time. Punctual service delivery guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#003b95]">Our Services</h2>
          {loading ? (
             <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003b95]"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                  <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <a href="/login" className="block text-center bg-[#003b95] text-white px-4 py-2 rounded font-semibold hover:bg-[#002a6b] transition-colors">
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
