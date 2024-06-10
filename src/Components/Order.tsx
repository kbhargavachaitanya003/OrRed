import React from 'react';
import { useFoodStore } from './Store';
import { Button, Typography, Card, CardContent, IconButton, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Styles/Order.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';

const Order = () => {
  const selectedFoodType = useFoodStore((state) => state.selectedFoodType);
  const selectedRestaurant = useFoodStore((state) => state.selectedRestaurant);
  const orderItems = useFoodStore((state) => state.orderItems);
  const setCurrentPage = useFoodStore((state) => state.setCurrentPage);
  // const navigate = useNavigate();

  const handleIncrease = (itemName: string) => {
    useFoodStore.setState((state) => {
      const updatedItems = state.orderItems.map((item) => {
        if (item.name === itemName) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { orderItems: updatedItems };
    });
  };

  const handleDecrease = (itemName: string) => {
    useFoodStore.setState((state) => {
      const updatedItems = state.orderItems.map((item) => {
        if (item.name === itemName && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
      return { orderItems: updatedItems };
    });
  };

  const totalCost = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);

  const handleSubmit = () => {
    // navigate('/thankyou');
    setCurrentPage(4);
  };

  return (
    <div className="page">
      <ArrowBackIcon 
        className='back-button'
        onClick={() => setCurrentPage(2)}
      />
      <div className="order-container">
        <Card className="order-card">
          <CardContent>
            <Typography variant="h4" gutterBottom className='orderheader'>
              Order Details
            </Typography>
            <div className='detailsorder'>
              <Typography variant="h6" className='foodtypeorder'>
                Food Type: {selectedFoodType?.type}
              </Typography>
              <Typography variant="h6" className='restaurantorder'>
                Restaurant: {selectedRestaurant}
              </Typography>
              <Typography variant="h6" gutterBottom className='selecteditems'>
                Selected Items
              </Typography>
              {orderItems.map((item) => (
                <Card key={item.name} className="order-item">
                  <CardContent className="item-content">
                    <div className="item-left-section">
                      <Typography variant="body1" className="item-name">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary" className='descriptions'>
                        {item.description}
                      </Typography>
                    </div>
                    <div className="item-right-section">
                      <CardMedia
                        component="img"
                        height="60"
                        image={item.image}
                        alt={item.name}
                        className='item-image'
                      />
                      <div className="quantity-controls">
                        <IconButton onClick={() => handleDecrease(item.name)} size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body2">{item.quantity}</Typography>
                        <IconButton onClick={() => handleIncrease(item.name)} size="small">
                          <AddIcon />
                        </IconButton>
                        <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Typography variant="h6" gutterBottom className='totalcost'>
                Total Cost: ${totalCost}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Order;
