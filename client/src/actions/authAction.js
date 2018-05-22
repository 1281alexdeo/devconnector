import axios from 'axios';
import { GET_ERRORS } from './types';

//register users using thunk by returning a dispatch function
export const registerUser = userData => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => console.log(res.data)) //wana redirect
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
