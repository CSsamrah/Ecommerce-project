import express from 'express'
import { getAccessToken,verifyTransaction } from '../controllers/paymentController.js'

const router = express.Router();

router.post('/get-token', getAccessToken);
router.get('/verifyTxn', verifyTransaction);

export default router;