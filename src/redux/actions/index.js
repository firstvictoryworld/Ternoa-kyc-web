import { createAction } from 'redux-actions';

 /////////////////////////////////
 //		       AUTH   		   //
/////////////////////////////////
// export const LOGIN_USER = "LOGIN_USER";
// export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
// export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const REGISTER_USER_INIT = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const RESET_SIGNUP_ERROR = "RESET_SIGNUP_ERROR"

export const ADD_METAMASK_ADDRESS = "ADD_METAMASK_ADDRESS";

export const VERIFICATION_ERROR = "VERIFICATION_ERROR";

export const loginUserRequestInit = createAction('LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS');
export const loginUserFailure = createAction('LOGIN_USER_FAILURE');

export const loginStatusRequestInit = createAction('LOGIN_STATUS_REQUEST');
export const loginStatusSuccess = createAction('LOGIN_STATUS_SUCCESS');
export const loginStatusFailure = createAction('LOGIN_STATUS_FAILURE');

export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');

export const resetLoginError = createAction('RESET_LOGIN_ERROR');
export const resetSignupError = createAction('RESET_SIGNUP_ERROR');


// Export all actions
export * from '../global/actions';
export * from '../auth/actions';
export * from '../user/actions';
