const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
