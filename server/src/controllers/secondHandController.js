import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// List a used product for sale
export const listSecondhandProduct = asyncHandler(async (req, res) => {
    const { product_id, condition, rental_status, price } = req.body;
    const seller_id = req.user.user_id;  
    
    // Check if the product is already listed
    const existing = await pool.query(
        `SELECT * FROM secondhand WHERE product_id = $1 AND seller_id = $2 AND status = 'available'`,
        [product_id, seller_id]
    );

    if (existing.rows.length) {
        throw new ApiError(400, "You have already listed this product for sale");
    }

    //inserting new product
    const result = await pool.query(
        `INSERT INTO secondhand (product_id, seller_id, condition, rental_status, status, price)
         VALUES ($1, $2, $3, $4, 'available', $5) RETURNING *`,
        [product_id, seller_id, condition, rental_status, price]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
});

//  Retrieve details of a specific second-hand sale
export const getSecondhandProduct = asyncHandler(async (req, res) => {
    const { secondhand_id } = req.params;
    
    const result = await pool.query(
        `SELECT * FROM secondhand WHERE secondhand_id = $1`,
        [secondhand_id]
    );

    if (!result.rowCount) {
        throw new ApiError(404, "Second-hand product not found");
    }

    res.status(200).json({ success: true, data: result.rows[0] });
});

// Retrieve all second-hand products listed by a user
export const getUserSecondhandProducts = asyncHandler(async (req, res) => {
    const { seller_id } = req.params;
    
    const result = await pool.query(
        `SELECT * FROM secondhand WHERE seller_id = $1`,
        [seller_id]
    );

    res.status(200).json({ success: true, data: result.rows });
});

// Update the sale status of a second-hand product
export const updateSecondhandStatus = asyncHandler(async (req, res) => {
    const { secondhand_id } = req.params;
    const { status } = req.body;
    const seller_id = req.user.user_id; 
    
    const validStatuses = ["available", "sold"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status value");
    } 

    const existing = await pool.query(
        `SELECT * FROM secondhand WHERE secondhand_id = $1 AND seller_id = $2`,
        [secondhand_id, seller_id]
    );

    if (!existing.rows.length) {
        throw new ApiError(403, "Unauthorized to update this product");
    }
    const result = await pool.query(
        `UPDATE secondhand SET status = $1 WHERE secondhand_id = $2 RETURNING *`,
        [status, secondhand_id]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
});

// Remove a second-hand listing
export const deleteSecondhandProduct = asyncHandler(async (req, res) => {
    const { secondhand_id } = req.params;
    const seller_id = req.user.user_id;  // Ensure only the seller can delete

    const existing = await pool.query(
        `SELECT * FROM secondhand WHERE secondhand_id = $1 AND seller_id = $2`,
        [secondhand_id, seller_id]
    );

    if (!existing.rows.length) {
        throw new ApiError(403, "Unauthorized to delete this product");
    }
    // Delete and return deleted product details
    const deletedProduct = existing.rows[0];
    await pool.query(`DELETE FROM secondhand WHERE secondhand_id = $1`, [secondhand_id]);

    res.status(200).json({ success: true, message: "Product listing deleted", deletedProduct });
});
