import pool from "../../dbConnect.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from 'uuid';

export const addToCart = asyncHandler(async (req, res) => {
  const user=req.user;
  if(!user){
    throw new ApiError(401, "Unauthorized: User not found in request. Ensure you are logged in.");
  }

  const user_id=user.user_id;

  const {item_type, product_id, rental_id, secondhand_id, quantity, status } = req.body;

  if (!user_id || !item_type || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Missing required fields or invalid quantity.' });
  }

  if (!['product', 'rental', 'secondhand'].includes(item_type)) {
    return res.status(400).json({ message: 'Invalid item_type.' });
  }

  let query, values;
  let price;

  switch (item_type) {
    case 'product':
      if (!product_id) return res.status(400).json({ message: 'Missing product_id.' });
      query = 'SELECT product_id, price FROM product WHERE product_id = $1';
      values = [product_id];
      break;
    case 'rental':
      if (!rental_id) return res.status(400).json({ message: 'Missing rental_id.' });
      query = 'SELECT rental_id, price FROM rental WHERE rental_id = $1';
      values = [rental_id];
      break;
    case 'secondhand':
      if (!secondhand_id) return res.status(400).json({ message: 'Missing secondhand_id.' });
      query = 'SELECT secondhand_id, price FROM secondhand WHERE secondhand_id = $1';
      values = [secondhand_id];
      break;
  }

  const itemResult = await pool.query(query, values);
  if (itemResult.rows.length === 0) {
    return res.status(404).json({ message: `${item_type} not found.` });
  }

  price = itemResult.rows[0].price;

  query = `
      SELECT * FROM cart
      WHERE user_id = $1 AND item_type = $2
      AND (product_id = $3 OR product_id IS NULL)
      AND (rental_id = $4 OR rental_id IS NULL)
      AND (secondhand_id = $5 OR secondhand_id IS NULL)
    `;

  values = [user_id, item_type, product_id || null, rental_id || null, secondhand_id || null];

  const cartResult = await pool.query(query, values);
  let cartItem;

  if (cartResult.rows.length > 0) {
    cartItem = cartResult.rows[0];
    const newQuantity = cartItem.quantity + quantity;
    query = 'UPDATE cart SET quantity = $1, price = $2 WHERE cart_id = $3 RETURNING *';
    values = [newQuantity, price, cartItem.cart_id];
    const updateResult = await pool.query(query, values);
    cartItem = updateResult.rows[0];
  } else {
    const cart_id = uuidv4();
    query = `INSERT INTO cart (cart_id, user_id, item_type, product_id, rental_id, secondhand_id, quantity, price, status)
               VALUES ($1, $2, $3, CAST($4 AS INT), CAST($5 AS INT), CAST($6 AS INT), $7, $8, $9) RETURNING *`;
    values = [
      cart_id,
      user_id,
      item_type,
      product_id || null,
      rental_id || null,
      secondhand_id || null,
      quantity,
      price,
      status || 'active',
    ];
    const insertResult = await pool.query(query, values);
    cartItem = insertResult.rows[0];
  }

  return res.status(201).json({ message: 'Item added to cart successfully.', cartItem: cartItem });
});

//delete cart item
export const deleteCartItem = asyncHandler(async (req, res) => {
  const { cart_id } = req.params;
  const query = 'DELETE FROM cart WHERE cart_id = $1';
  const result = await pool.query(query, [cart_id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }
  return res.status(200).json({ message: 'Cart item deleted successfully.' });
});

//update cart item
export const updateCartItem = asyncHandler(async (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity.' });
  }
  const query = 'UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING *';
  const result = await pool.query(query, [quantity, cart_id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }
  return res.status(200).json({ message: 'Cart item updated successfully.', cartItem: result.rows[0] });
});

// get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  const user=req.user;
  if(!user){
    throw new ApiError(401, "Unauthorized: User not found in request. Ensure you are logged in.");
  }

  const user_id=user.user_id;
  
  // Query to fetch cart items with necessary fields
  const query = `
    SELECT 
      c.cart_id, 
      c.user_id, 
      c.item_type, 
      c.product_id, 
      c.rental_id, 
      c.secondhand_id, 
      c.quantity, 
      c.price, 
      c.status
    FROM cart c
    WHERE c.user_id = $1
  `;

  const result = await pool.query(query, [user_id]);
  const cartItems = result.rows;

  if (!cartItems || cartItems.length === 0) {
    return res.status(404).json({ message: 'Cart is empty.' });
  }

  // Fetch related item details (product, rental, secondhand) for each cart item
  const cartWithDetails = await Promise.all(
    cartItems.map(async (item) => {
      let itemDetails = null;
      let detailQuery, detailValues;

      switch (item.item_type) {
        case 'product':
          if (item.product_id) {
            detailQuery = `
              SELECT 
                product_id, 
                name,  
                stock_quantity
              FROM product 
              WHERE product_id = $1
            `;
            detailValues = [item.product_id];
          }
          break;
        case 'rental':
          if (item.rental_id) {
            detailQuery = `
              SELECT 
                rental_id, 
                product_id, 
                rental_period
              FROM rental 
              WHERE rental_id = $1
            `;
            detailValues = [item.rental_id];
          }
          break;
        case 'secondhand':
          if (item.secondhand_id) {
            detailQuery = `
              SELECT 
                secondhand_id, 
                product_id, 
                condition, 
                purchase_date
              FROM secondhand 
              WHERE secondhand_id = $1
            `;
            detailValues = [item.secondhand_id];
          }
          break;
      }

      if (detailQuery) {
        const detailResult = await pool.query(detailQuery, detailValues);
        itemDetails = detailResult.rows[0];
      }

      return {
        cart_id: item.cart_id,
        user_id: item.user_id,
        item_type: item.item_type,
        product_id: item.product_id,
        rental_id: item.rental_id,
        secondhand_id: item.secondhand_id,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
        total: item.price * item.quantity,
        itemDetails: itemDetails,
      };
    })
  );

  return res.status(200).json({ cartItems: cartWithDetails, CartTotal: cartWithDetails.reduce((acc, item) => acc + item.total, 0) });
});

