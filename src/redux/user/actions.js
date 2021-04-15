import { createAction } from 'redux-actions';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  updateUserPasswordApi, validateUserApi, passwordRecoveryApi, addMetamaskAddress, updateUserProfile, createUserRequest, checkKycStatus } from '../../services/api';
import { showLoader, hideLoader, loginUser, getMe, loginUserSuccess } from '../actions';
// import { 
	// REGISTER_USER_INIT,
	// REGISTER_USER_SUCCESS,
	// REGISTER_USER_ERROR,
	// ADD_METAMASK_ADDRESS 
// } from '../actions';


export const fetchUserProfileRequest = createAction('FETCH_USER_PROFILE_REQUEST');
export const fetchUserProfileSuccess = createAction('FETCH_USER_PROFILE_SUCCESS');
export const fetchUserProfileFailure = createAction('FETCH_USER_PROFILE_FAILURE');

export const checkKycStatusRequest = createAction('CHECK_KYC_REQUEST');
export const checkKycStatusSuccess = createAction('CHECK_KYC_STATUS_SUCCESS');
export const checkKycStatusFailure = createAction('CHECK_KYC_STATUS_FAILURE');

export const updateUserProfileRequest = createAction('UPDATE_USER_PROFILE_REQUEST');
export const updateUserProfileSuccess = createAction('UPDATE_USER_PROFILE_SUCCESS');
export const updateUserProfileFailure = createAction('UPDATE_USER_PROFILE_FAILURE');

export const registerUserError = createAction('REGISTER_USER_ERROR');
export const verficationError = createAction('VERIFICATION_ERROR');

export const createUserAccount = (payload, history) => async (dispatch) => {
	try {
		payload.username = payload.email;
		payload.status = 'CREATED';
		// console.log(payload);		
		dispatch(showLoader());
		const response = await createUserRequest(payload);
		if (response) {
			// console.log(response);
			history.push('/log_in')
			dispatch(loginUser({ email: payload.email , password: payload.password}, history));
		} else {
			// console.log(response)
		}
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
		if(error) {
			error.json().then(json => dispatch(registerUserError(json.message)))	
		}
    	throw error;
	}
}

export const checkKyc = () => async (dispatch) => {
  try {  
    // dispatch(fetchUserProfileRequest())
    dispatch(showLoader());
    // const response = await checkKycStatus();
    await checkKycStatus();
    dispatch(hideLoader());
    // console.log(response);
    // dispatch(fetchUserProfileSuccess(response));
  } catch (error) {
  	dispatch(hideLoader());
    // dispatch(fetchUserProfileFailure(error));
    throw error;
  }
};

// export const fetchUserProfile = (payload, history) => async (dispatch) => {
//   try {  
//     dispatch(fetchUserProfileRequest())
//     const response = await getUserProfile(payload);
//     dispatch(fetchUserProfileSuccess(response));
//   } catch (error) {
//     dispatch(fetchUserProfileFailure(error));
//     throw error;
//   }
// };

export const passwordRecoverAction = (payload, history) => async (dispatch) => {
	try {
		dispatch(showLoader());
		await passwordRecoveryApi(payload);
		// const response = await passwordRecoveryApi(payload);
		// console.log(response)
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
    	throw error;
	}
}

export const updateUserPassword = (payload, history) => async (dispatch) => {
	try {
		dispatch(showLoader());
		await updateUserPasswordApi(payload);
		// const response = await updateUserPasswordApi(payload);
		// console.log(response)
		dispatch(hideLoader());
	} catch (error) {
		dispatch(hideLoader());
    	throw error;
	}
}

export const verifyUserByPin = (payload, history) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await validateUserApi(payload);
		// console.log(response)
		if(response) {
			dispatch(loginUserSuccess(response));	
			if(response.validated) {
				history.push('/merci'); 
			}
		}
		dispatch(hideLoader());
		
		// if (response) {
		// 	dispatch(getMe());
		// }
	} catch (error) {
		dispatch(hideLoader());
		dispatch(verficationError('Invalid pin'))
    	throw error;
	}
}

export const updateUserAccount = (payload, history) => async (dispatch) => {
	try {
		dispatch(updateUserProfileRequest())
		const response = await updateUserProfile(payload);
		// console.log(response)
		if (response) {
			dispatch(getMe());
		} else {
			// dispatch(hideLoader())
			// dispatch(updateUserProfileFailure('error'));
		}
	} catch (error) {
		// dispatch(hideLoader())
		// dispatch(updateUserProfileFailure('error'));
    	throw error;
	}
}


export const addMetamaskAddressAction = (payload, history) => async (dispatch) => {
	try {
		let address = payload.address.toLowerCase();
		let params = {
			address: address
		}
		await addMetamaskAddress(address);
		// await addMetamaskAddress(payload);
		// const response = await addMetamaskAddress(payload);
		// console.log(response)
	} catch (error) {
		// dispatch(hideLoader())
		// dispatch(updateUserProfileFailure('error'));
    	throw error;
	}
}

