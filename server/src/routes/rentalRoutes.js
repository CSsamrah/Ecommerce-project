import express from "express"
import {
    returnRentalOrder,
    getRentalDetails, 
    userRentals, 
    getProductRentalHistory }
from "../controllers/rentalController.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"

const rentalRoutes=express.Router();

// rentalRoutes.post("/rentProduct/:id",isLoggedIn,createRentalOrder)
rentalRoutes.post("/returnRental/:id",isLoggedIn,returnRentalOrder)
rentalRoutes.get("/getRental/:id",isLoggedIn,getRentalDetails);
rentalRoutes.get("/getUserRentals",isLoggedIn,userRentals)
rentalRoutes.get("/getRentalHistory/:id",isLoggedIn,getProductRentalHistory)

export default rentalRoutes;