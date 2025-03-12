import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const placeOrder = asyncHandler(async (req, res) => {

    // Use the isLoggedIn middleware to get the user from the request
    // User information should be attached by isLoggedIn middleware
    const user = req.user; 
     
    if (!user) {
        throw new ApiError(401, "Unauthorized: User not found in request. Ensure you are logged in.");
    }

    const user_id = user.user_id; // Access user_id from the user object
    const { status } = req.body;
  
    // Fetch cart items for the user
    const cartQuery = 'SELECT * FROM cart WHERE user_id = $1';
    const cartValues = [user_id];
    const cartResult = await pool.query(cartQuery, cartValues);
    const cartItems = cartResult.rows;
  
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add items to cart before placing an order.' });
    }
  
    // Calculate the total price from cart items
    const total_price = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
    // Start a database transaction
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
  
      // Create a new order in the orders table
      const orderQuery = `
        INSERT INTO orders (user_id, total_price, status)
        VALUES ($1, $2, $3)
        RETURNING order_id
      `;
      const orderValues = [user_id, total_price, status];
      const orderResult = await client.query(orderQuery, orderValues);
      const order_id = orderResult.rows[0].order_id;
  
      // Copy cart items into the order_item table
      for (const cartItem of cartItems) {
        const orderItemQuery = `
          INSERT INTO order_item (order_id, product_id, quantity, price_per_unit, item_type, rental_id, secondhand_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const orderItemValues = [
          order_id,
          cartItem.product_id,
          cartItem.quantity,
          cartItem.price,
          cartItem.item_type,
          cartItem.rental_id,
          cartItem.secondhand_id,
        ];
        await client.query(orderItemQuery, orderItemValues);
      }
  
      //  Clear the user's cart
      const deleteCartQuery = 'DELETE FROM cart WHERE user_id = $1';
      const deleteCartValues = [user_id];
      await client.query(deleteCartQuery, deleteCartValues);
  
      // Commit the transaction
      await client.query('COMMIT');
  
      return res.status(201).json({ message: 'Order placed successfully.', order_id: order_id });
    } catch (error) {

      // Rollback the transaction if any error occurred
      await client.query('ROLLBACK');
      console.error('Transaction failed:', error);
      return res.status(500).json({ message: 'Failed to place order.', error: error.message });
    } finally {
      client.release();
    }
  });

 
//Get User Orders
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

// Get Order Details
export const getOrderDetails = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    if (!order_id) {
        throw new ApiError(400, "Order ID is required.");
    }

    const query = `
        SELECT oi.*, p.name AS product_name 
        FROM order_item oi
        JOIN product p ON oi.product_id = p.product_id
        WHERE oi.order_id = $1
    `;
    const result = await pool.query(query, [order_id]);

    if (!result.rows.length) {
        throw new ApiError(404, "Order details not found.");
    }

    res.status(200).json({ success: true, orderItems: result.rows });
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

//  Get Order Status
export const getOrderStatus = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    if (!order_id) {
        throw new ApiError(400, "Order ID is required.");
    }

    const query = `SELECT order_id, status FROM orders WHERE order_id = $1`;
    const result = await pool.query(query, [order_id]);

    if (!result.rows.length) {
        throw new ApiError(404, "Order not found.");
    }

    res.status(200).json({ success: true, orderStatus: result.rows[0] });
});

//  Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { order_id } = req.params;
// Example: "processing", "shipped", "delivered"
    const { status } = req.body; 

    if (!order_id) {
        throw new ApiError(400, "Order ID is required.");
    }

    if (!status) {
        throw new ApiError(400, "Status is required.");
    }

    const validStatuses = ["processing", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status value.");
    }

    // Ensure only admins can update order status
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can update order status.");
    }

    const updateQuery = `UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *`;
    const result = await pool.query(updateQuery, [status, order_id]);

    if (!result.rows.length) {
        throw new ApiError(404, "Order not found or status unchanged.");
    }

    res.status(200).json({ success: true, message: "Order status updated successfully.", order: result.rows[0] });
});
