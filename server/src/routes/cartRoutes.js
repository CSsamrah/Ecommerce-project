import express from "express";
import { addToCart, deleteCartItem, updateCartItem, getCartItems } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.delete("/delete/:cart_id", deleteCartItem);
router.put("/update/:cart_id", updateCartItem);
router.get("/:user_id", getCartItems);

export default router;