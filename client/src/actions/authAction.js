import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

//register users using thunk by returning a dispatch function
export const registerUser = (userData, history) => dispatch => {
  //catch this.props.history from withRouter in Register.js component
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')) //redirect using history from  withRouter
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //set token to localStorage
      localStorage.setItem('jwtToken', token); //localStorage only stores strings
      //set token to Auth header --> like how we set token to authorization header in postman
      setAuthToken(token); //userdata is stored inside the token:- use package called jwtdecode to extract the data
      //Decode token to get user userdata
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future request --->authorization header
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false we are sending an empty object as payload
  dispatch(setCurrentUser({}));
};
