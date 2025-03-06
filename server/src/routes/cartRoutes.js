import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authentication.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();

router.post('/cart/items', isLoggedIn, asyncHandler(addToCart));
router.delete('/cart/items/:product_id', isLoggedIn, asyncHandler(removeFromCart));
router.get('/cart', isLoggedIn, asyncHandler(getCart));

export default router;