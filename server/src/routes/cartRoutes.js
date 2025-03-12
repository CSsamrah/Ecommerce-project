import express from "express";
import { addToCart, deleteCartItem, updateCartItem, getCartItems } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/add", isLoggedIn,addToCart);
router.delete("/delete/:cart_id", deleteCartItem);
router.put("/update/:cart_id", updateCartItem);
router.get("/getItems",isLoggedIn, getCartItems);

export default router;