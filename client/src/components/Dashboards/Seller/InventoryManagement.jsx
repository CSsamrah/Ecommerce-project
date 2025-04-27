import { useState } from "react";
import "./InventoryManagement.css";
import Seller_dashboard from "./Seller_dashboard";

function InventoryManagement() {
    const [selectedCategory, setSelectedCategory] = useState("new");
    const [products, setProducts] = useState({
        new: [],
        secondHand: [],
        rental: [],
    });
const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
        const imageUrl = URL.createObjectURL(file);
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, image: imageUrl });
        } else {
            setNewProduct({ ...newProduct, image: imageUrl });
        }
    };
const saveEdit = () => {
        setProducts((prev) => {
            const updatedCategory = prev[selectedCategory].map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            );
            let updatedRental = prev.rental.filter((p) => p.id !== editingProduct.id);
            if (editingProduct.rental_available === "Yes") {
                updatedRental.push(editingProduct);
            }
            return { ...prev, [selectedCategory]: updatedCategory, rental: updatedRental };
        });
        setEditingProduct(null);
    };
    const deleteProduct = (id) => {
    setProducts((prev) => ({
            new: prev.new.filter((p) => p.id !== id),
            secondHand: prev.secondHand.filter((p) => p.id !== id),
            rental: prev.rental.filter((p) => p.id !== id),
        }));
    };
    const addNewProduct = () => {
        if (!newProduct || !newProduct.name || !newProduct.price || !newProduct.stock_quantity || !newProduct.condition) {
            alert("Please fill all required fields.");
            return;
        }
        const newProductData = { id: Date.now(), ...newProduct };
    const category = newProduct.category_type === "Products" ? "new" : "secondHand";

let updatedProducts = {
            ...products,
            [category]: [...products[category], newProductData],
        };
        if (newProduct.rental_available === "Yes") {
            updatedProducts.rental = [...products.rental, newProductData];
        }
        setProducts(updatedProducts);
        setNewProduct(null);
    };
    return (
        <div className="inv-body">
            <Seller_dashboard />
        <div className="inventory-container">
            
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
            {selectedCategory !== "rental" && (
                <button
                    className="add-product-btn"
                    onClick={() =>
                        setNewProduct({
                            name: "",description: "",price: "", stock_quantity: "", product_features: "", condition: "",image: "",  rental_available: "No", category_type: "",})
                    }>
                    Add New Product </button>
            )}
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
                    {products[selectedCategory]
                        .filter((product) => product.name.toLowerCase().includes(searchTerm))
                        .map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.condition}</td>
                                <td>{product.stock_quantity}</td>
                                <td>{product.rental_available}</td>
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
            {(editingProduct || newProduct) && (
                <div className="edit-form">
                    <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

                    <label>Category Type:</label>
                    <select name="category_type" value={(editingProduct || newProduct).category_type} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Products">Products</option>
                        <option value="Second-Hand">Second-Hand</option>
                    </select>
                    <label>Name:</label>
                    <input type="text" name="name" value={(editingProduct || newProduct).name} onChange={handleChange} />
                    <label>Description:</label>
                    <input type="text" name="description" value={(editingProduct || newProduct).description} onChange={handleChange} />
                    <label>Price:</label>
                    <input type="number" name="price" value={(editingProduct || newProduct).price} onChange={handleChange} />
                    <label>Stock Quantity:</label>
                    <input type="number" name="stock_quantity" value={(editingProduct || newProduct).stock_quantity} onChange={handleChange} />
                    <label>Condition:</label>
                    <input type="text" name="condition" value={(editingProduct || newProduct).condition} onChange={handleChange} />
                    <label>Product Features:</label>
                    <input type="text" name="product_features" value={(editingProduct || newProduct).product_features} onChange={handleChange} />
                    <label>Rental Available:</label>
                    <select name="rental_available" value={(editingProduct || newProduct).rental_available} onChange={handleChange}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    <label>Product Image:</label>
                    <input type="file" onChange={handleImageUpload} />
                    <button onClick={editingProduct ? saveEdit : addNewProduct}>{editingProduct ? "Save" : "Add"}</button>
                    <button onClick={() => (editingProduct ? setEditingProduct(null) : setNewProduct(null))}>Cancel</button>
                </div>
            )}
        </div>
        </div>
    );
}

export default InventoryManagement;




