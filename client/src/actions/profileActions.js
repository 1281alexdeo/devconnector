import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING } from './types';

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
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//profile PROFILE_LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
