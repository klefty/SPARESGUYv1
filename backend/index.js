import express from 'express';
import connectDB from './Config/db.js';
import userRoutes from './routes/UserRoutes.js';
import productRoutes from './routes/productRoutes.js'
import  authMiddleware  from './Middleware/AuthMiddleware.js';
import { requireAdmin } from './Middleware/roleMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Serve files in the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to the database
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// User routes
app.use('/api/users', userRoutes);

// Product routes
app.use('/api/products', productRoutes);

// Protect the profile route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Protect the admin dashboard route
app.get('/admin/dashboard', authMiddleware, requireAdmin, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
