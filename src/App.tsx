import React from 'react';
import FoodTypes from './Components/FoodTypes';
import Restaurants from './Components/Restaurants';
import Menu from './Components/Menu';
import Order from './Components/Order';
import Thankyou from './Components/Thankyou';
import { useFoodStore } from './Components/Store';
import './App.css';

function App() {
  const currentPage = useFoodStore((state) => state.currentPage);

  const component = () => {
    switch (currentPage) {
      case 0:
        return <FoodTypes />;
      case 1:
        return <Restaurants />;
      case 2:
        return <Menu />;
      case 3:
        return <Order />;
      case 4:
        return <Thankyou />;
      default:
        return <FoodTypes />;
    }
  };

  return (
    <div className="App">
      {component()}
    </div>
  );
}

export default App;
