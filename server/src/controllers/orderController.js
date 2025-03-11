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
    const { payment_status } = req.body;
  
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
        INSERT INTO orders (user_id, total_price, payment_status)
        VALUES ($1, $2, $3)
        RETURNING order_id
      `;
      const orderValues = [user_id, total_price, payment_status || 'pending'];
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