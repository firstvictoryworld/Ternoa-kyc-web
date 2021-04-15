import { handleActions } from 'redux-actions';
import {
    loginUserSuccess,
    loginUserFailure,
    logoutUserSuccess,
    loginUserRequestInit,
    loginStatusSuccess,
    loginStatusFailure,
    resetLoginError
} from '../actions';
import {
  verficationError
} from '../actions'

const defaultState = {
  isLogged: (localStorage.getItem('kyc_token') !== 'null' && localStorage.getItem('kyc_token') !== null ) ? true : false,
  isFetching: false,
  error: '',
  token: null,
  user: null,
  checkingUserStatus: false,
};

export default handleActions(
  {
    [loginUserRequestInit](state, { payload }) {
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    },
    [loginUserSuccess](state, { payload }) {
      return {
        ...state,
        isLogged: true,
        token: payload.accessToken,
        isFetching: false,
        error: '',
        user: payload
      };
    },
    [loginUserFailure](state, { payload }) {
        // console.log(payload)
      return {
        ...state,
        isLogged: false,
        isFetching: false,
        token: null,
        error: payload
      };
    },
    [loginStatusSuccess](state, { payload }) {
      return {
        ...state,
        isLogged: true,
        isFetching: false,
        checkingUserStatus: true,
        token: payload.accessToken,
        error: null,
        user: payload
      };
    },
    [loginStatusFailure](state, { payload }) {
      return {
        ...state,
        isLogged: false,
        isFetching: false,
        checkingUserStatus: true,
        token: null,
        error: null,
        user: null
      };
    },
    [logoutUserSuccess](state, { payload }) {
      return {
        ...state,
        isLogged: false,
        token: null,
        isFetching: false,
        error: '',
        user: null
      };
    },
    [verficationError](state, { payload }) {
      return {
        ...state,
        error: payload
      };
    },
    [resetLoginError](state, { payload }) {
      return {
        ...state,
        error: ''
      };
    }
  },
  defaultState,
);

