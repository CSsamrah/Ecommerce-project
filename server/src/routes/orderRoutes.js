import express from "express"
import { placeOrder,getOrderDetails,getOrderStatus } from "../controllers/orderController.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"

const router=express.Router();

router.post("/placeOrder",isLoggedIn,placeOrder);
router.get("/details/:order_id", isLoggedIn, getOrderDetails);
router.get("/status/:order_id", isLoggedIn, getOrderStatus);

export default router;