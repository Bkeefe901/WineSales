// Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { log, globalErr } from "./middleware/middleware.mjs";
import connectDB from "./db/conn.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import saleRoutes from "./routes/saleRoutes.mjs";


// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB connection
connectDB();

// Middleware
app.use(log);
app.use(express.json());
//app.use(cors); // turned off because it wasn't allowing requests locally


// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sale", saleRoutes);

// Global err handling
app.use(globalErr);

// Listening
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
})
