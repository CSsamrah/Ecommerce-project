import { useState } from "react";
import "./InventoryManagement.css";
import Seller_dashboard from "./Seller_dashboard";

function InventoryManagement() {
    const [selectedCategory, setSelectedCategory] = useState("new");
    const [products, setProducts] = useState({
        new: [{ id: 1, name: "New Product", description: "A brand new product", price: 100, stock_quantity: 10, rental_available: "No", product_features: "Feature A, Feature B", image: "" }],
        secondHand: [{ id: 2, name: "Used Product", description: "Gently used", price: 50, stock_quantity: 5, condition: "Used", rental_available: "Not Available", product_features: "Feature C", image: "" }],
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

    const saveEdit = () => {
        setProducts((prev) => {
            const updatedCategory = prev[selectedCategory].map((product) =>
                product.id === editingProduct.id ? editingProduct : product
            );
    
            let updatedRental = prev.rental.filter((p) => p.id !== editingProduct.id);
            if (
                (selectedCategory === "new" && editingProduct.rental_available === "Yes") ||
                (selectedCategory === "secondHand" && editingProduct.rental_available === "Available")
            ) {
                updatedRental = [...updatedRental, { ...editingProduct }];
            }
    
            return { ...prev, [selectedCategory]: updatedCategory, rental: updatedRental };
        });
    
        setEditingProduct(null);
    };

    const deleteProduct = (id) => {
        setProducts((prev) => ({
            ...prev,
            [selectedCategory]: prev[selectedCategory].filter((product) => product.id !== id),
            rental: prev.rental.filter((product) => product.id !== id),
        }));
    };

const addNewProduct = () => {
    if (!newProduct || !newProduct.name || !newProduct.stock_quantity || !newProduct.price) {
        alert("Please fill all required fields.");
        return;
    }

    const newProductData = { id: Date.now(), ...newProduct };
    let updatedProducts = {
        ...products,
        [selectedCategory]: [...products[selectedCategory], newProductData],
    };

    if (
        (selectedCategory === "new" && newProduct.rental_available === "Yes") ||
        (selectedCategory === "secondHand" && newProduct.rental_available === "Available")
    ) {
        updatedProducts.rental = [...products.rental, newProductData];
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
                        image: "",
                        ...(selectedCategory !== "new" && { condition: "" }),
                        rental_available: selectedCategory === "new" ? "No" : "Not Available",
                    })
                }
            >
                Add New Product
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        {selectedCategory !== "new" && <th>Condition</th>}
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
                                {selectedCategory !== "new" && <td>{product.condition}</td>}
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
                    <label>Name:</label>
                    <input type="text" name="name" value={(editingProduct || newProduct).name} onChange={handleChange} />

                    <label>Description:</label>
                    <input type="text" name="description" value={(editingProduct || newProduct).description} onChange={handleChange} />
                    <label>Price:</label>
                    <input type="number" name="price" value={(editingProduct || newProduct).price} onChange={handleChange} />

                    <label>Stock Quantity:</label>
                    <input type="number" name="stock_quantity" value={(editingProduct || newProduct).stock_quantity} onChange={handleChange} />

                    {selectedCategory === "new" && (
                        <>
                            <label>Rental Available:</label>
                            <select name="rental_available" value={(editingProduct || newProduct).rental_available} onChange={handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </>
                    )}

                    {selectedCategory === "secondHand" && (
                        <>
                            <label>Condition:</label>
                            <input type="text" name="condition" value={(editingProduct || newProduct).condition} onChange={handleChange} />

                            <label>Rental Available:</label>
                            <select name="rental_available" value={(editingProduct || newProduct).rental_available} onChange={handleChange}>
                                <option value="Not Available">Not Available</option>
                                <option value="Available">Available</option>
                            </select>
                        </>
                    )}

                    <button onClick={editingProduct ? saveEdit : addNewProduct}>{editingProduct ? "Save" : "Add"}</button>
                    <button onClick={() => (editingProduct ? setEditingProduct(null) : setNewProduct(null))}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default InventoryManagement;


