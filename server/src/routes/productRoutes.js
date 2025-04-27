import express from "express"
import { addProduct, deleteProduct, getOneProduct, updateProduct, getAllProducts } from "../controllers/product.controller.js"
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
productRoutes.get("/getAllProducts", getAllProducts);
productRoutes.get("/getProduct/:id",isLoggedIn,getOneProduct)

productRoutes.patch("/updateProduct/:id",upload.fields([
    {
        name:"product_image",
        maxCount:2
    }
]),isLoggedIn,updateProduct)

productRoutes.delete("/deleteProduct/:id",isLoggedIn,deleteProduct)

export default productRoutes