# Make_My_Trip_Clone
Develop a website having customer and vendor login, ui like MakeMyTrip, having functionality:  1. Customer can signup, login and book service.  2. Vendor can accept service and mark it delivered after completion.  3. Customer sign-up will be done with otp.


# QuickService Booking Platform

A full-stack service booking platform inspired by the clean, modern aesthetic of MakeMyTrip, featuring customer and vendor portals.

## Features
- **Customer Portal**: Sign up, verify OTP (via Email), browse services, and book services.
- **Vendor Portal**: Vendor-specific dashboard to view assigned or pending jobs for their service type, accept jobs, and mark them completed.
- **Authentication**: JWT-based role authentication with secure OTP verification.
- **Tech Stack**: MongoDB, Express.js, React (Vite, JS, Tailwind v4), Node.js.

## Local Setup

### 1. Database & Environment Setup
Ensure you have MongoDB running locally or a MongoDB Atlas connection string.
Create a `.env` file in the `server` directory and `client` directory based on the provided `.env.example` files.

**Backend `.env`:**
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
*(Note: If you don't provide Email credentials, the OTP will be printed to the backend console).*

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies
Open two terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm install
node seed.js # (Optional) To seed the DB with demo accounts
npm start
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

### 3. Demo Accounts
If you ran `node seed.js`, you can use the following accounts:
- **Customer**: `customer@test.com` / `Customer123`
- **Vendor**: `vendor@test.com` / `Vendor123`

