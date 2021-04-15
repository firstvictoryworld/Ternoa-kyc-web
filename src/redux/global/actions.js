import { createAction } from 'redux-actions';

export const showLoaderSuccess = createAction('SHOW_LOADER_SUCCESS');
export const hideLoaderSuccess = createAction('HIDE_LOADER_SUCCESS');


export const showLoader = () => async (dispatch) => {
  try {
    dispatch(showLoaderSuccess());
  } catch (error) {
    throw error;
  }
};

export const hideLoader = () => async (dispatch) => {
  try {
    dispatch(hideLoaderSuccess());
  } catch (error) {
    throw error;
  }
};