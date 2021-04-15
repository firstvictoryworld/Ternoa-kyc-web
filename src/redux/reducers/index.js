import { combineReducers } from 'redux';


import Auth from '../auth/reducer';
import User from '../user/reducer';
import Globals from '../global/reducer';

const reducers = combineReducers({
    auth: Auth,
    userReducer: User,
    global: Globals
  });

export default reducers;