import axios from "axios";

export const fetchFoodTypes = async () => {
    try{
        const response = await axios.get('http://localhost:3001/foodTypes');
        return response.data;
    } catch (error){
        console.error('An error occurred while fetching food types:', error);
        throw error;
    }
};

export const fetchRestaurants = async (foodTypeId: number) => {
    try{
        const response = await axios.get(`http://localhost:3001/restaurants?foodTypeId=${foodTypeId}`);
        return response.data;
    } catch (error){
        console.error('An error occurred while fetching restaurants:', error);
        throw error;
    }
}

export const fetchMenu = async (restaurantId: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/menus?restaurantId=${restaurantId}`);
      return response.data;
    } catch (error) {
      console.error('An error occurred while fetching menu:', error);
      throw error;
    }
  }