// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { log, globalErr } from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';
import saleRoutes from './routes/saleRoutes.mjs';

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(log);
app.use(express.json());
app.use(cors);

// DB connection
connectDB();

// Routes
app.use("/api/sale", saleRoutes);
//app.use("/api/user", userRoutes);


// Global err handling
app.use(globalErr);

// Listening
app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})
