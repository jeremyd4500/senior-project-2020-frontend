import {
	APPOINTMENT_ACTIONS,
	APPOINTMENT_ACTIONS_FAILURE
} from 'state/actions';
import { assign } from 'lodash';

const initReducer = {
	appointments: []
};

const AppointmentReducer = (state = initReducer, action) => {
	switch (action.type) {
		case APPOINTMENT_ACTIONS.FETCH_APPOINTMENTS: {
			return assign({}, state, {
				appointments: action.appointments
			});
		}
		default:
			return state;
	}
};

export default AppointmentReducer;
