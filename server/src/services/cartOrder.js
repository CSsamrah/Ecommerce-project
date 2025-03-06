import pool from "../../dbConnect.js";

//function to calculate cart total
async function calculateCartTotal(order_id){
    const query=`
        SELECT SUM(quantity * price_per_unit) AS total
        FROM order_item
        WHERE order_id = $1`;
    const {rows}=await pool.query(query,[order_id]);
    return rows[0].total || 0; //return 0 if no items in cart 
}

//function to find cart order
async function findCartOrder(user_id){
    const query=`select order_id from "order" where user_id=$1 and order_type='cart' and payment_status='pending'`;

    const {rows}=await pool.query(query,[user_id]);
    return rows[0]?rows[0].order_id:null;
}

// Function to create cart order
async function createCartOrder(user_id) {
    const query = `
        INSERT INTO "order" (user_id, order_type, total_price, payment_status)
        VALUES ($1, 'cart', 0, 'pending')
        RETURNING order_id
    `;
    const { rows } = await pool.query(query, [user_id]);
    return rows[0].order_id;
}

async function findOrderItem(order_id, product_id) {
    const query = `
        SELECT order_item_id, quantity
        FROM order_item
        WHERE order_id = $1 AND product_id = $2
    `;
    const { rows } = await pool.query(query, [order_id, product_id]);
    return rows[0] || null;
}

//function to create order_item
async function createOrderItem(order_id,product_id,user_id,quantity){
    const productQuery=`select price from product where product_id=$1`;
    const productResult=pool.query(productQuery,[product_id]);
    if(productResulr.rows.length===0){
        throw new Error('Product not found');
    }
    const price_per_unit=(await productResult).rows[0].price;

    const query=`INSERT INTO order_item(order_id,product_id,user_id,quantity,price_per_unit)Values($1,$2,$3,$4,$5)RETURNING order_item_id`;
    const {rows}=await pool.query(query,[order_id,product_id,user_id,quantity,price_per_unit])  ;
    return rows[0].order_item_id;

}

//function to update orderItem quantity
async function updateOrderItemQuantity(order_item_id,quantity,price_per_unit){
    const query=`
        UPDATE order_item
        SET quantity = quantity + $1
        WHERE order_item_id = $2
        RETURNING quantity`;
    const {rows}=await pool.query(query,[quantity,order_item_id]);
    return rows[0].quantity;
}

//function to update order total
async function updateCartTotalPrice(order_id){
    const total_price=await calculateCartTotal(order_id);
    const query=`
        UPDATE "order"
        SET total_price = $1
        WHERE order_id = $2`;

    await pool.query(query, [total_price, order_id]);

}

export {findCartOrder,createCartOrder,findOrderItem,createOrderItem,updateOrderItemQuantity,updateCartTotalPrice};