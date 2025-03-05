import express from "express"
import { registerUser,loginUser,logOut,forgotPassowrd,resetPwd } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js";

const userRoutes=express.Router();

userRoutes.post('/signUp',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.post('/logOut',isLoggedIn,logOut);
userRoutes.post('/getResetPwdOtp',forgotPassowrd);
userRoutes.post('/resetPwd',resetPwd);

export default userRoutes;