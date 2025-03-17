import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import validationRoutes from "./src/routes/verifyProdutcRoutes.js";

import cors from "cors";
import dotenv from "dotenv";
import pool from "./dbConnect.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import secondRoutes from "./src/routes/secondHandRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => console.log('Connected to supabase!'))
  .catch(err => {
    console.error('Database connection error:', err.message);

});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});
app.use("/api/users",userRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/second", secondRoutes);
app.use("/api/products",productRoutes)
app.use("/api/validate",validationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
