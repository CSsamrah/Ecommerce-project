import express from "express"
import { addProduct } from "../controllers/product.controller.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const productRoutes=express.Router();

productRoutes.post("/addProduct",
    upload.fields([
    {
        name:"product_image",
        maxCount:2
    }
]),
isLoggedIn,
addProduct);

export default productRoutes