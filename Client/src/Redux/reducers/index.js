import { combineReducers } from 'redux';
import userReducer from './userReducer';
import generalReducer from './generalRaducer';

export default combineReducers({
	airTableData: userReducer,
	general: generalReducer,
});
