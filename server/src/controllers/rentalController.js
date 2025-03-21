import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import pool from "../../dbConnect.js";

const createRentalOrder = asyncHandler(async (req, res) => {

    const { id: product_id } = req.params;
    if (!product_id) {
        throw new ApiError(400, "Product ID is missing")
    }
    const findExistingProduct = await pool.query(
        `SELECT user_id,product_id,rental_available,price FROM product WHERE product_id = $1`,
        [product_id]
    );
    
    if (findExistingProduct.rows.length == 0) {
        throw new ApiError(404, "Product not found");
    }
    const userID = req.user?.user_id;
    if (userID === findExistingProduct.rows[0]?.user_id) {
        throw new ApiError(403, "You cannot rent this product because you are its owner.")
    }
    const canBeRented = findExistingProduct?.rows[0]?.rental_available;
    if (canBeRented == "false" || canBeRented == false) {
        throw new ApiError(403, "Product can not be rented");
    }

    const { return_date } = req.body;
    const rentedAt = new Date();
    const returnDate = new Date(return_date);

    let rentalDuration = Math.ceil((returnDate - rentedAt) / (1000 * 60 * 60 * 24));
    console.log(rentalDuration);

    if (rentalDuration < 1) {
        throw new ApiError(400, "Return date must be at least 1 day after rental start");
    }

    let rental_price;
    const basePrice = findExistingProduct.rows[0]?.price;

    if (rentalDuration >= 1 && rentalDuration <= 10) {
        rental_price = basePrice * 0.2;
    } else if (rentalDuration >= 11 && rentalDuration <= 20) {
        rental_price = basePrice * 0.3;
    } else if (rentalDuration >= 21 && rentalDuration <= 30) {
        rental_price = basePrice * 0.4;
    } else {
        throw new ApiError(403, "Product cannot be rented for more than 30 days");
    }
    try {
        await pool.query(`UPDATE rental SET rental_duration=$1,rental_status='Rented',return_date = $2, 
        rental_price = $3, rented_by = $4, rented_at = $5 WHERE product_id=$6 RETURNING*`,
            [rentalDuration, returnDate, rental_price, userID, rentedAt, product_id]
        )

    } catch (err) {
        console.error("Error updating rental record:", err);
        throw new ApiError(500, "Database error while updating rental record");
    }

    try {
        await pool.query(`UPDATE product SET rental_available=FALSE WHERE product_id=$1`, [product_id])
    }
    catch (err) {
        throw new ApiError(403, "Error updating rent status in products table")
    }

    return res.status(201).json(new ApiResponse(200, {
        product_id,
        rented_by: userID,
        rented_at: rentedAt,
        return_date: returnDate,
        rental_duration: rentalDuration,
        rental_price
    }, "Rental order created successfully"))

})

export { createRentalOrder }