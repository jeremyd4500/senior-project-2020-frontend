import { assign } from 'lodash';
import { BLOG_ACTIONS } from 'state/actions';

const initReducer = {
	blogs: []
};

const BlogReducer = (state = initReducer, action) => {
	switch (action.type) {
		case BLOG_ACTIONS.FETCH_BLOGS: {
			return assign({}, state, {
				blogs: action.blogs
			});
		}
		default:
			return state;
	}
};

export default BlogReducer;
