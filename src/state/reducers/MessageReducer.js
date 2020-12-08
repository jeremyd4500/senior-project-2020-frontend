import { MESSAGE_ACTIONS, MESSAGE_ACTIONS_FAILURE } from 'state/actions';
import { assign } from 'lodash';

const initReducer = {
	current_thread_id: null,
	messages: {},
	thread_messages: {},
	thread: null
};

const MessageReducer = (state = initReducer, action) => {
	switch (action.type) {
		case MESSAGE_ACTIONS.FETCH_MESSAGES: {
			return assign({}, state, {
				messages: action.messages
			});
		}
		case MESSAGE_ACTIONS.FETCH_THREAD_MESSAGES: {
			return assign({}, state, {
				thread: action.thread
			});
		}

		case MESSAGE_ACTIONS.FETCH_THREAD_MESSAGES_LIST: {
			return assign({}, state, {
				thread_messages: { ...state.thread_messages, ...action.thread }
			});
		}
		case MESSAGE_ACTIONS.CLEAR_MESSAGES: {
			return assign({}, state, {
				messages: initReducer.messages
			});
		}
		case MESSAGE_ACTIONS.CLEAR_THREAD: {
			return assign({}, state, {
				thread: initReducer.thread
			});
		}
		case MESSAGE_ACTIONS.CLEAR_THREAD_MESSAGES: {
			return assign({}, state, {
				thread_messages: initReducer.thread_messages
			});
		}
		case MESSAGE_ACTIONS.SET_CURRENT_THREAD: {
			return assign({}, state, {
				current_thread_id: action.id
			});
		}
		default:
			return state;
	}
};

export default MessageReducer;
