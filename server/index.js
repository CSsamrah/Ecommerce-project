import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import validationRoutes from "./src/routes/verifyProdutcRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./dbConnect.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import secondHandRoutes from "./src/routes/secondHandRoutes.js";
import rentalRoutes from "./src/routes/rentalRoutes.js";
import adminRoutes from "./src/routes/adminDashboardRoutes.js";
import sellerRoutes from "./src/routes/sellerRoutes.js";
import buyerRoutes from "./src/routes/buyerRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js"

import cors from "cors";
import dotenv from "dotenv";
import pool from "./dbConnect.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

pool.connect()
  .then(() => console.log('Connected to supabase!'))
  .catch(err => {
    console.error('Database connection error:', err.message);

});

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Backend is running!");
});
app.use("/api/users",userRoutes);
app.use("/api/categories",categoryRoutes);
app.use("api/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/api/secondHand", secondHandRoutes);
app.use("/api/products",productRoutes)
app.use("/api/validate",validationRoutes);
app.use("/api/rental",rentalRoutes);
app.use("/api/admin",adminRoutes);
app.use("/seller",sellerRoutes);
app.use("/buyer",buyerRoutes);
app.use("/review", reviewRoutes);
app.use("/api/payfast",paymentRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
