import express from "express";
import {getTotalProductsSoldRented,productBreakdown,monthlyAnalytics,updateOrderStatus,getAllOrders,getProductRentalHistory,getUserSecondhandProducts} from "../controllers/sellerAnalyticsController.js";
import { isLoggedIn ,isAdmin} from "../middlewares/authentication.middleware.js";

const router=express.Router();

router.get('/totalSold',isLoggedIn,getTotalProductsSoldRented);
router.get('/productBreakdown',isLoggedIn,productBreakdown);
router.get('/monthlyAnalytics',isLoggedIn,monthlyAnalytics);
router.put('/updateStatus/:order_id',isLoggedIn,updateOrderStatus);
router.get('/getAllOrders',isLoggedIn,getAllOrders);
router.get("/getRentalHistory/:id",isLoggedIn,getProductRentalHistory);
router.get("/userSecondHand/:id",isAdmin, getUserSecondhandProducts); //for admin 





export default router;