import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRecipesByCategory } from "../lib/getRecipesByCategory";

const initialState = {
  recipes: [],
  loaded: false,
  favorite: "",
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (category) => {
    const res = await getRecipesByCategory(category);
    return res;
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: { ...initialState },
  reducers: {
    addFavorite(state, action) {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload.meals;
        state.loaded = true;
      });
  },
});

export const { addFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;
