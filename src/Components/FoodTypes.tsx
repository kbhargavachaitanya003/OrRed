import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchFoodTypes } from './api';
import { useFoodStore } from './Store';
// import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import '../Styles/FoodTypes.css';

const FoodTypes = () => {
    
  const { data, isLoading, error } = useQuery({
    queryKey: ['foodTypes'],
    queryFn: fetchFoodTypes
  });

  const setSelectedFoodType = useFoodStore((state) => state.setSelectedFoodType);
  const setCurrentPage = useFoodStore((state) => state.setCurrentPage);

  // const navigate = useNavigate();

  if (isLoading){
    return <div className='loaderror'>Loading...</div>
  }

  if (error){
    return <div className='loaderror'>Error in Loading Food Types</div>
  }

  return (
    <div className="typecontainer">
      <h1 className="typeheader">Food Types</h1>
      <div className="typegrid-container">
        {data.map((foodType: { id: number; type: string; image: string }) => (
          <Card
            key={foodType.id}
            className="food-card"
            onClick={() => {
              setSelectedFoodType(foodType);
              // navigate('/restaurants');
              setCurrentPage(1);
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={foodType.image}
                alt={foodType.type}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {foodType.type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodTypes;
