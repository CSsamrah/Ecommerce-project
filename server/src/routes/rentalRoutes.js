import express from "express"
import {
    returnRentalOrder,
    getRentalDetails,
    getRentalProduct, 
    userRentals,
    getAllRentals}
from "../controllers/rentalController.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js"

const rentalRoutes=express.Router();

// rentalRoutes.post("/rentProduct/:id",isLoggedIn,createRentalOrder)
rentalRoutes.post("/returnRental/:id",isLoggedIn,returnRentalOrder)
rentalRoutes.get("/getRental/:id",getRentalDetails);
rentalRoutes.get("/getRentalProduct/:id" , (req, res, next) => {
    console.log("🏁 Rental Product Route hit! Id:", req.params.id); // Debug log
    next();
  },getRentalProduct);
rentalRoutes.get("/getUserRentals",isLoggedIn,userRentals)
rentalRoutes.get("/getAllRentals", getAllRentals);

export default rentalRoutes;