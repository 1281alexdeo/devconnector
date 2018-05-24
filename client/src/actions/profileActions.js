import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

//GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); //before making the request loading should be set to false
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        //once the request is sucess we dispatch GET_PROILE ACTION
        type: GET_PROFILE,
        payload: res.data //passing the data recieved from the request to the payload of the action
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {} //if the request was no profile we pass an empty obeject inidcating that there is no profile for that user
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //passing the actual errors from the backend api
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
