import keyMirror from 'keymirror';
import axios from 'axios';
import { APP_ACTIONS } from 'state/actions';
import { STATUS } from 'utils';

export const BLOG_ACTIONS = keyMirror({
	DELETE_BLOG: null,
	FETCH_BLOGS: null,
	POST_BLOG: null,
	UPDATE_BLOG: null
});

export const BLOG_ACTIONS_FAILURE = keyMirror({
	DELETE_BLOG_FAILURE: null,
	FETCH_BLOGS_FAILURE: null,
	POST_BLOG_FAILURE: null,
	UPDATE_BLOG_FAILURE: null
});

export const fetchBlogs = () => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/blog/`;
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
							type: BLOG_ACTIONS.FETCH_BLOGS,
							blogs: resp.data,
							path
						})
					);
				})
				.catch((err) => {
					reject(
						dispatch({
							type: BLOG_ACTIONS_FAILURE.FETCH_BLOGS_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const postBlog = (data) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const makeID = (length) => {
			let result = '';
			const characters =
				'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			const charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			return result;
		};
		const path = `http://localhost:8000/blog/`;
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.append('title', data.title),
				formData.append('slug', makeID(10)),
				formData.append('content', data.content),
				formData.append('videofile', data.videoFile),
				formData.append('status', 1),
				formData.append('author', data.author);

			axios
				.post(path, formData, {
					headers: {
						Authorization: `Token ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					dispatch(fetchBlogs());
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Done! We posted that for you.',
						clears: true,
						status: STATUS.SUCCESS,
						path
					});
					resolve(
						dispatch({
							type: BLOG_ACTIONS.POST_BLOG,
							path
						})
					);
				})
				.catch((err) => {
					dispatch({
						type: APP_ACTIONS.ALERT_ADD,
						alert: 'APP',
						message: 'Whoops! There was an issue posting that.',
						clears: true,
						status: STATUS.ERROR,
						path
					});
					reject(
						dispatch({
							type: BLOG_ACTIONS_FAILURE.POST_BLOG_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const deleteBlog = (blog_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/blog/${blog_id}/`;
		return new Promise((resolve, reject) => {
			axios
				.delete(path, {
					headers: {
						Authorization: `Token ${token}`
					}
				})
				.then((resp) => {
					dispatch(fetchBlogs());
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
							type: BLOG_ACTIONS.DELETE_BLOG,
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
							type: BLOG_ACTIONS_FAILURE.DELETE_BLOG_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};

export const updateBlog = (data, blog_id) => {
	return (dispatch, getStore) => {
		const { token } = getStore().user;
		const path = `http://localhost:8000/blog/${blog_id}/`;
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
					dispatch(fetchBlogs());
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
							type: BLOG_ACTIONS.UPDATE_BLOG,
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
							type: BLOG_ACTIONS_FAILURE.UPDATE_BLOG_FAILURE,
							error: err,
							path
						})
					);
				});
		}).catch((err) => {});
	};
};
