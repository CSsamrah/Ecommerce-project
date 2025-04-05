import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// List all second-hand products for sale
export const listSecondhandProduct = asyncHandler(async (req, res) => {
    
    const condition='second-hand';
    const allSecondHandQuery=`SELECT 
        p.name,
        p.description,
        p.price,
        p.stock_quantity,
        p.rental_available,
        p.product_features,
        p.product_image,
        c.category_id,
        c.category_name
    FROM product p
    LEFT JOIN category c ON c.category_id = p.category_id
    WHERE p.condition = $1;
    `;
    const secondHandResult=await pool.query(allSecondHandQuery,[condition]);

    if(secondHandResult.rows.length==0){
        throw new ApiError(404,"No second hand product found")
    }
    const response=secondHandResult.rows;
    return res.status(200).json(new ApiResponse(200,{response},"Second hand products fetched successfully"))
});

//  Retrieve details of a specific second-hand product
export const getSecondhandProduct = asyncHandler(async (req, res) => {
    const { id:product_id } = req.params;
    const condition='second-hand'

    const isSecondHand=await pool.query(`SELECT condition from product WHERE product_id=$1`,[product_id]);

    if(isSecondHand.rowCount==0){
        throw new ApiError(404,"Product does not exist")
    }
    if(isSecondHand.rows[0]?.condition!=='second-hand'){
        throw new ApiError(403,"The product you are querying isn't a second-hand product")
    }
     
    const secondHandProduct = await pool.query(
        `SELECT 
            p.name,
            p.description,
            p.price,
            p.stock_quantity,
            p.rental_available,
            p.product_features,
            p.product_image,
            c.category_id,
            c.category_name
            FROM product p
        LEFT JOIN category c on c.category_id=p.category_id
        WHERE p.product_id=$1 AND p.condition=$2 `,
        [product_id,condition]
    );

    if (!secondHandProduct.rowCount) {
        throw new ApiError(404, "Second-hand product not found");
    }

    const response=secondHandProduct.rows;

    res.status(200).json(new ApiResponse(200,{response},"Product fetched successfully"))
});

// Retrieve all second-hand products listed by a user


