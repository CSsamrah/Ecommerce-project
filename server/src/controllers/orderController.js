import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const placeOrder = asyncHandler(async (req, res) => {
  // Use the isLoggedIn middleware to get the user from the request
  const user = req.user;

  if (!user) {
      throw new ApiError(401, "Unauthorized: User not found in request. Ensure you are logged in.");
  }

  const user_id = user.user_id; // Access user_id from the user object
  const { status = 'processing' } = req.body;

  // Fetch cart items for the user
  const cartQuery = 'SELECT * FROM cart WHERE user_id = $1';
  const cartValues = [user_id];
  const cartResult = await pool.query(cartQuery, cartValues);
  const cartItems = cartResult.rows;

  if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add items to cart before placing an order.' });
  }

  // Calculate the total amount from cart items (using total_price)
  const total_amount = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

  // Start a database transaction
  const client = await pool.connect();

  try {
      await client.query('BEGIN');

      // Create a new order in the orders table
      const orderQuery = `
          INSERT INTO orders (user_id, total_amount, status)
          VALUES ($1, $2, $3)
          RETURNING order_id
      `;
      const orderValues = [user_id, total_amount, status];
      const orderResult = await client.query(orderQuery, orderValues);
      const order_id = orderResult.rows[0].order_id;

      // Copy cart items into the order_item table
      for (const cartItem of cartItems) {
          const orderItemQuery = `
              INSERT INTO order_item (order_id, product_id, quantity, price, total_price, rental_days, is_rental)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;
          const orderItemValues = [
              order_id,
              cartItem.product_id,
              cartItem.quantity,
              cartItem.rental_price,
              parseFloat(cartItem.total_price),  // Using total_price from the cart table
              cartItem.rental_days,
              cartItem.is_rental
          ];
          await client.query(orderItemQuery, orderItemValues);
      }

      // Clear the user's cart after placing the order
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

