import React from 'react';
import FoodTypes from './Routes/FoodTypes';
import Restaurants from './Routes/Restaurants';
import Menu from './Routes/Menu';
import Order from './Routes/Order';
import Thankyou from './Routes/Thankyou';
// import { useFoodStore } from './Components/Store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  // const currentPage = useFoodStore((state) => state.currentPage);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FoodTypes />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
