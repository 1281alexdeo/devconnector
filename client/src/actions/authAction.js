import { TEST_DISPATCH } from './types';
//register users tesing
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
