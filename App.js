import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList'; // Relative path to components folder
import ProductDetails from './components/ProductDetails';

const API_URL = 'http://localhost:3000/api/products'; // Replace with your actual API endpoint

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList apiUrl={API_URL} />} />
          <Route path="/product/:productId" element={<ProductDetails apiUrl={API_URL} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
