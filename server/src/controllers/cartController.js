import {
    findCartOrder,
    createCartOrder,
    findOrderItem,
    createOrderItem,
    updateOrderItemQuantity,
    updateCartTotalPrice
} from "../services/cartOrder.js";

import pool from "../../dbConnect.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Missing product_id or invalid quantity' });
        }

        let order_id = await findCartOrder(user_id);
        if (!order_id) {
            order_id = await createCartOrder(user_id);
        }

        let order_item = await findOrderItem(order_id, product_id);

        if (order_item) {
            await updateOrderItemQuantity(order_item.order_item_id, quantity);
        } else {
            await createOrderItem(order_id, product_id, user_id, quantity);
        }

        await updateCartTotalPrice(order_id);

        res.status(200).json({ message: 'Item added to cart successfully', cart_id: order_id });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const product_id = req.params.product_id;

        const order_id = await findCartOrder(user_id);
        if (!order_id) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const query = `DELETE FROM order_item WHERE order_id = $1 AND product_id = $2`;
        const { rowCount } = await pool.query(query, [order_id, product_id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        await updateCartTotalPrice(order_id);

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ error: 'Failed to delete item from cart', details: error.message });
    }
};

// Get cart items
export const getCart = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const order_id = await findCartOrder(user_id);
        if (!order_id) {
            return res.status(200).json({ cart_id: null, total_price: 0, items: [] });
        }

        const query = `SELECT oi.product_id, oi.quantity, oi.price_per_unit, p.name AS product_name, p.description AS product_description
                       FROM order_item oi
                       JOIN product p ON oi.product_id = p.product_id
                       WHERE oi.order_id = $1`;
        const { rows } = await pool.query(query, [order_id]);

        const cartItems = rows.map(row => ({
            product_id: row.product_id,
            quantity: row.quantity,
            price_per_unit: row.price_per_unit,
            product_name: row.product_name,
            product_description: row.product_description
        }));

        const total_price_query = `SELECT total_price FROM "order" WHERE order_id = $1`;
        const { rows: totalPriceRows } = await pool.query(total_price_query, [order_id]);
        const total_price = totalPriceRows[0].total_price;

        res.status(200).json({ cart_id: order_id, total_price, items: cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
    }
};
