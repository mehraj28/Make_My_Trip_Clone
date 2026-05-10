import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        api.get('/bookings/customer'),
        api.get('/bookings/services')
      ]);
      setBookings(bookingsRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = async (serviceName) => {
    try {
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() + 1); // Mock booking for tomorrow
      
      await api.post('/bookings', {
        serviceName,
        bookingDate
      });
      toast.success('Service booked successfully!');
      fetchData();
      setActiveTab('bookings');
    } catch (error) {
      toast.error('Failed to book service');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003b95]"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#003b95] mb-2">Welcome, {user?.name}</h1>
      <p className="text-gray-600 mb-8">Manage your bookings and explore new services.</p>

      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          className={`pb-2 px-1 ${activeTab === 'bookings' ? 'border-b-2 border-[#003b95] text-[#003b95] font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === 'services' ? 'border-b-2 border-[#003b95] text-[#003b95] font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('services')}
        >
          Book a Service
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">You have no bookings yet.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Info</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{booking.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.vendorId ? (
                        <div>
                          <p>{booking.vendorId.name}</p>
                          <p className="text-xs">{booking.vendorId.phone}</p>
                        </div>
                      ) : (
                        'Pending Assignment'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col">
              <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>
                <button
                  onClick={() => handleBookService(service.name)}
                  className="w-full bg-[#003b95] text-white py-2 rounded font-semibold hover:bg-[#002a6b] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
