import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/vendor');
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await api.put(`/bookings/${id}/${action}`);
      toast.success(`Booking ${action}ed successfully`);
      fetchBookings();
    } catch (error) {
      toast.error(`Failed to ${action} booking`);
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
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#003b95] mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600">Service Area: <span className="font-bold text-gray-800">{user?.serviceType}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No bookings available at the moment.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.customerId ? (
                        <div>
                          <p className="font-medium text-gray-900">{booking.customerId.name}</p>
                          <p className="text-sm text-gray-500">{booking.customerId.phone}</p>
                          <p className="text-xs text-gray-400">{booking.customerId.email}</p>
                        </div>
                      ) : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{booking.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {booking.status === 'Pending' && (
                        <button
                          onClick={() => handleAction(booking._id, 'accept')}
                          className="text-white bg-[#0071c2] hover:bg-[#005a9c] px-3 py-1.5 rounded transition-colors"
                        >
                          Accept Job
                        </button>
                      )}
                      {booking.status === 'Accepted' && booking.vendorId === user._id && (
                        <button
                          onClick={() => handleAction(booking._id, 'complete')}
                          className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition-colors"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
