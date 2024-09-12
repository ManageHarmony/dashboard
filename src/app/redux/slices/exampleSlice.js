import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedCategory: [],
  articleContent: [], // To store article content
  ytContents: [],     // To store YouTube contents
  blogData: [],       // To store blog data
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // Save category data
    saveCategory: (state, action) => {
      state.savedCategory = action.payload;
    },

    // Save article content data
    saveArticleContent: (state, action) => {
      state.articleContent = action.payload;
    },

    // Save YouTube content data
    saveYTContents: (state, action) => {
      state.ytContents = action.payload;
    },

    // Save blog data
    saveBlogData: (state, action) => {
      state.blogData = action.payload;
    },
  },
});

export const { 
  saveCategory, 
  saveArticleContent, 
  saveYTContents, 
  saveBlogData 
} = exampleSlice.actions;

export default exampleSlice.reducer;
