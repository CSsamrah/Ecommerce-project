import pool from "../../dbConnect.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { product_id, is_rental = false, rental_days = 0, quantity = 1 } = req.body;
  const user_id = req.user.user_id;

  const productRes = await pool.query(
    `SELECT product_id, user_id, price, rental_available FROM product WHERE product_id = $1`,
    [product_id]
  );
  if (productRes.rows.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  const product = productRes.rows[0];
  if (product.user_id === user_id) {
    throw new ApiError(403, "You cannot add your own product to cart");
  }

  let total_price;
  let rental_price = null;

  if (is_rental) {
    if (!product.rental_available) {
      throw new ApiError(403, "Rental not available for this product");
    }
    if (rental_days < 1 || rental_days > 30) {
      throw new ApiError(400, "Rental days must be between 1 and 30");
    }

    if (rental_days <= 10) rental_price = product.price * 0.2;
    else if (rental_days <= 20) rental_price = product.price * 0.25;
    else rental_price = product.price * 0.3;

    total_price = rental_price * quantity;
  } else {
    total_price = product.price * quantity;
  }

  await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity, is_rental, rental_days, rental_price, total_price)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [user_id, product_id, quantity, is_rental, rental_days || null, rental_price, total_price]
  );

  return res.status(201).json(new ApiResponse(201, {
    product_id, is_rental, quantity, rental_days, rental_price, total_price
  }, "Item added to cart"));
});


//delete cart item
export const deleteCartItem = asyncHandler(async (req, res) => {
  const { cart_id } = req.params;
  const user_id = req.user.user_id;

  // First check if the cart item exists and belongs to the user
  const cartCheck = await pool.query(`SELECT * FROM cart WHERE cart_id = $1`, [cart_id]);

  if (cartCheck.rowCount === 0) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }

  if (cartCheck.rows[0].user_id !== user_id) {
    return res.status(403).json({ message: 'Unauthorized to delete this cart item.' });
  }

  // Proceed with deletion
  const query = `DELETE FROM cart WHERE cart_id = $1`;
  await pool.query(query, [cart_id]);

  return res.status(200).json({ message: 'Cart item deleted successfully.' });
});


export const updateCartItem = asyncHandler(async (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;
  const user_id = req.user?.user_id;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity.' });
  }

  // Calculate new total price
  let updatedTotalPrice;

   // Get the existing cart item
   const cartResult = await pool.query(`SELECT * FROM cart WHERE cart_id = $1`, [cart_id]);

   if (cartResult.rowCount === 0) {
     return res.status(404).json({ message: 'Cart item not found.' });
   }

   const cartItem = cartResult.rows[0];

   if (cartItem.user_id !== user_id) {
     return res.status(403).json({ message: 'You are not authorized to update this cart item.' });
   }

  if (cartItem.is_rental) {
    // Multiply rental price per unit by quantity
    updatedTotalPrice = parseFloat(cartItem.rental_price) * quantity;
  } else {
    const productResult = await pool.query(`SELECT price FROM product WHERE product_id = $1`, [cartItem.product_id]);
    if (productResult.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    const product = productResult.rows[0];
    // Multiply product price per unit by quantity
    updatedTotalPrice = parseFloat(product.price) * quantity

  }

  // Update cart item with new quantity and recalculated total price
  const updateQuery = `
    UPDATE cart
    SET quantity = $1,
        total_price = $2
    WHERE cart_id = $3
    RETURNING *;
  `;
  const updatedResult = await pool.query(updateQuery, [quantity, updatedTotalPrice, cart_id]);

  return res.status(200).json({
    message: 'Cart item updated successfully.',
    cartItem: updatedResult.rows[0],
  });
});



// get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const cartItems = await pool.query(
    `SELECT c.*, p.name, p.condition
       FROM cart c
       JOIN product p ON c.product_id = p.product_id
       WHERE c.user_id = $1`,
    [user_id]
  );

  return res.status(200).json(new ApiResponse(200, cartItems.rows, "Cart items fetched"));

});

//view full cart 
export const getUserCartItems = asyncHandler(async (req, res) => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM cart WHERE user_id = $1 ORDER BY added_at DESC`,
      [user_id]
    );

    return res.status(200).json({
      message: 'Cart items fetched successfully.',
      cartItems: result.rows
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Server error while fetching cart items.' });
  }
});

//completed and tested 
