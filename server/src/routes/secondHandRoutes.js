import express from "express";
import { 
    listSecondhandProduct, 
    getSecondhandProduct, 
    getUserSecondhandProducts, 
    updateSecondhandStatus, 
    deleteSecondhandProduct 
} from "../controllers/secondHandController.js";
import { isLoggedIn,authorizeSeller } from "../middlewares/authentication.middleware.js";


const router = express.Router();

router.post("/listSecondHand", isLoggedIn, authorizeSeller, listSecondhandProduct);

router.get("getSecondHand/:secondhand_id", getSecondhandProduct);

router.get("/userSecondHand/:seller_id", getUserSecondhandProducts); //for admin 

//  Update the sale status of a second-hand product (Only sellers can update)
router.put("/status/:secondhand_id", isLoggedIn, authorizeSeller, updateSecondhandStatus);

//  Remove a second-hand listing (Only sellers can delete)
router.delete("/delete/:secondhand_id", isLoggedIn, authorizeSeller, deleteSecondhandProduct);

export default router;
