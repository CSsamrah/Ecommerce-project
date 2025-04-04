import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

//total products sold and rented that has been uploaded by the seller 
export const getTotalProductsSoldRented = asyncHandler(async (req, res) => {
    try {
        // Get seller ID from auth token
        const seller_id = req.user.user_id;

       // Query to get the count of each type of product sold by a seller
    const query = `
    SELECT 
      SUM(CASE WHEN p.condition = 'new' AND oi.item_type = 'product' THEN 1 ELSE 0 END) AS new_products,
      SUM(CASE WHEN p.condition = 'secondhand' AND oi.item_type = 'secondhand' THEN 1 ELSE 0 END) AS secondhand_products,
      SUM(CASE WHEN oi.item_type = 'rental' THEN 1 ELSE 0 END) AS rental_products
    FROM product p
    JOIN order_item oi ON p.product_id = oi.product_id
    WHERE p.user_id = $1
  `;

  const result = await pool.query(query, [seller_id]);

  if (result.rows.length > 0) {
    res.json({
      new_products: result.rows[0].new_products || 0,
      secondhand_products: result.rows[0].secondhand_products || 0,
      rental_products: result.rows[0].rental_products || 0,
    });
  } else {
    res.json({ message: 'No products found' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
}
});


//  Get product breakdown (new and secondhand product details) for the seller
export const productBreakdown=asyncHandler(async(req,res)=>{
    try {
        const userId = req.user.user_id;

        // Query to get the breakdown of products uploaded by the seller
        const query = `
            SELECT
                p.product_id,
                p.name,
                p.description,
                p.price,
                p.condition,
                p.stock_quantity,
                p.rental_available,
                p.product_image,
                COUNT(oi.product_id) AS items_sold,
                p.stock_quantity - COUNT(oi.product_id) AS items_left
            FROM
                product p
            LEFT JOIN
                order_item oi ON p.product_id = oi.product_id
            WHERE
                p.user_id = $1
            GROUP BY
                p.product_id, p.condition;
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            const newProducts = result.rows
                .filter(row => row.condition === 'new')
                .map(row => ({
                    product_id: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: parseFloat(row.price),
                    stock_quantity: parseInt(row.stock_quantity),
                    rental_available: row.rental_available,
                    product_image: row.product_image,
                    items_sold: parseInt(row.items_sold || 0),
                    items_left: parseInt(row.items_left)
                }));

            const secondhandProducts = result.rows
                .filter(row => row.condition === 'second-hand')
                .map(row => ({
                    product_id: row.product_id,
                    name: row.name,
                    description: row.description,
                    price: parseFloat(row.price),
                    stock_quantity: parseInt(row.stock_quantity),
                    rental_available: row.rental_available,
                    product_image: row.product_image,
                    items_sold: parseInt(row.items_sold || 0),
                    items_left: parseInt(row.items_left)
                }));

            res.json({
                newProducts: newProducts,
                secondhandProducts: secondhandProducts
            });
        } else {
            res.json({ message: 'No products found for this seller' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//  Query to get monthly analytics of products sold and rental income for the seller

export const monthlyAnalytics=asyncHandler( async (req, res) => {
    try {
        const userId = req.user.user_id;

        const query = `
            SELECT
                DATE_TRUNC('month', o.created_at) AS month,
                SUM(CASE WHEN oi.item_type = 'product' OR oi.item_type = 'secondhand' THEN oi.quantity * oi.price_per_unit ELSE 0 END) AS product_sales,
                SUM(CASE WHEN oi.item_type = 'rental' THEN oi.quantity * oi.price_per_unit ELSE 0 END) AS rental_income
            FROM
                orders o
            JOIN
                order_item oi ON o.order_id = oi.order_id
            JOIN
                product p ON oi.product_id = p.product_id
            WHERE
                p.user_id = $1
            GROUP BY
                DATE_TRUNC('month', o.created_at)
            ORDER BY
                month;
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            const monthlyAnalytics = result.rows.map(row => ({
                month: row.month,
                product_sales: parseFloat(row.product_sales || 0),
                rental_income: parseFloat(row.rental_income || 0)
            }));

            res.json(monthlyAnalytics);
        } else {
            res.json({ message: 'No analytics data found for this seller' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//  Update Order Status (seller Only)
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
    if (req.user.role !== "seller") {
        throw new ApiError(403, "Only sellers can update order status.");
    }

    const updateQuery = `UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *`;
    const result = await pool.query(updateQuery, [status, order_id]);

    if (!result.rows.length) {
        throw new ApiError(404, "Order not found or status unchanged.");
    }

    res.status(200).json({ success: true, message: "Order status updated successfully.", order: result.rows[0] });
});

export const getAllOrders=asyncHandler(async (req, res) => {
    try {
        const userId = req.user.user_id;

        // Query to get all orders placed by buyers for a particular seller's products
        const query = `
            SELECT
                o.order_id,
                o.user_id AS buyer_id,
                o.total_price,
                o.status,
                o.created_at,
                oi.product_id,
                oi.quantity,
                oi.price_per_unit
            FROM
                orders o
            JOIN
                order_item oi ON o.order_id = oi.order_id
            JOIN
                product p ON oi.product_id = p.product_id
            WHERE
                p.user_id = $1
            ORDER BY
                o.order_id;
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            const orders = result.rows.map(row => ({
                order_id: row.order_id,
                buyer_id: row.buyer_id,
                total_price: parseFloat(row.total_price),
                status: row.status,
                created_at: row.created_at,
                product_id: row.product_id,
                quantity: row.quantity,
                price_per_unit: parseFloat(row.price_per_unit)
            }));

            res.json(orders);
        } else {
            res.json({ message: 'No orders found for this seller' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//rental history of product of a particular seller is in rental controller

//second hand products listed by a particular seller is in secondhand controller



