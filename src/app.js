import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/', productRoutes);

export default app;
