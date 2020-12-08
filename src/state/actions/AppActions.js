import keyMirror from 'keymirror';
import { STATUS } from 'utils';

export const APP_ACTIONS = keyMirror({
	ALERT_ADD: null,
	ALERT_CLEAR: null,
	APP_NAVIGATE: null,
	LOGIN: null,
	SET_STATUS: null,
	WINDOW_RESIZE: null
});

export const appNavigate = (path, router, options) => {
	if (router && router.location.pathname !== path) {
		router.push(path);
	}
	return (dispatch) => {
		return dispatch({
			type: APP_ACTIONS.APP_NAVIGATE,
			path: path,
			options: options,
			status: STATUS.SUCCESS
		});
	};
};

// export const addAppAlert = (alertType, clears, status, message) => {
// 	return (dispatch) => {
// 		dispatch({
// 			type: APP_ACTIONS.ALERT_ADD,
// 			alert: alertType,
// 			status: status,
// 			clears: clears,
// 			message: message
// 		});
// 		return Promise.resolve();
// 	};
// };

export const clearAlert = (alertType) => {
	return (dispatch) => {
		dispatch({
			type: APP_ACTIONS.ALERT_CLEAR,
			alert: alertType
		});
		return Promise.resolve();
	};
};

export const cancelToast = () => {
	return {
		type: 'ALERT_ADD',
		alert: 'APP',
		status: STATUS.WARNING,
		clears: true,
		message: "No worries! We didn't save your changes."
	};
};

export const resolveStatus = () => {
	return {
		type: APP_ACTIONS.SET_STATUS,
		status: null
	};
};

export const setStatus = (status) => {
	return {
		type: APP_ACTIONS.SET_STATUS,
		status
	};
};

export const windowResize = (height, width) => {
	return (dispatch) => {
		return dispatch({
			type: APP_ACTIONS.WINDOW_RESIZE,
			height: height,
			width: width
		});
	};
};
