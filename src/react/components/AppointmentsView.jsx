import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointments } from 'state/actions';
import { APPOINTMENT_STATUS, formatDate } from 'utils';

class AppointmentsView extends Component {
	componentDidMount() {
		this.props.fetchAppointments();
	}
	render() {
		return (
			<div className='AppointmentsView'>{this.renderAppointments()}</div>
		);
	}

	renderAppointments = () => {
		const { appointments, role } = this.props;
		if (!appointments || !appointments.length) {
			return (
				<p className='AppointmentsView__none'>
					You have no appointments
				</p>
			);
		} else {
			const abbreviatedAppointments = appointments.slice(0, 3);
			const renderedAppointments = [];
			renderedAppointments.push(
				...abbreviatedAppointments.map((appointment, index) => {
					const splitDate = appointment.appointment_date.split('-');
					const splitTime = appointment.time.split(':');
					const startDate = new Date(
						splitDate[0],
						splitDate[1] - 1,
						splitDate[2],
						splitTime[0],
						splitTime[1],
						splitTime[2]
					);
					const formattedDate = formatDate(startDate);
					return (
						<React.Fragment key={index}>
							<div className='AppointmentsView__list-appointment'>
								<p className='AppointmentsView__list-appointment-field'>
									{formattedDate.date} at {formattedDate.time}
								</p>
								<p
									className='AppointmentsView__list-appointment-field'
									style={{ maxWidth: '30%' }}
								>
									<b>Reason: </b>
									{appointment.description}
								</p>
								<p className='AppointmentsView__list-appointment-field'>
									<b>Status: </b>
									{APPOINTMENT_STATUS[appointment.status]}
								</p>
								{[0, 1].includes(role) && (
									<p className='AppointmentsView__list-appointment-field'>
										<b>Patient: </b>
										{`${appointment.first_name} ${appointment.last_name}`}
									</p>
								)}
							</div>
						</React.Fragment>
					);
				})
			);
			if (appointments.length > 3) {
				renderedAppointments.push(
					<p className='AppointmentsView__see-more' key={'uniqueKey'}>
						...Go to your Appointments to see more!
					</p>
				);
			}
			return renderedAppointments;
		}
	};
}

const mapStateToProps = (state) => {
	const filterAppointments = (list = []) => {
		if (state.user.info.role === 2) {
			return list.filter((value) => value.user_id === state.user.info.id);
		} else {
			return list;
		}
	};
	return {
		appointments: filterAppointments(state.appointments.appointments),
		role: state.user.info.role
	};
};

const mapDispatchToProps = {
	fetchAppointments
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsView);
