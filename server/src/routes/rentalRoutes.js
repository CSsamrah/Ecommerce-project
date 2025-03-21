import express from "express"
import { createRentalOrder } from "../controllers/rentalController.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"

const rentalRoutes=express.Router();

rentalRoutes.post("/rentProduct/:id",isLoggedIn,createRentalOrder)

export default rentalRoutes;