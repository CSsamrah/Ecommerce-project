import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import pool from "../../dbConnect.js";

const isLoggedIn=asyncHandler(async(req,_,next)=>{
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    console.log("TOKEN: ",token);

    if(!token){
        throw new ApiError(401,'Unauthorized request: No token received');
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    console.log("\nDecoded Token: ",decodedToken);

    if(!decodedToken){
        throw new ApiError(401,'Unauthorized request: Invalid token');
    }
    const findUser=await pool.query('SELECT * FROM "Users" WHERE user_id=$1',[decodedToken.id]);
    if(!findUser.rows.length){
        throw new ApiError(401,'Invalid Access Token');
    }
    req.user = findUser.rows[0];
    
    next(); 
})

export { isLoggedIn }