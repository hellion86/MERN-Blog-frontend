import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const { data } = await axios.get('/comments');
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // Posts
    [fetchComments.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.status = 'error';
      state.comments.items = [];
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
