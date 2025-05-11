import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import pool from "../../dbConnect.js";

// const createRentalOrder = asyncHandler(async (req, res) => {

//     const { id: product_id } = req.params;
//     if (!product_id) {
//         throw new ApiError(400, "Product ID is missing")
//     }
//     const findExistingProduct = await pool.query(
//         `SELECT user_id,product_id,rental_available,price FROM product WHERE product_id = $1`,
//         [product_id]
//     );

//     if (findExistingProduct.rows.length == 0) {
//         throw new ApiError(404, "Product not found");
//     }
//     const userID = req.user?.user_id;
//     if (userID === findExistingProduct.rows[0]?.user_id) {
//         throw new ApiError(403, "You cannot rent this product because you are its owner.")
//     }

//     const canBeRented = findExistingProduct?.rows[0]?.rental_available;
//     if (canBeRented == "false" || canBeRented == false) {
//         throw new ApiError(403, "Product can not be rented");
//     }

//     const { return_date } = req.body;
//     const rentedAt = new Date();
//     const returnDate = new Date(return_date);

//     let rentalDuration = Math.ceil((returnDate - rentedAt) / (1000 * 60 * 60 * 24));

//     console.log(rentalDuration);

//     if (rentalDuration < 1) {
//         throw new ApiError(400, "Return date must be at least 1 day after rental start");
//     }

//     let rental_price;
//     const basePrice = findExistingProduct.rows[0]?.price;

//     if (rentalDuration >= 1 && rentalDuration <= 10) {
//         rental_price = basePrice * 0.2;
//     } else if (rentalDuration >= 11 && rentalDuration <= 20) {
//         rental_price = basePrice * 0.25;
//     } else if (rentalDuration >= 21 && rentalDuration <= 30) {
//         rental_price = basePrice * 0.3;
//     } else {
//         throw new ApiError(403, "Product cannot be rented for more than 30 days");
//     }
//     try {
//         await pool.query(
//             `UPDATE rental 
//              SET rental_duration=$1, rental_status='Rented', return_date=$2, 
//                 rental_price=$3, rented_by=$4, rented_at=$5
//              WHERE product_id=$6 RETURNING *`,
//             [rentalDuration, returnDate, rental_price, userID, rentedAt, product_id]
//         );

//         await pool.query(`UPDATE product SET rental_available=FALSE WHERE product_id=$1`, [product_id]);

//         const userName = await pool.query(
//             `SELECT name FROM "Users" WHERE user_id = $1`,
//             [userID]
//         );
//         const rentedByName = userName.rows[0]?.name || "Unknown User";

//         return res.status(201).json(new ApiResponse(200, {
//             product_id,
//             rented_by: {
//                 user_id: userID,
//                 name: rentedByName
//             },
//             rented_at: rentedAt,
//             return_date: returnDate,
//             rental_duration: rentalDuration+" days",
//             rental_price
//         }, "Rental order created successfully"));

//     } catch (err) {
//         console.error("Error updating rental record:", err);
//         throw new ApiError(500, "Database error while updating rental record");
//     }

// })

const returnRentalOrder = asyncHandler(async (req, res) => {
    const { id: rental_id } = req.params;
    const userID = req.user?.user_id;

    if (!rental_id) {
        throw new ApiError(400, "Rental ID is required to proceed with this action")
    }
    const rentalQuery = `
      SELECT 
        r.rental_id, 
        r.product_id,
        r.rental_duration, 
        r.rental_status, 
        r.rental_price,
        r.return_date, 
        r.rented_by, 
        r.rented_at,
        U.name  
    FROM rental r
    JOIN "Users" U ON r.rented_by = U.user_id
    WHERE r.rental_id = $1;`

    const findRentalOrder = await pool.query(rentalQuery, [rental_id]);

    if (findRentalOrder.rows.length == 0) {
        throw new ApiError(404, "Rental order not found")
    }

    const rental=findRentalOrder.rows[0];
    const rentalProductID=findRentalOrder.rows[0]?.product_id;

    if(findRentalOrder.rows[0]?.rental_status=="Returned"){
        throw new ApiError(403,"You have already returned this product")
    }

    // Ensuring the user returning the product is the one who rented it
    if (userID != findRentalOrder.rows[0]?.rented_by) {
        throw new ApiError(403, "You can not mark this product as returned")
    }

    try {
        const updateQuery = `
        UPDATE rental 
        SET rental_status = 'Returned', 
            returned_at = NOW()
        WHERE rental_id = $1 
        RETURNING rental_id, rental_status, returned_at, rented_by;
    `;

    const updatedRental = await pool.query(updateQuery, [rental_id]);

    await pool.query(`UPDATE product SET rental_available=TRUE WHERE product_id=$1`,[rentalProductID])

    return res.status(200).json(new ApiResponse(200, {
            rental_id: updatedRental.rows[0].rental_id,
            rental_status: updatedRental.rows[0].rental_status,
            returned_at: updatedRental.rows[0].returned_at,
            rented_by: rental.name,
        }, "Product returned successfully"));

    } catch (err) {
        console.error("Error updating rental record:", err);
        throw new ApiError(409, "Database error occured")
    }
})

const getRentalDetails=asyncHandler(async(req,res)=>{
    const {id:rental_id}=req.params;

    const userID=req.user?.user_id;

    if(!rental_id){
        throw new ApiError(400, "Rental ID is required to proceed with this action")
    }
    const rentalQuery=` SELECT 
            r.rental_id,
            r.rental_status,
            r.rented_by,
            r.product_id,
            r.rental_duration,
            r.return_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Karachi' AS return_date_local,
            p.product_id AS product_id_from_product,
            p.name AS productName,
            U.user_id AS user_id_from_users,
            U.name AS userName
        FROM rental r
        JOIN product p ON r.product_id = p.product_id
        JOIN "Users" U ON r.rented_by = U.user_id 
        WHERE r.rental_id = $1;
    `
    const findRentalRecord=await pool.query(rentalQuery,[rental_id]);

    if(findRentalRecord.rows.length==0){
        throw new ApiError(404,"Rental record against provided rentalID does not exist");
    }

    const rentalRecord=findRentalRecord.rows[0]

    if(userID!=rentalRecord?.rented_by){
        throw new ApiError(403,"Access denied: You are not the owner of this rental record.")
    }
    const message = rentalRecord.rental_status === "Rented" 
    ? "Rental record fetched successfully. This product is currently rented."
    : `Rental record fetched successfully. Note: This product is no longer rented (Status: ${rentalRecord.rental_status}).`;

    
    return res.status(200).json(new ApiResponse(200,{rentalRecord},message))

})

const userRentals=asyncHandler(async(req,res)=>{
    const userID=req.user?.user_id;

    if(!userID){
        throw new ApiError(403,"User ID is needed for authentication")
    }
    //Uses LEFT JOIN to ensure rentals are retrieved even if products are missing
    const rentalQuery=`
    SELECT
        r.rental_id,
        r.rental_status,
        r.rental_duration, 
        r.rental_price,
        r.rented_by,
        r.rented_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Karachi' AS rented_at,
        r.returned_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Karachi' AS return_date,
        r.product_id,
        p.name AS productName,
        U.name AS userName
    FROM rental r
    LEFT JOIN product p ON r.product_id = p.product_id
    JOIN "Users" U ON r.rented_by = U.user_id 
    WHERE r.rented_by = $1
    `
    const findRentalRecord=await pool.query(rentalQuery,[userID])

    const rentalRecords=findRentalRecord.rows;

    if(rentalRecords.length===0){
        throw new ApiError(404,"You have not rented any prodcut uptill now")
    }
  
    return res.status(200).json(new ApiResponse(200,
        {rentalRecords},
        `Rental history fetched successfully.`
    ))
})

const getAllRentals = asyncHandler(async (req, res) => {
    try {
        console.log("getAllRentals function called");

        const rentalavailable= true;
        const query = `
            SELECT 
                p.product_id as id,
                p.name as title,
                p.price as price,
                p.product_image as image,
                p.description,
                p.condition as condition,
                p.stock_quantity,
                p.rental_available as rental_,
                r.rental_id,
                r.rental_status,
                r.rental_price as rental_price,
                r.rental_duration,
                r.return_date
            FROM product p
            LEFT JOIN rental r ON p.product_id = r.product_id
            WHERE p.rental_available = $1
            AND (r.rental_status IS NULL OR r.rental_status = 'Returned')
            LIMIT 50
        `;
        
        console.log("Executing query:", query);
        const result = await pool.query(query, [rentalavailable]);
        console.log(`Query executed successfully. Retrieved ${result.rows.length} rental products`);

        const rentals = result.rows.map(rental => ({
            id: rental.id,
            title: rental.title,
            price: rental.price,
            image: rental.image,
            description: rental.description,
            condition: rental.condition,
            stock_quantity: rental.stock_quantity,
            rental_available: rental.rental_,
            rental_id: rental.rental_id,
            rental_status: rental.rental_status,
            rental_price: rental.rental_price,
            rental_duration: rental.rental_duration,
            return_date: rental.return_date,
            owner_name: rental.owner_name,
            avg_rating: '0', 
            people_rated: '0'
        }));

        return res.status(200).json(
            new ApiResponse(200, rentals, "Rental products fetched successfully")
        );
    } catch (error) {
        console.error("Error in getAllRentals:", error);
        throw new ApiError(500, "Failed to fetch rental products: " + error.message);
    }
});



export { returnRentalOrder ,getRentalDetails,userRentals, getAllRentals}