// root_reducer.js

import { combineReducers } from 'redux';
import eventReducer from './event_reducer';
import calReducer from './cal_reducer';

export default combineReducers({
	event: eventReducer,
	// calendar: calReducer

})