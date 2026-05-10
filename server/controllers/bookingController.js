const Booking = require('../models/Booking');

// @desc    Create a new booking (Customer)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  const { serviceName, bookingDate } = req.body;
  try {
    const booking = await Booking.create({
      customerId: req.user._id,
      serviceName,
      bookingDate
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer bookings
// @route   GET /api/bookings/customer
const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id })
      .populate('vendorId', 'name phone')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor assigned or pending bookings
// @route   GET /api/bookings/vendor
const getVendorBookings = async (req, res) => {
  try {
    // Return bookings assigned to this vendor OR pending bookings that match vendor's service type
    const vendorServiceType = req.user.serviceType;

    // Simplistic approach: vendor sees all pending bookings for their service type,
    // plus any bookings already assigned to them.
    const bookings = await Booking.find({
      $or: [
        { vendorId: req.user._id },
        { status: 'Pending', serviceName: vendorServiceType }
      ]
    })
      .populate('customerId', 'name phone email')
      .sort('-createdAt');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a booking (Vendor)
// @route   PUT /api/bookings/:id/accept
const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'Pending') return res.status(400).json({ message: 'Booking is already accepted or completed' });

    booking.vendorId = req.user._id;
    booking.status = 'Accepted';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark booking as completed (Vendor)
// @route   PUT /api/bookings/:id/complete
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to complete this booking' });
    }
    if (booking.status !== 'Accepted') return res.status(400).json({ message: 'Booking must be accepted before completion' });

    booking.status = 'Completed';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all available services
// @route   GET /api/bookings/services
const getServices = async (req, res) => {
  // Hardcoded for demo purposes
  const services = [
    { id: 1, name: 'AC Repair', image: 'https://techsquadteam.com/assets/profile/blogimages/f00ab4df455700aeb2ff86da0cb79fe2.png', description: 'Expert AC repair and servicing.' },
    { id: 2, name: 'Plumbing', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80', description: 'Professional plumbing solutions.' },
    { id: 3, name: 'Electrician', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80', description: 'Safe and reliable electrical work.' },
    { id: 4, name: 'Home Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80', description: 'Deep cleaning for your home.' },
    { id: 5, name: 'Laptop Repair', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80', description: 'Quick fixes for your devices.' },
    { id: 6, name: 'Car Wash', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&q=80', description: 'Doorstep premium car wash.' }
  ];
  res.json(services);
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getVendorBookings,
  acceptBooking,
  completeBooking,
  getServices
};
