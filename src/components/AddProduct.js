import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
  });
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // Error handling state

  // Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before new submission

    // Simple validation to ensure all fields are filled
    if (!product.name || !product.category || !product.price) {
      setError('All fields are required');
      return;
    }

    try {
      // Log the product object to check if the values are being captured correctly
      console.log('Product being submitted:', product);

      // Send POST request to your backend (adjust if necessary to match your backend)
      const response = await axios.post('http://localhost:5000/api/products', product);

      // Set the description if returned from backend
      setDescription(response.data.description); 

    } catch (err) {
      console.error(err);
      setError('Failed to add product. Please try again.'); // Error handling
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name} // Controlled input
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category} // Controlled input
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price} // Controlled input
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display generated description */}
      {description && (
        <div>
          <h3>Generated Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
