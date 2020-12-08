import { USER_ACTIONS, USER_ACTIONS_FAILURE } from 'state/actions';
import { assign } from 'lodash';

const initReducer = {
	authenticated: false,
	info: {},
	token: null,
	users: []
};

const UserReducer = (state = initReducer, action) => {
	switch (action.type) {
		case USER_ACTIONS.AUTHENTICATE: {
			return assign({}, state, {
				authenticated: action.authenticated,
				token: action.token
			});
		}
		case USER_ACTIONS.LOGOUT: {
			return initReducer;
		}
		case USER_ACTIONS.FETCH_TOKEN: {
			return assign({}, state, {
				token: action.token
			});
		}
		case USER_ACTIONS.FETCH_USER_INFO: {
			return assign({}, state, {
				authenticated: action.authenticated,
				info: {
					...action.info
				}
			});
		}
		case USER_ACTIONS.AUTHENTICATE: {
			return assign({}, state, {
				authenticated: action.authenticated
			});
		}
		case USER_ACTIONS.FETCH_USERS: {
			if (action.append) {
				return assign({}, state, {
					users: [...state.users, ...action.users]
				});
			} else {
				return assign({}, state, {
					users: action.users
				});
			}
		}
		case USER_ACTIONS_FAILURE.FETCH_USER_INFO_FAILURE: {
			return initReducer;
		}
		case USER_ACTIONS.LOGOUT: {
			return initReducer;
		}
		default:
			return state;
	}
};

export default UserReducer;
