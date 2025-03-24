import express from "express";
import { 
    listSecondhandProduct, 
    getSecondhandProduct, 
    getUserSecondhandProducts,  
} from "../controllers/secondHandController.js";
import { isLoggedIn,isAdmin } from "../middlewares/authentication.middleware.js";


const secondHandRoutes = express.Router();

secondHandRoutes.get("/listSecondHand", isLoggedIn, listSecondhandProduct);
secondHandRoutes.get("/getSecondHand/:id", getSecondhandProduct);
secondHandRoutes.get("/userSecondHand/:id",isAdmin, getUserSecondhandProducts); //for admin 

export default secondHandRoutes;
