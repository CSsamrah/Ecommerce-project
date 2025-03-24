import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Get total users by role
export const totalUsers = asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT role, COUNT(*) AS count FROM Users GROUP BY role');
    res.json(result.rows);});

// Get total orders by status
export const totalOrders= asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT status, COUNT(*) AS count FROM orders GROUP BY status');
    res.json(result.rows);
});

// Get total revenue (daily, weekly, monthly)
export const totalRevenue= asyncHandler(async (req, res) => {
    const result = await pool.query(`
        SELECT 
            SUM(CASE WHEN created_at >= NOW() - INTERVAL '1 day' THEN total_price ELSE 0 END) AS daily,
            SUM(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN total_price ELSE 0 END) AS weekly,
            SUM(CASE WHEN created_at >= NOW() - INTERVAL '1 month' THEN total_price ELSE 0 END) AS monthly
        FROM orders;
    `);
    res.json(result.rows[0]);
});

// Get total rentals and secondhand sales
export const totalTransactions= asyncHandler(async (req, res) => {
    const rentalCount = await pool.query("SELECT COUNT(*) AS count FROM rental WHERE user_id IS NOT NULL OR rented_at IS NOT NULL");
    const secondhandCount = await pool.query("SELECT COUNT(*) AS count FROM secondhand WHERE buyer_id IS NOT NULL OR rented_at IS NOT NULL");
    res.json({ rentals: rentalCount.rows[0].count, secondhandSales: secondhandCount.rows[0].count });
});

// Get top-selling products
export const topSellingProduct= asyncHandler(async (req, res) => {
    const result = await pool.query(`
        SELECT product_id, COUNT(*) AS total_sold FROM order_item GROUP BY product_id ORDER BY total_sold DESC LIMIT 5;
    `);
    res.json(result.rows);
});

// Get top sellers from both secondhand and products tables
export const topSellers= asyncHandler(async (req, res) => {
    const result = await pool.query(`
        SELECT seller_id, SUM(total_sales) AS total_sales FROM (
            SELECT seller_id, COUNT(*) AS total_sales FROM secondhand GROUP BY seller_id
            UNION ALL
            SELECT user_id AS seller_id, COUNT(*) AS total_sales FROM product GROUP BY user_id
        ) AS combined_sales
        GROUP BY seller_id ORDER BY total_sales DESC LIMIT 5;
    `);
    res.json(result.rows);
});


