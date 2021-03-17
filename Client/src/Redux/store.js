import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware)
		// ,
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;

//import { useDispatch,useSelector } from 'react-redux'
//const dispatch = useDispatch()
//dispatch({type:XXX,variable:YYY});
//dispatch(asyncFunction());
//const userData = useSelector(state => state.airTableData.userData)
