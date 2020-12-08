import { assign } from 'lodash';
import { REPORT_ACTIONS } from 'state/actions';

const initReducer = {
	reports: []
};

const ReportReducer = (state = initReducer, action) => {
	switch (action.type) {
		case REPORT_ACTIONS.FETCH_REPORTS: {
			return assign({}, state, {
				reports: action.reports
			});
		}
		default:
			return state;
	}
};

export default ReportReducer;
