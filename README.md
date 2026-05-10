<<<<<<< HEAD
# Make_My_Trip_Clone
Develop a website having customer and vendor login, ui like MakeMyTrip, having functionality:  1. Customer can signup, login and book service.  2. Vendor can accept service and mark it delivered after completion.  3. Customer sign-up will be done with otp.

=======
>>>>>>> 8b36b3c (Initial QuickService booking platform)
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
<<<<<<< HEAD
=======

## Deployment Instructions (Free Hosting)

### Database: MongoDB Atlas
1. Create a free cluster on MongoDB Atlas.
2. In Network Access, whitelist `0.0.0.0/0` (Allow access from anywhere).
3. Get the connection string and replace `<username>` and `<password>`.

### Backend: Render
1. Push your code to GitHub.
2. Log into Render.com and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `server`.
5. Build Command: `npm install`
6. Start Command: `node index.js`
7. Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`.
8. Deploy! Copy the Render URL (e.g., `https://quickservice-api.onrender.com`).

### Frontend: Vercel
1. Log into Vercel.com and add a new project.
2. Connect your GitHub repository.
3. Set the Root Directory to `client`.
4. Framework Preset: `Vite`.
5. Add Environment Variable: `VITE_API_URL` and set it to your Render backend URL with `/api` appended (e.g., `https://quickservice-api.onrender.com/api`).
6. Deploy!
>>>>>>> 8b36b3c (Initial QuickService booking platform)
