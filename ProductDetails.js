import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails({ apiUrl }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [apiUrl, productId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Company: {product.company}</p>
          <p>Category: {product.category}</p>
          {product.imageUrl && ( // Conditionally render image if available
            <img src={product.imageUrl} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }} />
          )}
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
          {/* Add more product details here if available in your API response */}
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetails;
