import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from '../actions/types';

//initial state
const initalState = {
  loading: false,
  profile: null,
  profiles: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case PROFILE_LOADING: // return current state and setting the loading property of the state to false
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE: //returns current state and setting the profile to the paload of GET_PROFILE Action
      return {
        ...state,
        profile: action.payload,
        loading: false //setting the loading property back to fasle since we already got the profile at this point in time
      };

    case CLEAR_CURRENT_PROFILE: //we need this for clearing the profile of a user once his/her logs out of the application
      return {
        ...state, //get current state
        profile: null //setting the profile back to null once the user has logged out
      };
    case GET_PROFILES: //get profiles of all developers
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
