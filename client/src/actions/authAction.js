import axios from 'axios';
import { GET_ERRORS } from './types';

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
