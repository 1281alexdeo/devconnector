import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
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

//CREATE PROFILE ACITON
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE ACCOUNT and PROFILE
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    axios.delete('/api/profile').then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    );
  }
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

//ADD EXPERIENCE
export const addExperience = (formData, history) => dispatch => {
  axios
    .post('/api/profile/experience', formData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//ADD EDUCATION
export const addEducation = (formData, history) => dispatch => {
  axios
    .post('/api/profile/education', formData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE EXPERIENCE
export const deleteExperience = exp_id => dispatch => {
  axios
    .delete(`/api/profile/experience/${exp_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      alert('delete fail');
    });
};

//DELETE EDUCATION
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      alert('delete fail');
    });
};
