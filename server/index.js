import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import validationRoutes from "./src/routes/verifyProdutcRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});
app.use("/api/users",userRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/products",productRoutes)
app.use("/api/validate",validationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
