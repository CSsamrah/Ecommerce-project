import express from "express";
import { createCategory,getSingleCategory,getAllCategories,updateCategory,deleteCategory} from "../controllers/category.controller.js";
import { isLoggedIn } from "../middlewares/authentication.middleware.js";

const categoryRoutes=express.Router();

//ALL users
categoryRoutes.get("/getCategory/:slug",getSingleCategory);   
categoryRoutes.get("/getAllCategories",getAllCategories);

//ONLY admin
categoryRoutes.post("/createCategory",isLoggedIn,createCategory);
categoryRoutes.patch("/updateCategory/:slug",isLoggedIn,updateCategory);
categoryRoutes.delete("/deleteCategory/:slug",isLoggedIn,deleteCategory);

export default categoryRoutes;