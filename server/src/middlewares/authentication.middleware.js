// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import pool from "../../dbConnect.js";

// const isLoggedIn = asyncHandler(async (req, _, next) => {
//     // First, try getting token from cookies
//     let token = req.cookies?.accessToken;
  
//     // If not in cookies, try getting from Authorization header
//     if (!token && req.header("Authorization")) {
//       token = req.header("Authorization").replace("Bearer ", "").trim();
//     }
  
//     console.log("TOKEN:", token);
  
//     if (!token) {
//       throw new ApiError(401, 'Unauthorized request: No token received');
//     }
  
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (error) {
//       console.error("JWT Verification Error:", error);
//       throw new ApiError(401, 'Unauthorized request: Invalid or expired token');
//     }
  
//     console.log("Decoded Token:", decodedToken);
  
//     const findUser = await pool.query('SELECT * FROM "Users" WHERE user_id=$1', [decodedToken.id]);
    
//     if (!findUser.rows.length) {
//       throw new ApiError(401, 'Unauthorized request: User not found');
//     }
  
//     req.user = findUser.rows[0];
  
//     next();
//   });
  

// const isAdmin = asyncHandler(async (req, res, next) => {
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
//     console.log("TOKEN: ", token);

//     if (!token) {
//         throw new ApiError(401, "Unauthorized request: No token received");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log("\nDecoded Token: ", decodedToken);

//     if (!decodedToken) {
//         throw new ApiError(401, "Unauthorized request: Invalid token");
//     }

//     const findUser = await pool.query('SELECT * FROM "Users" WHERE user_id=$1', [decodedToken.id]);

//     if (!findUser.rows.length) {
//         throw new ApiError(401, "Invalid Access Token");
//     }

//     // console.log("\nFetched User: ", findUser.rows[0]); 


//     if (findUser.rows[0].role !== "admin") {
//         throw new ApiError(403, "Forbidden: Admin access required");
//     }

//     req.user = findUser.rows[0];
//     next();
// });

// const authorizeSeller = (req, res, next) => {
//     if (req.user.role !== "seller") {
//         return res.status(403).json({ success: false, message: "Access denied. Only sellers can perform this action." });
//     }
//     next();
// };

// export { isLoggedIn ,isAdmin,authorizeSeller}

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import pool from "../../dbConnect.js";

const isLoggedIn = asyncHandler(async (req, _, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user in database
        const userResult = await pool.query(
            'SELECT * FROM "Users" WHERE user_id=$1',
            [decodedToken.id]
        );

        if (userResult.rows.length === 0) {
            throw new ApiError(401, "Invalid access token");
        }

        // Attach user to request
        req.user = userResult.rows[0];
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

// const isAdmin = asyncHandler(async (req, _, next) => {
//     try {
//         if (req.user?.role !== "admin") {
//             throw new ApiError(403, "Forbidden: Admin access required");
//         }
//         next();
//     } catch (error) {
//         throw new ApiError(403, error?.message || "Admin access required");
//     }
// });

const isAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    console.log("TOKEN: ", token);

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token received");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("\nDecoded Token: ", decodedToken);

    if (!decodedToken) {
        throw new ApiError(401, "Unauthorized request: Invalid token");
    }

    const findUser = await pool.query('SELECT * FROM "Users" WHERE user_id=$1', [decodedToken.id]);

    if (!findUser.rows.length) {
        throw new ApiError(401, "Invalid Access Token");
    }

    // console.log("\nFetched User: ", findUser.rows[0]); 


    if (findUser.rows[0].role !== "admin") {
        throw new ApiError(403, "Forbidden: Admin access required");
    }

    req.user = findUser.rows[0];
    next();
});

const authorizeSeller = asyncHandler(async (req, _, next) => {
    try {
        if (req.user?.role !== "seller") {
            throw new ApiError(403, "Forbidden: Seller access required");
        }
        next();
    } catch (error) {
        throw new ApiError(403, error?.message || "Seller access required");
    }
});

export { isLoggedIn, isAdmin, authorizeSeller };
