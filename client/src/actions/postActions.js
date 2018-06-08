import axios from 'axios';
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from './types';

//add Post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
//get Posts by ID
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};
//Like Posts
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Like Posts
export const unlikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//set post loading action
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
