import { userConstants } from './constants';
import { firestore } from 'firebase/app';
import { useEffect } from 'react';

export const getRealTimeUsers = () => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` })
    const db = firestore();
    db.collection("users")
      //.where("state", "==", "CA")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        console.log(users);
      });
  }
}