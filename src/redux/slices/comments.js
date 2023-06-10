import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const { data } = await axios.get('/comments');
    return data;
  }
);
// export const fetchCommentsByPostId = createAsyncThunk(
//   'comments/fetchCommentsByPostId',
//   async (postId) => {
//     const { data } = await axios.get(`/comments/${postId}`);
//     return data;
//   }
// );

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
    // Fetch comment by post id
    // [fetchCommentsByPostId.pending]: (state) => {
    //   state.commentsByPost.status = 'loading';
    // },
    // [fetchCommentsByPostId.fulfilled]: (state, action) => {
    //   state.commentsByPost.items = action.payload;
    //   state.commentsByPost.status = 'loaded';
    // },
    // [fetchCommentsByPostId.rejected]: (state) => {
    //   state.commentsByPost.status = 'error';
    //   state.commentsByPost.items = [];
    // },
  },
});

export const commentsReducer = commentsSlice.reducer;
