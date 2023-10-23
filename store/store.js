import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import recipesSlice from "./recipesSlice";

export default configureStore({
  reducer: {
    categories: categoriesSlice,
    recipes: recipesSlice,
  },
});
