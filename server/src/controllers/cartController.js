import pool from "../../dbConnect.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from 'uuid';

export const addToCart = asyncHandler(async (req, res) => {
    const { user_id, item_type, product_id, rental_id, secondhand_id, quantity, price, status,rental_period } = req.body;
  
    if (!user_id || !item_type || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Missing required fields or invalid quantity.' });
    }

    if (!['product', 'rental', 'secondhand'].includes(item_type)) {
      return res.status(400).json({ message: 'Invalid item_type.' });
    }

    let query, values;
    switch (item_type) {
      case 'product':
        if (!product_id) return res.status(400).json({ message: 'Missing product_id.' });
        query = 'SELECT product_id FROM product WHERE product_id = $1';
        values = [product_id];
        break;
      case 'rental':
        if (!rental_id) return res.status(400).json({ message: 'Missing rental_id.' });
        query = 'SELECT rental_id FROM rental WHERE rental_id = $1';
        values = [rental_id];
        break;
      case 'secondhand':
        if (!secondhand_id) return res.status(400).json({ message: 'Missing secondhand_id.' });
        query = 'SELECT secondhand_id FROM secondhand WHERE secondhand_id = $1';
        values = [secondhand_id];
        break;
    }

    const itemResult = await pool.query(query, values);
    if (itemResult.rows.length === 0) {
      return res.status(404).json({ message: `${item_type} not found.` });
    }

    query = `
      SELECT * FROM cart
      WHERE user_id = $1 AND item_type = $2
      AND product_id ${product_id ? '= $3' : 'IS NULL'}
      AND rental_id ${rental_id ? '= $4' : 'IS NULL'}
      AND secondhand_id ${secondhand_id ? '= $5' : 'IS NULL'}
    `;
    
    values = [user_id, item_type];
    if (product_id) values.push(product_id);
    if (rental_id) values.push(rental_id);
    if (secondhand_id) values.push(secondhand_id);
    
    const cartResult = await pool.query(query, values);
    let cartItem;
    
    if (cartResult.rows.length > 0) {
      cartItem = cartResult.rows[0];
      const newQuantity = cartItem.quantity + quantity;
      query = 'UPDATE cart SET quantity = $1 WHERE cart_id = $2 RETURNING *';
      values = [newQuantity, cartItem.cart_id];
      const updateResult = await pool.query(query, values);
      cartItem = updateResult.rows[0];
    } else {
      const cart_id = uuidv4();
      query = `INSERT INTO cart (cart_id, user_id, item_type, product_id, rental_id, secondhand_id, quantity, price, status)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
      values = [cart_id, user_id, item_type, product_id, rental_id, secondhand_id, quantity, price, status || 'active'];
      const insertResult = await pool.query(query, values);
      cartItem = insertResult.rows[0];
    }

    return res.status(201).json({ message: 'Item added to cart successfully.', cartItem:cartItem });
});

export const deleteCartItem = asyncHandler(async (req, res) => {
    const { cart_id } = req.params;
    const query = 'DELETE FROM cart WHERE cart_id = $1';
    const result = await pool.query(query, [cart_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }
    return res.status(200).json({ message: 'Cart item deleted successfully.' });
});

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

export const getCartItems = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const query = 'SELECT * FROM cart WHERE user_id = $1';
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
            detailQuery = 'SELECT * FROM product WHERE product_id = $1';
            detailValues = [item.product_id];
          }
          break;
        case 'rental':
          if (item.rental_id) {
            detailQuery = 'SELECT * FROM rental WHERE rental_id = $1';
            detailValues = [item.rental_id];
          }
          break;
        case 'secondhand':
          if (item.secondhand_id) {
            detailQuery = 'SELECT * FROM secondhand WHERE secondhand_id = $1';
            detailValues = [item.secondhand_id];
          }
          break;
      }

      if (detailQuery) {
        const detailResult = await pool.query(detailQuery, detailValues);
        itemDetails = detailResult.rows[0];
      }

      return {
        ...item,
        itemDetails: itemDetails,
      };
    })
  );

  return res.status(200).json({ cartItems: cartWithDetails });
});
