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
} from "./types";
import { airTableData, airTableDoctors } from "../../Database/Airtable";

export const fetchData = (table) => (dispatch) => {
  airTableData(table).then((userData) => {
    dispatch({
      type: FETCH_DATA,
      data: userData,
      dataTable: table,
    });
  });
};

export const fetchUserData = () => (dispatch) => {
  airTableData("Users").then((userData) => {
    dispatch({
      type: FETCH_USER_DATA,
      data: userData,
    });
  });
};

export const fetchMedicalCase = () => (dispatch) => {
  airTableData("Medical Case").then((userData) => {
    // userData = formatingMap("Medical Case")(userData);
    // Data formatting
    dispatch({
      type: FETCH_MEDICAL_CASE,
      data: userData,
    });
  });
};

export const fetchRemindersData = () => (dispatch) => {
  airTableData("Reminders").then((userData) => {
    // Data formatting
    //  userData = formatingMap("Reminders")(userData);
    dispatch({
      type: FETCH_REMINDERS_DATA,
      reminders: userData,
    });
  });
};

export const fetchAppointmentsData = () => (dispatch) => {
  airTableData("Appointments").then((userData) => {
    // Data formatting
    //  userData = formatingMap("Appointments")(userData);
    dispatch({
      type: FETCH_APPOINTMENTS_DATA,
      appointments: userData,
    });
  });
};

export const fetchNotificationData = () => (dispatch) => {
  airTableData("notification").then((userData) =>
    dispatch({
      type: FETCH_NOTIFICATION_DATA,
      notification: userData,
    })
  );
};

export const fetchMedicalExpensesData = () => (dispatch) => {
  airTableData("Medical expenses").then((userData) =>
    dispatch({
      type: FETCH_MEDICAL_EXPENSES_DATA,
      medicalExpenses: userData,
    })
  );
};

export const fetchSymptomData = () => (dispatch) => {
  airTableData("Symptom").then((userData) => {
    // Data formatting
    //  userData = formatingMap("Symptom")(userData);
    dispatch({
      type: FETCH_SYMPTOM_DATA,
      symptom: userData,
    });
  });
};

export const fetchDoctorsData = () => (dispatch) => {
  airTableDoctors().then((Data) =>
    dispatch({
      type: FETCH_DOCTORS_DATA,
      doctors: Data,
    })
  );
};

export const createData = (table, body) => {
  // Data formatting
  // const [bodyData] = formatingMap(table)([body]);
  return {
    type: NEW_DATA,
    newData: body,
    table,
  };
};

export const reduxUpdateData = (table, body) => {
  return {
    type: UPDATE_DATA,
    newData: body,
    table,
  };
};

export const reduxDeleteData = (table, id) => {
  return {
    type: DELETE_DATA,
    id,
    table,
  };
};
