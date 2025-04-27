import express from 'express'
import { getAccessToken,verifyTransaction } from '../controllers/paymentController.js'
import { isLoggedIn } from '../middlewares/authentication.middleware.js';

const router = express.Router();

router.post('/get-token',isLoggedIn, getAccessToken);
router.get('/verifyTxn', verifyTransaction);

export default router;