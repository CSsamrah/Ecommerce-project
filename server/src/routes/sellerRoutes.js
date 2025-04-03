import express from "express";
import {getTotalProductsSoldRented,productBreakdown,monthlyAnalytics,updateOrderStatus,getAllOrders} from "../controllers/sellerAnalyticsController.js";
import { isLoggedIn } from "../middlewares/authentication.middleware.js";

const router=express.Router();

router.get('/totalSold',isLoggedIn,getTotalProductsSoldRented);
router.get('/productBreakdown',isLoggedIn,productBreakdown);
router.get('/monthlyAnalytics',isLoggedIn,monthlyAnalytics);
router.put('/updateStatus/:order_id',isLoggedIn,updateOrderStatus);
router.get('getAllOrders',isLoggedIn,getAllOrders);



export default router;