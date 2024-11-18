import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import StockUpdates from './components/StockUpdates'; // Import StockUpdates

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stock-updates" element={<StockUpdates />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
