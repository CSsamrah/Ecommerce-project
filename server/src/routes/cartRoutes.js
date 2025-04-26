import express from "express";
import { addToCart, deleteCartItem, updateCartItem, getCartItems,getUserCartItems } from "../controllers/cartController.js";
import { isLoggedIn } from "../middlewares/authentication.middleware.js";


const router = express.Router();

router.post("/add", isLoggedIn,addToCart);
router.delete("/delete/:cart_id",isLoggedIn, deleteCartItem);
router.put("/update/:cart_id",isLoggedIn, updateCartItem);
router.get("/getItems",isLoggedIn, getCartItems);
router.get('/getUserCartItems', isLoggedIn, getUserCartItems);

export default router;

// import express from "express";
// import { 
//   addToCart, 
//   deleteCartItem, 
//   updateCartItem, 
//   getCartItems,
//   getUserCartItems 
// } from "../controllers/cartController.js";
// import { isLoggedIn } from "../middlewares/authentication.middleware.js";

// const router = express.Router();

// // All routes are prefixed with /api/cart
// router.post("/add", isLoggedIn, addToCart);
// router.delete("/delete/:cart_id", isLoggedIn, deleteCartItem);
// router.put("/update/:cart_id", isLoggedIn, updateCartItem);
// router.get("/getItems", isLoggedIn, getCartItems);
// router.get("/getUserCartItems", isLoggedIn, getUserCartItems);

// export default router;