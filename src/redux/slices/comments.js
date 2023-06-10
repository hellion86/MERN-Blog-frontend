import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { act } from 'react-dom/test-utils';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const { data } = await axios.get('/comments');
    return data;
  }
);
export const createComment = createAsyncThunk(
  'comments/createComment',
  async (comment) => {
    const { data } = await axios.post(`/comments`, comment);
    console.log('I AM CREATE COMMENT');
    console.log(data);

    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
  // commentsByPost: {
  //   items: [],
  //   status: 'loading',
  // },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // Comments
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
    // add comment
    [createComment.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [createComment.fulfilled]: (state, action) => {
      console.log(action);
      state.comments.items = [...state.comments.items, action.payload];
      state.comments.status = 'loaded';
    },
    [createComment.rejected]: (state) => {
      state.comments.status = 'error';
      // state.comments.items = [];
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
