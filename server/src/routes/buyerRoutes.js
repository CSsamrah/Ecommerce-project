import express from 'express';
import { getUserOrders,cancelOrder,rentalHistory } from '../controllers/buyerDashboard.js';

import { isLoggedIn } from '../middlewares/authentication.middleware.js';

const router = express.Router();

router.post("/cancel/:order_id", isLoggedIn, cancelOrder);
router.get("/getUserOrders", isLoggedIn, getUserOrders);
router.get("/rentalHistory", isLoggedIn, rentalHistory);


export default router;