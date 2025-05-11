import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import pool from "../../dbConnect.js";
import path from "path"
import fs from "fs"
import crypto from "crypto"

const keysDir = path.resolve("src/keys")
const publicKeyPath = path.join(keysDir, "public_key.pem");

const validateProduct = asyncHandler(async (req, res) => {
    const userID = req.user.user_id;
    if (!userID) {
        throw new ApiError(400, "User ID is required for authentication")
    }

    const { product_id } = req.params;
    if (!product_id) {
        throw new ApiError(400, "Product ID is required to proceed further")
    }

    const findProduct = await pool.query("SELECT*FROM product WHERE product_id=$1", [product_id]);

    if (findProduct.rows.length == 0) {
        throw new ApiError(404, "Product not found")
    }
    const { name, description, price, condition, stock_quantity, rental_available, product_features, digital_signature } = findProduct.rows[0];

    //this Reads the public key stored in public_key.pem
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

    //Debugging Log
    console.log("Verifying product:", {
      id: product.product_id,
      name: product.name,
      sig: product.digital_signature?.length 
    });

    //this Creates a SHA-256 hash of the product's key attributes (excluding digital_signature).
    const verifyProduct = crypto.createVerify("sha256");
    const verifyingData = JSON.stringify({ 
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price).toFixed(2),  
        condition,
        stock_quantity: Number(stock_quantity),  
        rental_available: rental_available === "true" || rental_available === true,   
        product_features: Array.isArray(product_features)? product_features:JSON.parse(product_features) 
    });
    verifyProduct.update(verifyingData);
    verifyProduct.end();
    const isValid = verifyProduct.verify(publicKey, digital_signature, "base64");
    const verificationStatus = isValid ? "valid" : "invalid";

    await pool.query(
        `INSERT INTO pkiauthentication (product_id, user_id, verification_status, verified_at) 
         VALUES ($1, $2, $3, NOW())`,
        [product_id, userID, verificationStatus]
    );

    return res.status(200).json(new ApiResponse(200, {}, isValid ? "signature is valid" : "Signature is invalid", ""))

})

export { validateProduct }