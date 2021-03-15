import {
	FETCH_USER_DATA,
	FETCH_REMINDERS_DATA,
	FETCH_APPOINTMENTS_DATA,
	FETCH_NOTIFICATION_DATA,
	FETCH_MEDICAL_EXPENSES_DATA,
	FETCH_SYMPTOM_DATA,
	FETCH_DOCTORS_DATA,
	FETCH_MEDICAL_CASE,
	NEW_DATA,
	UPDATE_DATA,
	DELETE_DATA,
	FETCH_DATA,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GUEST':
			return {
				...state,
				guest: action.data,
			};
		case FETCH_DATA: {
			let obj = {};
			obj[action.dataTable] = action.data;
			return {
				...state,
				...obj,
			};
		}
		case FETCH_USER_DATA:
			return {
				...state,
				userData: action.data,
			};
		case FETCH_REMINDERS_DATA:
			return {
				...state,
				Reminders: action.reminders,
			};
		case FETCH_APPOINTMENTS_DATA:
			return {
				...state,
				Appointments: action.appointments,
			};
		case FETCH_NOTIFICATION_DATA:
			return {
				...state,
				Notification: action.notification,
			};
		case FETCH_MEDICAL_EXPENSES_DATA:
			return {
				...state,
				'Medical expenses': action.medicalExpenses,
			};
		case FETCH_SYMPTOM_DATA:
			return {
				...state,
				Symptom: action.symptom,
			};
		case FETCH_DOCTORS_DATA:
			return {
				...state,
				Doctors: action.doctors,
			};
		case FETCH_MEDICAL_CASE:
			return {
				...state,
				'Medical Case': action.data,
			};
		case NEW_DATA:
			let newDataUpdate = {};
			newDataUpdate[action.table] = state[action.table]
				? [...state[action.table], action.newData]
				: [action.newData];
			return {
				...state,
				...newDataUpdate,
			};
		case UPDATE_DATA:
			const newRowUpdate = {};
			const newState = state[action.table].map((x) => {
				if (x.id === action.newData.id) {
					return action.newData;
				}
				return x;
			});
			newRowUpdate[action.table] = newState;
			return {
				...state,
				...newRowUpdate,
			};
		case DELETE_DATA:
			const newRowDeleteUpdate = {};
			const newDeleteState = state[action.table].filter((x) => {
				return x.id !== action.id;
			});
			newRowDeleteUpdate[action.table] = newDeleteState;
			return {
				...state,
				...newRowDeleteUpdate,
			};
		default:
			return state;
	}
}
