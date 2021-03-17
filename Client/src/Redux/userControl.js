import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './actions/userDataActions';
import { getGuest } from './../Database/Airtable';
import { FETCH_USER_DATA } from './../Redux/actions/types';
import store from './store';
export default function Guest() {
	if (store.getState()?.airTableData?.guest) return true;
	return false;
}
// export function Doctor() {
// 	const [isDoctor, setDoctor] = useState(false);
// 	const dispatch = useDispatch();
// 	const userData = useSelector((state) => state.airTableData.userData);
// 	if (userData === 'unauthorized') setDoctor(true);
// 	return isDoctor;
// }

export async function GuestSetter(token) {
	store.dispatch({
		type: 'GUEST',
		data: token,
	});
	const resGetGuest = await getGuest(token);
	if (!resGetGuest.id) return false;
	store.dispatch({
		type: 'GUEST',
		data: token,
	});
	return false;
}
