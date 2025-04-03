import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


//Get particular User Orders
export const getUserOrders = asyncHandler(async (req, res) => {
    const user=req.user;
    if(!user){
      throw new ApiError(401, "Unauthorized: User not found in request. Ensure you are logged in.");
    }

    const user_id=user.user_id;
    if (!user_id) {
        throw new ApiError(400, "User ID is required.");
    }

    const query = `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [user_id]);

    if (!result.rows.length) {
        throw new ApiError(404, "No orders found for this user.");
    }

    res.status(200).json({ success: true, orders: result.rows });
});

// Cancel Order (Only before shipping)
export const cancelOrder = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    if (!order_id) {
        throw new ApiError(400, "Order ID is required.");
    }

    // Check current order status
    const checkQuery = `SELECT status FROM orders WHERE order_id = $1`;
    const checkResult = await pool.query(checkQuery, [order_id]);

    if (!checkResult.rows.length) {
        throw new ApiError(404, "Order not found.");
    }

    const orderStatus = checkResult.rows[0].status;
    if (orderStatus !== "processing") {
        throw new ApiError(400, "Order cannot be canceled after processing.");
    }

    // Cancel the order
    const cancelQuery = `UPDATE orders SET status = 'cancelled' WHERE order_id = $1 RETURNING *`;
    const cancelResult = await pool.query(cancelQuery, [order_id]);

    res.status(200).json({ success: true, message: "Order canceled successfully.", order: cancelResult.rows[0] });
});

//rental history 

export const rentalHistory=asyncHandler( async (req, res) => {
    try {
        const userId = req.user.user_id;

        // Query to get all products rented by a specific user
        const query = `
            SELECT
                p.product_id,
                p.name,
                p.description,
                p.price,
                p.product_image,
                r.rental_id,
                r.rental_price,
                r.rental_duration,
                r.rental_status,
                r.rented_at,
                r.return_date,
                r.returned_at
            FROM
                rental r
            JOIN
                product p ON r.product_id = p.product_id
            WHERE
                r.rented_by = $1;
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            const rentedProducts = result.rows.map(row => ({
                product_id: row.product_id,
                name: row.name,
                description: row.description,
                price: parseFloat(row.price),
                product_image: row.product_image,
                rental_id: row.rental_id,
                rental_price: parseFloat(row.rental_price),
                rental_duration: row.rental_duration,
                rental_status: row.rental_status,
                rented_at: row.rented_at,
                return_date: row.return_date,
                returned_at: row.returned_at
            }));

            res.json(rentedProducts);
        } else {
            res.json({ message: 'No rented products found for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

