import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"

const router=express.Router();

router.post("/placeOrder",isLoggedIn,placeOrder);

export default router;