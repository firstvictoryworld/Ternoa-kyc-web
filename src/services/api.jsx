import { handleError, verifyResponse } from './utils';
import config from '../config'

const BASE_URL = config.BASE_URL;

const headers = new Headers({
  'Content-Type': 'application/json',
  'x-access-token': (localStorage.getItem('kyc_token') !== 'null') ? localStorage.getItem('kyc_token') : '',
  // 'Authorization': (localStorage.getItem('kyc_token') !== 'null') ? 'Bearer '+ localStorage.getItem('kyc_token') : ''
});

export const initToken = (token) => {
  headers.set('x-access-token', `${token}`);
  // headers.set('Authorization', `Bearer ${token}`);
};

//    POST, PUT, GET, DELETE METHODS    //

const POST = (endpoint, body) =>
  fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then(verifyResponse);

const PUT = (endpoint, body) =>
  fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then(verifyResponse);

const GET = endpoint =>
  fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: headers,
  }).then(verifyResponse);

// const DELETE = endpoint =>
//   fetch(`${BASE_URL}${endpoint}`, {
//     method: 'DELETE',
//     headers: headers,
//   }).then(verifyResponse);


//  APIs End Points //
/* Create USER */
export const createUserRequest = body =>
  POST('/auth/signup', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);

/* LOGIN USER */
export const loginUserRequest = body =>
  POST('/auth/signin', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);

/* GET USER Profile */
export const getUserProfile = () =>
  GET(`/user/getLoggedUser`)
    .then(response => response.json())
    .catch(handleError);

/* UPDATE USER  */
export const updateUserProfile = body =>
  PUT('/user/updateDetails', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);

export const checkKycStatus = () =>
  GET(`/test/user`)
    .then(response => response.json())
    .catch(handleError);

/* Validate user api*/
export const validateUserApi = body =>
  POST('/auth/verifyPin', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);

/* Add USER metamask address */
export const addMetamaskAddress = body =>
  POST('/user/addAddress', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);

export const updateUserPasswordApi = body => 
  PUT('/admin/updatePassword', {
      ...body,
    })
      .then(response => response.json())
      .catch(handleError);

/* Send password recovery request */
export const passwordRecoveryApi = body =>
  POST('/auth/passwordRecovery', {
    ...body,
  })
    .then(response => response.json())
    .catch(handleError);