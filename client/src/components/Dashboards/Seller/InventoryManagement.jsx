import { useState, useEffect } from "react";
import "./InventoryManagement.css";
import Seller_dashboard from "./Seller_dashboard";
import axios from "axios"; // Make sure to install axios if not already done
axios.defaults.withCredentials = true;


function InventoryManagement() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    // Fetch all products for the logged-in seller when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products based on selected category
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProducts(products);
        } else if (selectedCategory === "rental") {
            setFilteredProducts(products.filter(product => product.rental_available === true));
        } else if (selectedCategory === "new") {
            setFilteredProducts(products.filter(product => product.condition === "new"));
        } else if (selectedCategory === "secondHand") {
            setFilteredProducts(products.filter(product => product.condition === "second-hand"));
        }
    }, [selectedCategory, products]);

    // Filter products based on search term
    useEffect(() => {
        const filtered = products.filter(product =>
            product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory === "all") {
            setFilteredProducts(filtered);
        } else if (selectedCategory === "rental") {
            setFilteredProducts(filtered.filter(product => product.rental_available === true));
        } else if (selectedCategory === "new") {
            setFilteredProducts(filtered.filter(product => product.condition === "new"));
        } else if (selectedCategory === "secondHand") {
            setFilteredProducts(filtered.filter(product => product.condition === "second-hand"));
        }
    }, [searchTerm, products, selectedCategory]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/categories/getAllCategories");
                console.log("Categories fetched:", response.data.data.categories);
                setCategories(response.data.data.categories);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };

        fetchCategories();
    }, []);


    // Fetch all products from the API
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/products/getAllProducts');
            setProducts(response.data.data);
            console.log("Products fetched:", response.data.data);
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, product_image: file });
        } else {
            setNewProduct({ ...newProduct, product_image: file });
        }
    };

    const handleFeaturesChange = (e) => {
        const { value } = e.target;
        try {
            // Validate that it's a valid JSON array format
            const featuresArray = value.trim() ? JSON.parse(value) : [];

            if (editingProduct) {
                setEditingProduct({
                    ...editingProduct,
                    product_features: value,
                    parsedFeatures: featuresArray
                });
            } else {
                setNewProduct({
                    ...newProduct,
                    product_features: value,
                    parsedFeatures: featuresArray
                });
            }
        } catch (err) {
            // If not valid JSON, store as is, will be validated on submit
            if (editingProduct) {
                setEditingProduct({ ...editingProduct, product_features: value });
            } else {
                setNewProduct({ ...newProduct, product_features: value });
            }
        }
    };

    const validateProductData = (product) => {
        if (!product.name || !product.description || !product.price ||
            !product.condition || !product.stock_quantity ||
            product.rental_available === undefined || !product.category_id) {
            return "Please fill all required fields";
        }

        if (isNaN(product.price) || parseFloat(product.price) <= 0) {
            return "Please enter a valid price";
        }

        if (isNaN(product.stock_quantity) || parseInt(product.stock_quantity) < 0) {
            return "Please enter a valid stock quantity";
        }

        try {
            const features = typeof product.product_features === 'string'
                ? JSON.parse(product.product_features)
                : product.product_features;

            if (!Array.isArray(features)) {
                return "Product features must be a valid JSON array";
            }
        } catch (err) {
            return "Product features must be a valid JSON array";
        }

        return null;
    };

    const addNewProduct = async () => {

        const validationError = validateProductData(newProduct);
        if (validationError) {
            alert(validationError);
            return;
        }

        if (!newProduct.category_id) {
            alert("Please select a valid category");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price);
            formData.append('condition', newProduct.condition);
            formData.append('stock_quantity', newProduct.stock_quantity);
            formData.append('rental_available', newProduct.rental_available === "TRUE" || newProduct.rental_available === "Yes");
            formData.append('product_features', typeof newProduct.product_features === 'string'
                ? newProduct.product_features
                : JSON.stringify(newProduct.product_features));
            formData.append('category_id', parseInt(newProduct.category_id));

            if (newProduct.product_image) {
                formData.append('product_image', newProduct.product_image);
            }

            console.log("Sending product data:", Object.fromEntries(formData.entries()));

            const response = await axios.post('http://localhost:3000/api/products/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            console.log("API response:", response.data);

            setProducts(prev => [...prev, response.data.data]);
            setNewProduct(null);
            alert("Product added successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product");
            console.error("Error adding product:", err);
        } finally {
            setLoading(false);
        }
    };

    const saveEdit = async () => {
        const validationError = validateProductData(editingProduct);
        if (validationError) {
            alert(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', editingProduct.name);
            formData.append('description', editingProduct.description);
            formData.append('price', editingProduct.price);
            formData.append('condition', editingProduct.condition);
            formData.append('stock_quantity', editingProduct.stock_quantity);
            formData.append('rental_available', editingProduct.rental_available === "Yes" || editingProduct.rental_available === true);
            formData.append('product_features', editingProduct.product_features);

            if (editingProduct.product_image && editingProduct.product_image instanceof File) {
                formData.append('product_image', editingProduct.product_image);
            }

            const response = await axios.patch(`http://localhost:3000/api/products/updateProduct/${editingProduct.product_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update the product in local state
            setProducts(prev =>
                prev.map(product =>
                    product.product_id === editingProduct.product_id
                        ? response.data.data
                        : product
                )
            );

            setEditingProduct(null);
            alert("Product updated successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update product");
            console.error("Error updating product:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:3000/api/products/deleteProduct/${id}`);

            // Remove the product from local state
            setProducts(prev => prev.filter(p => p.product_id !== id));
            alert("Product deleted successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete product");
            console.error("Error deleting product:", err);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="inv-body">
            <br />
            <div className="inventory-container">
                <Seller_dashboard />
                <h2>Inventory Management</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="category-tabs">
                    <button onClick={() => setSelectedCategory("all")}>All Products</button>
                    <button onClick={() => setSelectedCategory("new")}>New Products</button>
                    <button onClick={() => setSelectedCategory("secondHand")}>Second-Hand</button>
                    <button onClick={() => setSelectedCategory("rental")}>Rental</button>
                </div>

                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search products..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                    className="add-product-btn"
                    onClick={() =>
                        setNewProduct({
                            name: "",
                            description: "",
                            price: "",
                            stock_quantity: "",
                            product_features: "[]",
                            condition: "",
                            rental_available: "FALSE",
                            category_id: ""
                        })
                    }
                >
                    Add New Product
                </button>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>Stock</th>
                                <th>Rental Available</th>
                                <th>Features</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-products">No products found</td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.product_id}>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price}</td>
                                        <td>{product.condition}</td>
                                        <td>{product.stock_quantity}</td>
                                        <td>{product.rental_available ? "TRUE" : "FALSE"}</td>
                                        <td>
                                            {Array.isArray(product.features) && product.features.length > 0
                                                ? product.features.slice(0, 2).join(", ") + "..."
                                                : "N/A"}
                                        </td>

                                        <td>
                                            <img src={product.image || "https://via.placeholder.com/50"} alt="Product" width="50" />
                                        </td>
                                        <td>
                                            <button onClick={() => setEditingProduct({ ...product })}>Edit</button>
                                            <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}

                {(editingProduct || newProduct) && (
                    <div className="edit-form">
                        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

                        <label>Name: <span className="required">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={(editingProduct || newProduct).name}
                            onChange={handleChange}
                            required
                        />

                        <label>Description: <span className="required">*</span></label>
                        <textarea
                            name="description"
                            value={(editingProduct || newProduct).description}
                            onChange={handleChange}
                            required
                        />

                        <label>Price: <span className="required">*</span></label>
                        <input
                            type="number"
                            name="price"
                            value={(editingProduct || newProduct).price}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />

                        <label>Stock Quantity: <span className="required">*</span></label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={(editingProduct || newProduct).stock_quantity}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                        <label>Condition: <span className="required">*</span></label>
                        <select
                            name="condition"
                            value={(editingProduct || newProduct).condition}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="new">new</option>
                            <option value="second-hand">second-hand</option>

                        </select>

                        <label>Category: <span className="required">*</span></label>
                        <select
                            name="category_id"
                            value={(editingProduct || newProduct).category_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {categories.map(cat => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>


                        <label>Product Features (JSON Array): <span className="required">*</span></label>
                        <textarea
                            name="product_features"
                            value={(editingProduct || newProduct).product_features}
                            onChange={handleFeaturesChange}
                            placeholder='["feature1", "feature2"]'
                            required
                        />

                        <label>Rental Available:</label>
                        <select
                            name="rental_available"
                            value={(editingProduct || newProduct).rental_available === true ? "Yes" : "No"}
                            onChange={handleChange}
                        >
                            <option value="FALSE">No</option>
                            <option value="TRUE">Yes</option>
                        </select>

                        <label>Product Image: {!editingProduct && <span className="required">*</span>}</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            required={!editingProduct}
                        />

                        {editingProduct && editingProduct.product_image && (
                            <div className="current-image">
                                <p>Current Image:</p>
                                <img src={editingProduct.product_image} alt="Current product" width="100" />
                            </div>
                        )}

                        <div className="form-buttons">
                            <button
                                onClick={editingProduct ? saveEdit : addNewProduct}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : (editingProduct ? "Save" : "Add")}
                            </button>
                            <button
                                onClick={() => (editingProduct ? setEditingProduct(null) : setNewProduct(null))}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InventoryManagement;