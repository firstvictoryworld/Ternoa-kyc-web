import { handleActions } from 'redux-actions';
import {
  showLoaderSuccess,
  hideLoaderSuccess
} from './actions';

const defaultState = {
  isFetching: false,
};

export default handleActions(
  {
    [showLoaderSuccess](state, { payload }) {
      return {
        ...state,
        isFetching: true,
      };
    },
    [hideLoaderSuccess](state, { payload }) {
      return {
        ...state,
        isFetching: false,
      };
    }
  },
  defaultState,
);