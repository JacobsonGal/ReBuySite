import { UPDATE_SNACKBAR, ADD_SHERE } from '../actions/types';

const initialState = {
	snackbar: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case UPDATE_SNACKBAR:
			return {
				...state,
				snackbar: action.snackbarType,
			};
			break;
		case ADD_SHERE:
			return {
				...state,
				addShere: action.dataArr,
			};

		default:
			return state;
	}
}
