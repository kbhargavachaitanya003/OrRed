import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../Components/api';
import { useFoodStore } from '../Components/Store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../Styles/Menu.css';

const Menu = () => {
    const selectedRestaurantId = useFoodStore((state) => state.selectedRestaurantId);
    const addItem = useFoodStore((state) => state.addItem);
    const updateItemQuantity = useFoodStore((state) => state.updateItemQuantity);
    const navigate = useNavigate();
    const orderItems = useFoodStore((state) => state.orderItems);
    // const setCurrentPage = useFoodStore((state) => state.setCurrentPage);

    const handleAdd = (name: string, price: number, image: string, description: string) => {
        const item = orderItems.find((item) => item.name === name);
        if (item) {
            updateItemQuantity(name, item.quantity + 1);
        } else {
            addItem(name, price, image, description);
        }
    };

    const handleRemove = (name: string) => {
        const item = orderItems.find((item) => item.name === name);
        if (item && item.quantity > 1) {
            updateItemQuantity(name, item.quantity - 1);
        } else {
            useFoodStore.setState((state) => ({
                orderItems: state.orderItems.filter((item) => item.name !== name)
            }));
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['menu', selectedRestaurantId],
        queryFn: () => fetchMenu(selectedRestaurantId)
    });

    if (isLoading || !data) return <div className='loading'>Loading...</div>;

    if(error) return <div>Error in Loading Menu</div>;

    return (
        <div className='container'>
            <ArrowBackIcon 
                className='back-button'
                // onClick={() => setCurrentPage(1)}
                onClick={() => navigate('/restaurants')}
            />
            <h1 className='header'>Menu</h1>
            <div className="grid-container">
                {data.map((menu: { name: string, price: number, description: string, image: string }) => {
                    const item = orderItems.find((item) => item.name === menu.name);
                    return (
                        <Card key={menu.name} className='menu-card'>
                            <CardContent className="card-content">
                                <div className="left-section">
                                    <Typography variant="h6" component="div">
                                        {menu.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="div" className='price'>
                                        ${item ? (menu.price * item.quantity).toFixed(2) : menu.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="div" className='description'>
                                        {menu.description}
                                    </Typography>
                                </div>
                                <div className="right-section">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={menu.image}
                                        alt={menu.name}
                                    />
                                    {item ? (
                                        <div className="count-buttons">
                                            <IconButton onClick={() => handleRemove(menu.name)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body1">{item.quantity}</Typography>
                                            <IconButton onClick={() => handleAdd(menu.name, menu.price, menu.image, menu.description)}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="add-button"
                                            onClick={() => handleAdd(menu.name, menu.price, menu.image, menu.description)}
                                        >
                                            ADD
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            {orderItems.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    className="place-order-button"
                    // onClick={() => setCurrentPage(3)}
                    onClick={() => navigate('/order')}
                >
                    Place Order
                </Button>
            )}
        </div>
    );
};

export default Menu;
