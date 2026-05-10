const express = require('express');
const {
  registerCustomer,
  verifyCustomerOTP,
  loginCustomer,
  registerVendor,
  loginVendor
} = require('../controllers/authController');

const router = express.Router();

router.post('/customer/signup', registerCustomer);
router.post('/customer/verify', verifyCustomerOTP);
router.post('/customer/login', loginCustomer);

router.post('/vendor/signup', registerVendor);
router.post('/vendor/login', loginVendor);

module.exports = router;
