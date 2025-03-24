import pool from "../../dbConnect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

//total products sold and rented
export const getTotalProductsSoldRented = asyncHandler(async (req, res) => {
    const seller_id = req.user.user_id;

    const soldSecondhandProducts = await pool.query(
        `SELECT COUNT(*) AS total_sold FROM secondhand_products
        WHERE seller_id = $1 AND buyer_id IS NOT NULL AND purchase_date IS NOT NULL`,
        [seller_id]
    );

    const rentedProductsQuery = `
             SELECT 
                COUNT(DISTINCT CASE 
                    WHEN product_id IS NOT NULL THEN product_id 
                    WHEN secondhand_id IS NOT NULL THEN secondhand_id
                END) as totalRented
            FROM rental r
            WHERE (
                (product_id IS NOT NULL AND EXISTS (
                    SELECT 1 FROM product p WHERE p.product_id = r.product_id AND p.user_id = ?
                )) OR
                (secondhand_id IS NOT NULL AND EXISTS (
                    SELECT 1 FROM secondhand s WHERE s.secondhand_id = r.secondhand_id AND s.seller_id = ?
                ))
            )
            AND status = 'Rented'
        `;

        const [rentedProducts] = await pool.query(rentedProductsQuery, [seller_id, seller_id]);

    res.status(200).json({
        success: true,
        total_sold: soldSecondhandProducts.rows[0].total_sold,
        total_rented: rentedProducts.rows[0].totalRented,
    });
});

        // Get product-wise breakdown
export const productBreakdown= asyncHandler(async (req, res) => {
            const seller_id = req.user.user_id;
         const productBreakdownQuery = `
            (
                SELECT 
                    p.id as product_id,
                    p.name as product_name,
                    0 as times_sold,
                    COUNT(DISTINCT CASE WHEN r.status = 'rented' THEN r.id END) as times_rented,
                    'new' as product_type
                FROM products p
                LEFT JOIN rentals r ON p.id = r.product_id
                WHERE p.seller_id = ?
                GROUP BY p.id, p.name
            )
            UNION ALL
            (
                SELECT 
                    s.id as product_id,
                    s.name as product_name,
                    CASE WHEN s.status = 'sold' THEN 1 ELSE 0 END as times_sold,
                    COUNT(DISTINCT CASE WHEN r.status = 'rented' THEN r.id END) as times_rented,
                    'secondhand' as product_type
                FROM secondhand s
                LEFT JOIN rentals r ON s.id = r.secondhand_id
                WHERE s.seller_id = ?
                GROUP BY s.id, s.name
            )
        `;

        const [productBreakdown] = await pool.query(productBreakdownQuery, [seller_id, seller_id]);

        res.status(200).json({
            success: true,
            product_breakdown:productBreakdown.rows,
        });
    });

        // Get monthly analytics
        const monthlyAnalyticsQuery = `
            SELECT 
                DATE_FORMAT(month_date, '%Y-%m') as month,
                SUM(products_sold) as products_sold,
                SUM(products_rented) as products_rented
            FROM (
                SELECT 
                    s.purchase_date as month_date,
                    COUNT(DISTINCT s.secondhand_id) as products_sold,
                    0 as products_rented
                FROM secondhand s
                WHERE s.seller_id = ? AND s.status = 'sold'
                GROUP BY DATE_FORMAT(s.sold_date, '%Y-%m')
                
                UNION ALL
                
                SELECT 
                    r.rental_date as month_date,
                    0 as products_sold,
                    COUNT(DISTINCT r.id) as products_rented
                FROM rentals r
                WHERE (
                    (product_id IS NOT NULL AND EXISTS (
                        SELECT 1 FROM products p WHERE p.id = r.product_id AND p.seller_id = ?
                    )) OR
                    (secondhand_id IS NOT NULL AND EXISTS (
                        SELECT 1 FROM secondhand s WHERE s.id = r.secondhand_id AND s.seller_id = ?
                    ))
                )
                AND r.status = 'rented'
                GROUP BY DATE_FORMAT(r.rental_date, '%Y-%m')
            ) combined
            GROUP BY DATE_FORMAT(month_date, '%Y-%m')
            ORDER BY month DESC
            LIMIT 12
        `;

        const [monthlyAnalytics] = await db.query(monthlyAnalyticsQuery, [sellerId, sellerId, sellerId]);

        // ... existing code (response handling) ...