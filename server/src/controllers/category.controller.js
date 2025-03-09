import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import pool from "../../dbConnect.js";
import { generateUniqueSlug } from "../utils/uniqueSlug.js";

const createCategory = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, `${req.user.role} is not authorized to update a category`);
    }
    const { category_name, category_description } = req.body;
    if (!category_name || !category_description) {
        throw new ApiError(400, "Category name and description is required");
    }

    const findCategory = await pool.query("SELECT * FROM category WHERE category_name=$1", [category_name]);
    if (findCategory.rows.length) {
        throw new ApiError(400, "Category already exists");
    }

    const slug = await generateUniqueSlug(category_name);

    try {
        const newCategory = await pool.query("INSERT INTO category(category_name,category_description,slug) VALUES($1,$2,$3) RETURNING *",
            [category_name, category_description, slug]
        );
        return res.status(200).json(new ApiResponse(200, newCategory.rows[0], "Category created successfully",));

    }
    catch (err) {

        console.error(err.message);
        throw new ApiError(500, "Failed to create category");

    }

})

const getSingleCategory = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError(400, "Category slug is required");
    }
    const findCategory = await pool.query("SELECT * FROM category WHERE slug=$1", [slug]);
    if (!findCategory.rows.length) {
        throw new ApiError(404, "Category not found");
    }
    const categoryId = findCategory.rows[0].category_id;
    const findProducts = await pool.query("SELECT * FROM product WHERE category_id=$1", [categoryId]);

    return res.status(200).json(new ApiResponse(200, {
        category: findCategory.rows[0],
        products: findProducts.rows
    }, "Category and products found successfully"));

})
const getAllCategories = asyncHandler(async (req, res) => {
    const allCategories = await pool.query("SELECT category_name, slug FROM category");

    if (!allCategories.rows.length) {
        throw new ApiError(404, "No categories found");
    }

    return res.status(200).json(new ApiResponse(200, {
        categories: allCategories.rows
    }, "Categories fetched successfully"));


});

const updateCategory = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, `${req.user.role} is not authorized to update a category`);
    }
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError(400, "Category slug is required")
    }

    const { category_name, category_description } = req.body;

    if (!category_name && !category_description) {
        throw new ApiError(400, "Provide category name or description to update");
    }

    const findCategory = await pool.query("SELECT * FROM category WHERE slug=$1", [slug]);
    if (!findCategory.rows.length) {
        throw new ApiError(404, "Category not found");
    }
    let updateFields = [];  // Stores field assignments (e.g., name=$1, email=$2)
    let values = [];  // Stores actual values for parameterized query
    let index = 1; // Counter for parameterized query values

    if (category_name) {
        updateFields.push(`category_name=$${index}`);
        values.push(category_name);
        index++;
    }
    if (category_description) {
        updateFields.push(`category_description=$${index}`);
        values.push(category_description);
        index++;
    }

    values.push(slug);

    const query = `UPDATE category SET ${updateFields.join(", ")} WHERE slug=$${index} RETURNING *`;
    const result = await pool.query(query, values);

    return res.status(200).json(new ApiResponse(200, result.rows[0], "Category updated successfully"));

})

const deleteCategory = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, `${req.user.role} is not authorized to delete a category`);
    }
    const { slug } = req.params;

    if (!slug) {
        throw new ApiError(400, "Category slug is required")
    }
    const findCategory = await pool.query("SELECT * FROM category WHERE slug=$1", [slug]);
    if (!findCategory.rows.length) {
        throw new ApiError(404, "Category not found");
    }
    const categoryId = findCategory.rows[0].category_id;
    try {
        await pool.query("DELETE FROM category WHERE category_id=$1", [categoryId]);
    }
    catch (err) {
        console.log("Error deleting product", err)
    }

    return res.status(200).json(new ApiResponse(200, {}, `Category ${slug} deleted successfully`));
})


export { createCategory, getSingleCategory, getAllCategories, updateCategory, deleteCategory }