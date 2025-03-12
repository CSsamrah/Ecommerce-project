import express from "express"
import { placeOrder,getUserOrders,getOrderDetails,cancelOrder,getOrderStatus,updateOrderStatus } from "../controllers/orderController.js"
import { isAdmin, isLoggedIn } from "../middlewares/authentication.middleware.js"

const router=express.Router();

router.post("/placeOrder",isLoggedIn,placeOrder);
router.get("/getUserOrders", isLoggedIn, getUserOrders);
router.get("/details/:order_id", isLoggedIn, getOrderDetails);
router.post("/cancel/:order_id", isLoggedIn, cancelOrder);
router.get("/status/:order_id", isLoggedIn, getOrderStatus);
router.put("/updateStatus/:order_id",isLoggedIn,isAdmin, updateOrderStatus);

export default router;