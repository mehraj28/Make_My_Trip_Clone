const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Customer = require('./models/Customer');
const Vendor = require('./models/Vendor');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await Customer.deleteMany();
    await Vendor.deleteMany();

    const customerPassword = await bcrypt.hash('Customer123', 10);
    const vendorPassword = await bcrypt.hash('Vendor123', 10);

    const createdCustomer = await Customer.create({
      name: 'Demo Customer',
      email: 'customer@test.com',
      phone: '1234567890',
      password: customerPassword,
      isVerified: true
    });

    const createdVendor = await Vendor.create({
      name: 'Demo Vendor',
      email: 'vendor@test.com',
      phone: '0987654321',
      password: vendorPassword,
      serviceType: 'AC Repair',
      isVerified: true
    });

    console.log('Data seeded successfully!');
    console.log(`Customer: ${createdCustomer.email}`);
    console.log(`Vendor: ${createdVendor.email} (Service: ${createdVendor.serviceType})`);

    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(seedData);
