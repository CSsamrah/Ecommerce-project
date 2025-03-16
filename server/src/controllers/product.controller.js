import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import pool from "../../dbConnect.js";
import crypto from "crypto"
import fs from "fs";
import path from "path";
import generateKeyPair from "../utils/generateKeys.js";

const keysDir = path.resolve("src/keys");
const privateKeyPath = path.join(keysDir, "private_key.pem");

// Ensure RSA keys exist before processing
generateKeyPair();

const addProduct = asyncHandler(async (req, res) => {
    const userID = req.user.user_id;
    if (!userID) {
        throw new ApiError(400, "User ID is required for authentication")
    }
    if (req.user.role !== "admin") {
        throw new ApiError(403, `${req.user.role} is not authorized to add a product`);
    }
    const { name, description, price, condition, stock_quantity, rental_available, product_features, category_id } = req.body;

    let parsedFeatures;
    try {
        parsedFeatures = JSON.parse(product_features);  //JSON.parse(product_features) → Converts a JSON string (from request body) into an array.
        if (!Array.isArray(parsedFeatures)) {
            throw new Error();
        }
    } catch (error) {
        throw new ApiError(400, "Product features must be a valid JSON array.");
    }

    switch (true) {
        case !name:
            throw new ApiError(400, "Product name is required")
        case !description:
            throw new ApiError(400, "Product description is required")
        case !price || Number(price) <= 0:
            throw new ApiError(400, "Product price is required")
        case !condition:
            throw new ApiError(400, "Product condition is required");

        case !stock_quantity || Number(stock_quantity) < 0:
            throw new ApiError(400, "Valid stock quantity is required");

        case !rental_available || typeof JSON.parse(rental_available) !== "boolean":
            throw new ApiError(400, "Rental availability must be a boolean value");

        case !product_features || !Array.isArray(JSON.parse(product_features)):   //Array.isArray() is a built-in JavaScript method used to check whether a given value is an array.
            throw new ApiError(400, "Product features must be an array");
        case !category_id:
            throw new ApiError(400, "Category ID is required");

        default:
            console.log("All validations passed. Proceeding with product creation...");
    }

    const productImageLocalPath = req.files?.product_image?.[0]?.path;
    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required")
    }

    const findProduct = await pool.query("SELECT * FROM product WHERE name=$1", [name]);
    if (findProduct.rows.length > 0) {
        throw new ApiError(409, "Product already exists");
    }

    const categoryID = Number(req.body.category_id)

    const findCategory = await pool.query("SELECT * FROM category WHERE category_id=$1", [categoryID]);
    if (findCategory.rowCount == 0) {
        throw new ApiError(404, "Category not found");
    }

    let image
    try {
        image = await uploadOnCloudinary(productImageLocalPath)
        console.log(`The image format is ${image.format}`)

    } catch (err) {
        console.log("Error uplaoding on cloudinary", err)
    }

    let digital_signature = ""
    try {
        const privateKey = fs.readFileSync(privateKeyPath, "utf-8");  // Read the private key from the specified file path
        const sign = crypto.createSign("sha256");

        //preparing data to be signed
        const signingData = JSON.stringify({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price).toFixed(2),
            condition,
            stock_quantity: Number(stock_quantity),
            rental_available: rental_available === "true" || rental_available === true,
            product_features: Array.isArray(product_features) ? product_features : JSON.parse(product_features)
        });

        sign.update(signingData);  // Add data to be signed
        sign.end()
        digital_signature = sign.sign(privateKey, "base64");  // Signing the data using the private key and encode in base64
    }
    catch (err) {
        console.error("Error signing product data:", err);
        throw new ApiError(500, "Error generating digital signature");
    }

    const query = `INSERT INTO product 
    (name,description,price,condition,stock_quantity,rental_available,digital_signature,product_features,product_image,user_id,category_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) 
    RETURNING *`

    const values = [
        name,
        description,
        price,
        condition,
        stock_quantity,
        rental_available,
        digital_signature,
        JSON.stringify(parsedFeatures),
        image.url,   //Storing Cloudinary URL
        userID,
        category_id,

    ]

    const insertProduct = await pool.query(query, values);

    const productWithCategory = await pool.query(
        `SELECT p.*, c.category_name, c.slug 
        FROM product p
        JOIN category c ON p.category_id = c.category_id
        WHERE p.product_id = $1`,
        [insertProduct.rows[0].product_id]
    )  //the join aims to gather data from both product and category tables

    return res.status(201).json(new ApiResponse(200, productWithCategory.rows[0], "Product added successfully"))

})

const getOneProduct = asyncHandler(async (req, res) => {
    const { id: product_id } = req.params;

    if (!product_id) {
        throw new ApiError(400, "Product ID should be provided to search for a product");
    }
    const findProduct = await pool.query(
        `SELECT 
        p.product_id, p.name, p.description, p.price, p.condition, 
        p.stock_quantity, p.product_features, p.product_image, 
        p.user_id, U.name AS product_added_by, U.role, 
        p.category_id, c.category_name 
     FROM product p
     JOIN "Users" U ON p.user_id = U.user_id
     JOIN category c ON p.category_id = c.category_id
     WHERE p.product_id = $1`,
        [product_id]

    )

    if (findProduct.rows.length == 0) {
        throw new ApiError(404, "Product not found")
    }
    return res.status(200).json(new ApiResponse(200, findProduct.rows[0], "Product retrieved successfully"))
})

export { addProduct, getOneProduct }