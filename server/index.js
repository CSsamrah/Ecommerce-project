import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./dbConnect.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
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

app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
