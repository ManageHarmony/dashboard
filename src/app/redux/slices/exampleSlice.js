import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedCategory: [],
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  
    saveCategory:(state,action) => {
      state.savedCategory = action.payload;
    }
  },
});

export const { increment, decrement,saveCategory } = exampleSlice.actions;

export default exampleSlice.reducer;
