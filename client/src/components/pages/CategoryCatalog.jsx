import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/navbar1';

const CategoryCatalog = ({ isRental = false }) => {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const condition = searchParams.get('condition');
                
                // Determine the correct API endpoint based on isRental prop
                const baseUrl = isRental ? '/api/rental-category' : '/api/category';
                const url = `${baseUrl}/${slug}${condition ? `?condition=${condition}` : ''}`;
                const response = await axios.get(
                    `http://localhost:3000/api/categories/<span class="math-inline">\{slug\}?condition\=</span>{condition}` // Your backend endpoint
                  );
                
                // const response = await axios.get(url);
                console.log(response.data);
                setCategory(response.data.category);
                setProducts(response.data.products);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch products");
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [slug, searchParams, isRental]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!category) return <div>Category not found</div>;

    return (
        <div>
            <h1>{category.category_name} {isRental ? 'Rental' : ''} Products</h1>
            {searchParams.get('condition') && (
                <h2>Condition: {searchParams.get('condition')}</h2>
            )}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.product_id} className="product-card">
                        <img src={product.product_image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Rs. {product.price}</p>
                        <p>Condition: {product.condition}</p>
                        {isRental && (
                            <p>Rental Available: {product.rental_available ? 'Yes' : 'No'}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCatalog;