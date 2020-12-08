import keyMirror from 'keymirror';
import axios from 'axios';
import { APP_ACTIONS } from 'state/actions';
import { STATUS } from 'utils';

export const REPORT_ACTIONS = keyMirror({
	DELETE_REPORT: null,
	FETCH_REPORTS: null,
	POST_REPORT: null,
	UPDATE_REPORT: null
});

export const REPORT_ACTIONS_FAILURE = keyMirror({
	DELETE_REPORT_FAILURE: null,
	FETCH_REPORTS_FAILURE: null,
	POST_REPORT_FAILURE: null,
	UPDATE_REPORT_FAILURE: null
});

export const fetchReports = () => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/report/`;
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
							type: REPORT_ACTIONS.FETCH_REPORTS,
							reports: resp.data,
							path
						})
					);
				})
				.catch((err) => {
					reject(
						dispatch({
							type: REPORT_ACTIONS_FAILURE.FETCH_REPORTS_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const postReport = (data) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/report/`;
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.append('bp', data.bp);
			formData.append('temperature', data.temperature);
			formData.append('bmi', data.bmi);
			formData.append('pulse', data.pulse);
			formData.append('weight', data.weight);
			formData.append('respiration', data.respiration);
			formData.append('height', data.height);
			formData.append('oxygen_saturation', data.oxygen_saturation);
			if (data.file) formData.append('reportfile', data.file);
			formData.append('user_id', data.user_id);
			axios
				.post(path, formData, {
					headers: {
						Authorization: `Token ${token}`
					}
				})
				.then((resp) => {
					dispatch(fetchReports());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Done! We uploaded that for you.',
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: REPORT_ACTIONS.POST_REPORT,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Whoops! There was an issue uploading that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: REPORT_ACTIONS_FAILURE.POST_REPORT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const deleteReport = (report_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/report/${report_id}/`;
		return new Promise((resolve, reject) => {
			axios
				.delete(path, {
					headers: {
						Authorization: `Token ${token}`
					}
				})
				.then((resp) => {
					dispatch(fetchReports());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Done! We deleted that for you.',
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: REPORT_ACTIONS.DELETE_REPORT,
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
							type: REPORT_ACTIONS_FAILURE.DELETE_REPORT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const updateReport = (data, report_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/blog/${report_id}/`;
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
					dispatch(fetchReports());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Done! We updated that for you.',
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: REPORT_ACTIONS.UPDATE_REPORT,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message:
							'Whoops! An error occurred while updating that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: REPORT_ACTIONS_FAILURE.UPDATE_REPORT_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};
