import { useState } from "react";
import "./InventoryManagement.css";
import { useNavigate } from "react-router-dom";
import Seller_dashboard from "./Seller_dashboard";

function InventoryManagement() {
    const [selectedCategory, setSelectedCategory] = useState("new");
    const [products, setProducts] = useState({
        new: [{ id: 1, name: "New Product", description: "A brand new product", price: 100, stock_quantity: 10, product_features: "Feature A, Feature B", category_id: 1, image: "" }],
        secondHand: [{ id: 2, name: "Second-hand Product", description: "Gently used product", price: 50, condition: "Used", stock_quantity: 5, product_features: "Feature C", category_id: 2, image: "" }],
        rental: [{ id: 3, name: "Rental Product", description: "Available for rent", price: 30, condition: "Rental", stock_quantity: 3, rental_available: true, product_features: "Feature D, Feature E", category_id: 3, image: "" }],
    });

    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingProduct({ 
            ...editingProduct, 
            [name]: type === "checkbox" ? checked : value 
        });
    };
    const saveEdit = () => {
        setProducts({
            ...products,
            [selectedCategory]: products[selectedCategory].map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            )
        });
        setEditingProduct(null);
    };
    const deleteProduct = (id) => {
        setProducts({
            ...products,
            [selectedCategory]: products[selectedCategory].filter(product => product.id !== id)
        });
    };
    const handleNewProductChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct({ 
            ...newProduct, 
            [name]: type === "checkbox" ? checked : value 
        });
    };
    const addNewProduct = () => {
        if (!newProduct || !newProduct.name || !newProduct.stock_quantity || !newProduct.price) {
            alert("Please fill all required fields.");
            return;
        }
        setProducts({
            ...products,
            [selectedCategory]: [...products[selectedCategory], { id: Date.now(), ...newProduct }]
        });
        setNewProduct(null);
    };
    return (
        <div className="inventory-container">
            <Seller_dashboard />
            <h2>Inventory Management</h2>
            <div className="category-tabs">
                <button onClick={() => setSelectedCategory("new")}>New Products</button>
                <button onClick={() => setSelectedCategory("secondHand")}>Second-Hand</button>
                <button onClick={() => setSelectedCategory("rental")}>Rental</button>
            </div>
            <input
                type="text"
                className="search-bar"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <button className="add-product-btn" onClick={() => 
                setNewProduct({ 
                    name: "", 
                    description: "", 
                    price: "", 
                    stock_quantity: "", 
                    product_features: "", 
                    category_id: "", 
                    image: "",
                    ...(selectedCategory !== "new" && { condition: "" }),  // Add condition field only for secondHand & rental
                    ...(selectedCategory === "rental" && { rental_available: false }) // Add rental_available only for rental
                })
            }>
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
                        {selectedCategory === "rental" && <th>Rental Available</th>}
                        <th>Features</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products[selectedCategory]
                        .filter(product => product.name.toLowerCase().includes(searchTerm))
                        .map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                {selectedCategory !== "new" && <td>{product.condition}</td>}
                                <td>{product.stock_quantity}</td>
                                {selectedCategory === "rental" && <td>{product.rental_available ? "Yes" : "No"}</td>}
                                <td>{product.product_features}</td>
                                <td>
                                    <img
                                        src={product.image || "https://via.placeholder.com/50"}
                                        alt="Product"
                                        width="50"
                                    />
                                </td>
                                <td>
                                    <button onClick={() => setEditingProduct(product)}>Edit</button>
                                    <button onClick={() => deleteProduct(product.id)}>Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {newProduct && (
                <div className="edit-form">
                    <h3>Add New Product</h3>
                    <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleNewProductChange} />
                    <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleNewProductChange} />
                    <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleNewProductChange} />
                    {selectedCategory !== "new" && (
                        <input type="text" name="condition" placeholder="Condition (New/Used)" value={newProduct.condition} onChange={handleNewProductChange} />
                    )}
                    <input type="number" name="stock_quantity" placeholder="Stock Quantity" value={newProduct.stock_quantity} onChange={handleNewProductChange} />
                    {selectedCategory === "rental" && (
                        <label>
                            <input type="checkbox" name="rental_available" checked={newProduct.rental_available} onChange={handleNewProductChange} />
                            Rental Available
                        </label>
                    )}
                    <input type="text" name="product_features" placeholder="Features (comma separated)" value={newProduct.product_features} onChange={handleNewProductChange} />
                    <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleNewProductChange} />
                    <button onClick={addNewProduct}>Add</button>
                    <button onClick={() => setNewProduct(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
export default InventoryManagement;
