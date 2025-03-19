import { useState } from "react";
import "./InventoryManagement.css";
import Seller_dashboard from "./Seller_dashboard";

function InventoryManagement() {
    const [selectedCategory, setSelectedCategory] = useState("new");
    const [products, setProducts] = useState({
        new: [{ id: 1, name: "Product", description: "A brand new product", price: 100, stock_quantity: 10, product_features: "Feature A, Feature B", category_id: 1, image: "" }],
        secondHand: [{ id: 2, name: "Second-hand Product", description: "Gently used product", price: 50, condition: "Used", stock_quantity: 5, rental_available: "Not Available", product_features: "Feature C", category_id: 2, image: "" }],
        rental: [],
    });

    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });

        if (name === "rental_available" && selectedCategory === "secondHand") {
            if (value === "Available") {
                setProducts((prev) => ({
                    ...prev,
                    rental: [...prev.rental, { ...editingProduct, category_id: 3 }],
                }));
            } else {
                setProducts((prev) => ({
                    ...prev,
                    rental: prev.rental.filter((p) => p.id !== editingProduct.id),
                }));
            }
        }
    };

    const saveEdit = () => {
        setProducts((prev) => ({
            ...prev,
            [selectedCategory]: prev[selectedCategory].map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            ),
        }));

        if (selectedCategory === "secondHand" && editingProduct.rental_available === "Available") {
            setProducts((prev) => ({
                ...prev,
                rental: [...prev.rental, { ...editingProduct, category_id: 3 }],
            }));
        } else {
            setProducts((prev) => ({
                ...prev,
                rental: prev.rental.filter((p) => p.id !== editingProduct.id),
            }));
        }

        setEditingProduct(null);
    };

    const deleteProduct = (id) => {
        setProducts((prev) => ({
            ...prev,
            [selectedCategory]: prev[selectedCategory].filter((product) => product.id !== id),
            rental: prev.rental.filter((product) => product.id !== id),
        }));
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addNewProduct = () => {
        if (!newProduct || !newProduct.name || !newProduct.stock_quantity || !newProduct.price) {
            alert("Please fill all required fields.");
            return;
        }

        const updatedProducts = {
            ...products,
            [selectedCategory]: [...products[selectedCategory], { id: Date.now(), ...newProduct }],
        };

        if (selectedCategory === "secondHand" && newProduct.rental_available === "Available") {
            updatedProducts.rental = [...updatedProducts.rental, { ...newProduct, category_id: 3 }];
        }

        setProducts(updatedProducts);
        setNewProduct(null);
    };

    return (
        <div className="inventory-container">
            <Seller_dashboard />
            <h2>Inventory Management</h2>
            <div className="category-tabs">
                <button onClick={() => setSelectedCategory("new")}>Products</button>
                <button onClick={() => setSelectedCategory("secondHand")}>Second-Hand</button>
                <button onClick={() => setSelectedCategory("rental")}>Rental</button>
            </div>

            <input
                type="text"
                className="search-bar"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />

            <button
                className="add-product-btn"
                onClick={() =>
                    setNewProduct({
                        name: "",
                        description: "",
                        price: "",
                        stock_quantity: "",
                        product_features: "",
                        category_id: "",
                        image: "",
                        ...(selectedCategory !== "new" && { condition: "" }),
                        ...(selectedCategory !== "new" && { rental_available: "Not Available" }),
                    })
                }
            >
                Add New Product
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        {selectedCategory !== "new" && <th>Condition</th>}
                        <th>Stock</th>
                        {selectedCategory !== "new" && <th>Rental Available</th>}
                        <th>Features</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products[selectedCategory]
                        .filter((product) => product.name.toLowerCase().includes(searchTerm))
                        .map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                {selectedCategory !== "new" && <td>{product.condition}</td>}
                                <td>{product.stock_quantity}</td>
                                {selectedCategory !== "new" && <td>{product.rental_available}</td>}
                                <td>{product.product_features}</td>
                                <td>
                                    <img src={product.image || "https://via.placeholder.com/50"} alt="Product" width="50" />
                                </td>
                                <td>
                                    <button onClick={() => setEditingProduct({ ...product })}>Edit</button>
                                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {editingProduct && (
                <div className="edit-form">
                    <h3>Edit Product</h3>
                    <input type="text" name="name" value={editingProduct.name} onChange={handleEditChange} />
                    <input type="text" name="description" value={editingProduct.description} onChange={handleEditChange} />
                    <input type="number" name="price" value={editingProduct.price} onChange={handleEditChange} />
                    {selectedCategory !== "new" && (
                        <input type="text" name="condition" value={editingProduct.condition} onChange={handleEditChange} />
                    )}
                    <input type="number" name="stock_quantity" value={editingProduct.stock_quantity} onChange={handleEditChange} />
                    {selectedCategory !== "new" && (
                        <select name="rental_available" value={editingProduct.rental_available} onChange={handleEditChange}>
                            <option value="Not Available">Not Available</option>
                            <option value="Available">Available</option>
                        </select>
                    )}
                    <input type="text" name="product_features" value={editingProduct.product_features} onChange={handleEditChange} />
                    <input type="text" name="image" value={editingProduct.image} onChange={handleEditChange} />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
            )}

{newProduct && (
    <div className="edit-form">
        <h3>Add New Product</h3>

        <div className="form-group">
            <label>Product Name:</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} />
        </div>

        <div className="form-group">
            <label>Description:</label>
            <input type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} />
        </div>

        <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleNewProductChange} />
        </div>

        {selectedCategory !== "new" && (
            <div className="form-group">
                <label>Condition:</label>
                <input type="text" name="condition" value={newProduct.condition} onChange={handleNewProductChange} />
            </div>
        )}

        <div className="form-group">
            <label>Stock Quantity:</label>
            <input type="number" name="stock_quantity" value={newProduct.stock_quantity} onChange={handleNewProductChange} />
        </div>

        {selectedCategory !== "new" && (
            <div className="form-group">
                <label>Rental Available:</label>
                <select name="rental_available" value={newProduct.rental_available} onChange={handleNewProductChange}>
                    <option value="Not Available">Not Available</option>
                    <option value="Available">Available</option>
                </select>
            </div>
        )}

        <div className="form-group">
            <label>Product Features:</label>
            <input type="text" name="product_features" value={newProduct.product_features} onChange={handleNewProductChange} />
        </div>

        <div className="form-group">
            <label>Image URL:</label>
            <input type="text" name="image" value={newProduct.image} onChange={handleNewProductChange} />
        </div>

        <div className="button-group">
            <button onClick={addNewProduct}>Add</button>
            <button onClick={() => setNewProduct(null)}>Cancel</button>
        </div>
    </div>
)}


        </div>
    );
}

export default InventoryManagement;

