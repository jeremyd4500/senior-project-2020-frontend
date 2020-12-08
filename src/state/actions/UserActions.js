import keyMirror from 'keymirror';
import axios from 'axios';
import { APP_ACTIONS } from 'state/actions';
import { STATUS, PATHS } from 'utils';

export const USER_ACTIONS = keyMirror({
	AUTHENTICATE: null,
	FETCH_TOKEN: null,
	FETCH_USER_INFO: null,
	FETCH_USERS: null,
	LOGOUT: null,
	REGISTER: null,
	UPDATE_USER: null
});

export const USER_ACTIONS_FAILURE = keyMirror({
	AUTHENTICATE_FAILURE: null,
	FETCH_TOKEN_FAILURE: null,
	FETCH_USER_INFO_FAILURE: null,
	FETCH_USERS_FAILURE: null,
	LOGOUT_FAILURE: null,
	REGISTER_FAILURE: null,
	UPDATE_USER_FAILURE: null
});

export const authenticateUser = (data, navigateFunc) => {
	const path = 'http://localhost:8000/auth/token/login/';
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			axios
				.post(path, data)
				.then((resp) => {
					localStorage.setItem('token', resp.data.auth_token);
					dispatch({
						type: USER_ACTIONS.AUTHENTICATE,
						token: resp.data.auth_token,
						authenticated: true,
						path
					});
					resolve(navigateFunc(PATHS.home));
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Incorrect username or password.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.AUTHENTICATE_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const logout = (navigateFunc) => {
	const path = 'http://localhost:8000/auth/token/logout/';
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		return new Promise((resolve, reject) => {
			axios
				.post(
					path,
					{},
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				.then(() => {
					localStorage.removeItem('token');
					dispatch({
						type: USER_ACTIONS.LOGOUT
					});
					resolve(navigateFunc(PATHS.login));
				})
				.catch((err) => {
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.LOGOUT_FAILURE,
							error: err
						})
					);
				});
		}).catch((err) => {});
	};
};

export const registerUser = (data, navigateFunc) => {
	const path = 'http://localhost:8000/auth/users/';
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			axios
				.post(path, data)
				.then(() => {
					dispatch({
						type: USER_ACTIONS.REGISTER,
						data: data,
						path
					});
					resolve(navigateFunc(PATHS.login));
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message:
							'Sorry! There was an error creating your account.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.REGISTER_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const fetchToken = () => {
	return (dispatch, getStore) => {
		return new Promise((resolve, reject) => {
			const token = localStorage.getItem('token');
			const stateToken = getStore().user.token;
			if (token === stateToken) {
				resolve(
					dispatch({
						type: USER_ACTIONS.FETCH_TOKEN,
						token: stateToken
					})
				);
			} else {
				if (token) {
					resolve(
						dispatch({
							type: USER_ACTIONS.FETCH_TOKEN,
							token: token
						})
					);
				} else {
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.FETCH_TOKEN_FAILURE
						})
					);
				}
			}
		});
	};
};

export const fetchUserInfo = () => {
	const path = 'http://localhost:8000/auth/users/me/';
	return (dispatch, getStore) => {
		const { token } = getStore().user;
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
							type: USER_ACTIONS.FETCH_USER_INFO,
							authenticated: true,
							info: {
								address: resp.data.address,
								city: resp.data.city,
								dob: resp.data.date_of_birth,
								email: resp.data.email,
								first_name: resp.data.first_name,
								id: resp.data.id,
								last_name: resp.data.last_name,
								phone: resp.data.phone,
								role: resp.data.user_role,
								sex: resp.data.sex,
								state: resp.data.state,
								username: resp.data.username
							},
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Sorry! We are unable to fetch your account.',
						clears: true,
						status: STATUS.WARNING,
						path
					});
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.FETCH_USER_INFO_FAILURE,
							error: err.message,
							authenticated: false,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const fetchUsers = (role, append = false) => {
	const path = `http://localhost:8000/auth/roles/?user_role=${role}`;
	return (dispatch, getStore) => {
		const { token } = getStore().user;
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
							type: USER_ACTIONS.FETCH_USERS,
							append: append,
							users: resp.data,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Sorry! There was an issue fetching users.',
						clears: true,
						status: STATUS.WARNING,
						path
					});
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.FETCH_USERS_FAILURE,
							error: err.message,
							authenticated: false,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const updateUser = (data) => {
	const path = 'http://localhost:8000/auth/users/me/';
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		return new Promise((resolve, reject) => {
			axios
				.put(
					path,
					{ ...data },
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				.then((resp) => {
					dispatch(fetchUserInfo());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: "Done! We've updated your information.",
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: USER_ACTIONS.UPDATE_USER,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message:
							'Sorry! We are unable to update your information.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: USER_ACTIONS_FAILURE.UPDATE_USER_FAILURE,
							error: err.message,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};
