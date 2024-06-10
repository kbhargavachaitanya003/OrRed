import { create } from 'zustand';

interface FoodItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface FoodStore {
    selectedFoodType: {id: number; type: string};
    setSelectedFoodType: (foodType: {id: number; type: string}) => void;
    selectedRestaurant: string;
    setSelectedRestaurant: (restaurant: string) => void;
    selectedRestaurantId: number;
    setSelectedRestaurantId: (restaurantId: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    orderItems: FoodItem[];
    addItem: (name: string, price: number, image: string, description: string) => void;
    updateItemQuantity: (name: string, quantity: number) => void;
}

export const useFoodStore = create<FoodStore>((set) => ({
    selectedFoodType: {id: 0, type: ''},
    setSelectedFoodType: (foodType) => set({selectedFoodType: foodType}),
    selectedRestaurant: '',
    setSelectedRestaurant: (restaurant) => set({selectedRestaurant: restaurant}),
    selectedRestaurantId: 0,
    setSelectedRestaurantId: (restaurantId) => set({selectedRestaurantId: restaurantId}),
    currentPage: 0,
    setCurrentPage: (page) => set({ currentPage: page }),
  orderItems: [],
  addItem: (name, price, image, description) => set((state) => ({
    orderItems: [...state.orderItems, { name, price, quantity: 1, image, description }],
  })),
  updateItemQuantity: (name, quantity) => set((state) => ({
    orderItems: state.orderItems.map((item) =>
      item.name === name ? { ...item, quantity } : item
    ),
  }))
}));
