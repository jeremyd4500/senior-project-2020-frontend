import keyMirror from 'keymirror';
import axios from 'axios';
import moment from 'moment';
import { APP_ACTIONS } from 'state/actions';
import { STATUS } from 'utils';

export const APPOINTMENT_ACTIONS = keyMirror({
	DELETE_APPOINTMENT: null,
	FETCH_APPOINTMENTS: null,
	POST_APPOINTMENT: null,
	UPDATE_APPOINTMENT: null
});

export const APPOINTMENT_ACTIONS_FAILURE = keyMirror({
	DELETE_APPOINTMENT_FAILURE: null,
	FETCH_APPOINTMENTS_FAILURE: null,
	POST_APPOINTMENT_FAILURE: null,
	UPDATE_APPOINTMENT_FAILURE: null
});

export const fetchAppointments = () => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/appointment/`;
		return new Promise((resolve, reject) => {
			axios
				.get(path, {
					headers: {
						Authorization: `Token ${token}`
					}
				})
				.then((resp) => {
					resolve(
						dispatch({
							type: APPOINTMENT_ACTIONS.FETCH_APPOINTMENTS,
							appointments: resp.data,
							path
						})
					);
				})
				.catch((err) => {
					reject(
						dispatch({
							type:
								APPOINTMENT_ACTIONS_FAILURE.FETCH_APPOINTMENTS_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const postAppointment = (data) => {
	return (dispatch, getStore) => {
		const {
			info: { dob, email, first_name, id, last_name, sex },
			token
		} = getStore().user;

		const getAge = () => {
			const now = new Date();
			const today = moment([
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			]);
			const splitDOB = dob.split('-');
			const old = moment([splitDOB[0], splitDOB[1], splitDOB[2]]);
			return today.diff(old, 'years');
		};

		const path = `http://localhost:8000/appointment/`;
		return new Promise((resolve, reject) => {
			axios
				.post(
					path,
					{
						age: getAge(),
						appointment_date: data.appointment_date,
						email: email,
						gender: sex,
						time: data.time,
						description: data.description,
						first_name: first_name,
						last_name: last_name,
						user_id: id,
						status: 0
					},
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				.then((resp) => {
					dispatch(fetchAppointments());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: "Done! We've scheduled that for you.",
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: APPOINTMENT_ACTIONS.POST_APPOINTMENT,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Oops! There was a problem scheduling that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type:
								APPOINTMENT_ACTIONS_FAILURE.POST_APPOINTMENT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const deleteAppointment = (appointment_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/appointment/${appointment_id}`;
		return new Promise((resolve, reject) => {
			axios
				.delete(path, {
					headers: {
						Authorization: `Token ${token}`
					}
				})
				.then((resp) => {
					dispatch(fetchAppointments());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: "Done! We've deleted that for you.",
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: APPOINTMENT_ACTIONS.DELETE_APPOINTMENT,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Uh oh! There was a problem deleting that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type:
								APPOINTMENT_ACTIONS_FAILURE.DELETE_APPOINTMENT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const updateAppointment = (data, appointment_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/appointment/${appointment_id}`;
		return new Promise((resolve, reject) => {
			axios
				.put(
					path,
					{
						...data
					},
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				.then((resp) => {
					dispatch(fetchAppointments());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: "Done! We've updated that for you.",
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: APPOINTMENT_ACTIONS.UPDATE_APPOINTMENT,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Oops! There was a problem updating that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type:
								APPOINTMENT_ACTIONS_FAILURE.UPDATE_APPOINTMENT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};
