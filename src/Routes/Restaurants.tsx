import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '../Components/api';
// import { useFoodStore } from '../Components/Store';
import { useFoodStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/Restaurants.css';

const Restaurants = () => {
  const selectedFoodType = useFoodStore((state) => state.selectedFoodType);
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants', selectedFoodType.id],
    queryFn: () => fetchRestaurants(selectedFoodType.id)
  });
  const setSelectedRestaurantId = useFoodStore((state) => state.setSelectedRestaurantId);
  const setSelectedRestaurant = useFoodStore((state) => state.setSelectedRestaurant);
  // const setCurrentPage = useFoodStore((state) => state.setCurrentPage);
  const navigate = useNavigate();

  if (isLoading) return <div className='loaderror'>Loading...</div>

  if(error) return <div className='loaderror'>Error in Loading Restaurants</div>

  return (
    <div className="rescontainer">
      <ArrowBackIcon 
        className='back-button'
        // onClick={() => setCurrentPage(0)}
        onClick={() => navigate('/')}
      />
      <h1 className="resheader">Restaurants</h1>
      <div className="resgrid-container">
        {data.map((restaurant: { id: number; name: string }) => (
          <Button
            key={restaurant.id}
            className="restaurant-button"
            onClick={() => {
              setSelectedRestaurantId(restaurant.id);
              setSelectedRestaurant(restaurant.name);
              // setCurrentPage(2);
              navigate('/menu');
            }}
          >
            {restaurant.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
