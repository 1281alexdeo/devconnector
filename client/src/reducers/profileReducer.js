import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';
const initalState = {
  loading: false,
  profile: null,
  profiles: null
};

export default function(state = initalState, action) {
  switch (action.payload) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
