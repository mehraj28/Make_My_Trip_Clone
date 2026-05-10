const express = require('express');
const { protect, customerOnly, vendorOnly } = require('../middleware/auth');
const {
  createBooking,
  getCustomerBookings,
  getVendorBookings,
  acceptBooking,
  completeBooking,
  getServices
} = require('../controllers/bookingController');

const router = express.Router();

// Public route to get services
router.get('/services', getServices);

// Customer routes
router.post('/', protect, customerOnly, createBooking);
router.get('/customer', protect, customerOnly, getCustomerBookings);

// Vendor routes
router.get('/vendor', protect, vendorOnly, getVendorBookings);
router.put('/:id/accept', protect, vendorOnly, acceptBooking);
router.put('/:id/complete', protect, vendorOnly, completeBooking);

module.exports = router;
