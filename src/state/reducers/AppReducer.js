import { assign } from 'lodash';
import { APP_ACTIONS } from 'state/actions';

const initReducer = {
	alert: {},
	form: {},
	height: null,
	status: null,
	width: null
};

const AppReducer = (state = initReducer, action) => {
	switch (action.type) {
		case APP_ACTIONS.SET_STATUS: {
			return assign({}, state, {
				status: action.status
			});
		}
		case APP_ACTIONS.APP_NAVIGATE: {
			if (action.options && action.options.type) {
				return assign({}, state, {
					form: {
						...state.form,
						[action.options.type]: {
							data: action.options.data
						}
					}
				});
			} else {
				return state;
			}
		}
		case APP_ACTIONS.ALERT_ADD: {
			return assign({}, state, {
				alert: {
					[action.alert]: {
						type: action.alert,
						message: action.message,
						status: action.status,
						clears: action.clears
					}
				}
			});
		}
		case APP_ACTIONS.ALERT_CLEAR: {
			return assign({}, state, {
				alert: initReducer.alert
			});
		}
		case APP_ACTIONS.WINDOW_RESIZE: {
			return assign({}, state, {
				height: action.height,
				width: action.width
			});
		}
		default:
			return state;
	}
};

export default AppReducer;
