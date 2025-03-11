import express from "express"
import { registerUser,
    loginUser,
    logOut,
    forgotPassowrd,
    resetPwd,
    changePassword,
    getAccountDetails,
    deleteAccount,
    updateAccount

} from "../controllers/user.controller.js"
import { isLoggedIn } from "../middlewares/authentication.middleware.js";

const userRoutes=express.Router();

userRoutes.post('/signUp',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.post('/logOut',isLoggedIn,logOut);
userRoutes.post('/getResetPwdOtp',forgotPassowrd);
userRoutes.post('/resetPwd',resetPwd);
userRoutes.post('/changePwd',isLoggedIn,changePassword);
userRoutes.get("/getAccountDetails",isLoggedIn,getAccountDetails);
userRoutes.put("/updateAccount",isLoggedIn,updateAccount);
userRoutes.delete("/deleteAccount",isLoggedIn,deleteAccount);

export default userRoutes;