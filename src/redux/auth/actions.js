// import { createAction } from 'redux-actions';
import { 
  loginUserRequest, 
  initToken, 
  getUserProfile,
} from '../../services/api';

import { loginUserRequestInit, loginUserSuccess, loginUserFailure, loginStatusSuccess, loginStatusFailure, logoutUserSuccess, showLoader, hideLoader } from '../actions';


// export const loginUserRequestInit = createAction('LOGIN_USER_REQUEST');
// export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS');
// export const loginUserFailure = createAction('LOGIN_USER_FAILURE');

// export const loginStatusRequestInit = createAction('LOGIN_STATUS_REQUEST');
// export const loginStatusSuccess = createAction('LOGIN_STATUS_SUCCESS');
// export const loginStatusFailure = createAction('LOGIN_STATUS_FAILURE');

// export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');

export const loginUser = (cred, history) => async (dispatch) => {
  try {  
    cred.username = cred.email;
    dispatch(showLoader());
    dispatch(loginUserRequestInit());
    const response = await loginUserRequest(cred);
    if(response) {
      dispatch(hideLoader());
      initToken(response.accessToken);
      localStorage.setItem("kyc_token", response.accessToken);
      dispatch(loginUserSuccess(response));
      if(response.validated) {
        setTimeout(function(){
          history.push('/merci');    
        }, 2000);  
      }
    } else {
      // dispatch(loginUserFailure());  
      dispatch(hideLoader());
    }
  } catch (error) {
    // console.log(error)
    dispatch(hideLoader());
    if(error) {
      error.json().then(json => dispatch(loginUserFailure(json.message)))  
    }
    throw error;
  }
};

export const logoutUser = (history) => (dispatch) => {
  try {  
    localStorage.setItem("kyc_token", null);
    dispatch(logoutUserSuccess());
    // initToken(null);
    history.push('/log_in');
  } catch (error) {
    throw error;
  }
};

export const loginStatus = (history) => async (dispatch) => {
  try {  
    dispatch(showLoader());
    const response = await getUserProfile();
    // console.log('onCheckLoginStatus', response)
    dispatch(loginStatusSuccess(response));
    dispatch(hideLoader());
    // if(response.validated && (window.location.pathname == '/' || window.location.pathname == '/log_in' || window.location.pathname == '/sign_up')) {
    //     console.log('in push')
    //     history.push('/merci');
    // }
  } catch (error) {
    dispatch(hideLoader());
    if(error && error.status === 401 ) {
      dispatch(logoutUser(history));
    }
    // dispatch(loginStatusFailure());
  }
};

export const getMe = (history) => async (dispatch) => {
  try {  
    dispatch(showLoader());
    const response = await getUserProfile();
    // console.log('onCheckLoginStatus', response)
    dispatch(loginStatusSuccess(response));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    if(error && error.status === 401 ) {
      dispatch(logoutUser(history));
    }
    dispatch(loginStatusFailure());
  }
};