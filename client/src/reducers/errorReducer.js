import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {}; //because we want the object to be the errors object itself

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
