const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');
const Vendor = require('../models/Vendor');
const { sendOTP } = require('../utils/emailService');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Register a new customer
// @route   POST /api/auth/customer/signup
const registerCustomer = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const customerExists = await Customer.findOne({ email });
    if (customerExists) return res.status(400).json({ message: 'Customer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry
    });

    await sendOTP(email, otp);

    res.status(201).json({
      message: 'Customer registered. Please verify OTP.',
      email: customer.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Customer OTP
// @route   POST /api/auth/customer/verify
const verifyCustomerOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: 'Customer not found' });
    if (customer.isVerified) return res.status(400).json({ message: 'Customer already verified' });
    if (customer.otp !== otp || customer.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    customer.isVerified = true;
    customer.otp = undefined;
    customer.otpExpiry = undefined;
    await customer.save();

    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      role: 'customer',
      token: generateToken(customer._id, 'customer'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login Customer
// @route   POST /api/auth/customer/login
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (customer && (await bcrypt.compare(password, customer.password))) {
      if (!customer.isVerified) {
        return res.status(401).json({ message: 'Please verify your email first' });
      }
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        role: 'customer',
        token: generateToken(customer._id, 'customer'),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new vendor
// @route   POST /api/auth/vendor/signup
const registerVendor = async (req, res) => {
  const { name, email, phone, password, serviceType } = req.body;
  try {
    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists) return res.status(400).json({ message: 'Vendor already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      name,
      email,
      phone,
      password: hashedPassword,
      serviceType,
      isVerified: true // Assuming vendor auto-verified for simplicity, or we can add OTP
    });

    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      serviceType: vendor.serviceType,
      role: 'vendor',
      token: generateToken(vendor._id, 'vendor'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login Vendor
// @route   POST /api/auth/vendor/login
const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (vendor && (await bcrypt.compare(password, vendor.password))) {
      res.json({
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        serviceType: vendor.serviceType,
        role: 'vendor',
        token: generateToken(vendor._id, 'vendor'),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerCustomer,
  verifyCustomerOTP,
  loginCustomer,
  registerVendor,
  loginVendor
};
