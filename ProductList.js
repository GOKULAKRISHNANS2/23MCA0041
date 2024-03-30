import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList({ apiUrl }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  return (
    <div>
      <h1>All Products</h1>
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
