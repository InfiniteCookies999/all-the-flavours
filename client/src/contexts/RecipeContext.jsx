import { createContext } from 'react';

const RecipeContext = createContext({
  title: "",
  description: "",
  rating: 0,
  numberReviews: 0,
  ranking: 0,
  lastUpdated: null,
  images: [],
  ingredients: [],
  directions: []
});

export default RecipeContext;