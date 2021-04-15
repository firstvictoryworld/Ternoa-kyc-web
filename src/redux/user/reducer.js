// import { handleActions } from 'redux-actions';
// import {
//     fetchUserProfileRequest,
//     fetchUserProfileSuccess,
//     fetchUserProfileFailure
// } from './actions';

import { 
  REGISTER_USER_INIT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  RESET_SIGNUP_ERROR
  // VERIFICATION_ERROR 
} from '../actions';

const defaultState = {
  user: null,
  isFetching: false,
  error: '',
};

export default (state = defaultState, action) => {
  // console.log(action)
  switch (action.type) {
    /* BUSINESS LIST CASES */
    case REGISTER_USER_INIT:
      return { 
        ...state, 
        isFetching: true,
        error: ''
      };
    case REGISTER_USER_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        error: '',
        user: action.payload
      };
    case RESET_SIGNUP_ERROR:
      return { 
        ...state,
        error: ''
      };
    case REGISTER_USER_ERROR:
      return { 
        ...state,
        isFetching: false,
        error: action.payload
      };
    /* DEFAULT CASE */
    default: return { ...state };
  }
}