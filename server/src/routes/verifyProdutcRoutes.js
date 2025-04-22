import express from "express"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"
import { validateProduct } from "../controllers/prod_authentication.controller.js"

const validationRoutes=express.Router();

validationRoutes.post("/validate-product/:product_id",isLoggedIn,validateProduct);

export default validationRoutes