import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//profile PROFILE_LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//clear current user profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
