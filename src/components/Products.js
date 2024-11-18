import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(''); // State for error message

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Adjust if necessary
        setProducts(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.'); // Set error message
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {loading ? ( // Show loading message while fetching
        <p>Loading products...</p>
      ) : error ? ( // Show error message if there was an error
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - {product.category} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
