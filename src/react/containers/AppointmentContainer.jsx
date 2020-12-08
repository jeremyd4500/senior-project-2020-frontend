import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModuleLayout from 'react/components/ModuleLayout';
import SelectMenu from 'react/components/SelectMenu';
import ContainerView from 'react/components/ContainerView';
import Modal from 'react/components/Modal';
import {
	deleteAppointment,
	fetchAppointments,
	fetchUsers,
	postAppointment,
	updateAppointment
} from 'state/actions';
import {
	APPOINTMENT_STATUS,
	APPOINTMENT_STATUS_COLORS,
	formatDate,
	getSelectMenuOptionsObjectReverse
} from 'utils';

class AppointmentContainer extends Component {
	constructor(props) {
		super(props);

		this.localizer = momentLocalizer(moment);
		this.interval = null;

		this.state = {
			doctor_id: null,
			editAppointment: {
				appointment_id: null,
				status: null,
				assigned_to: null
			},
			modalView: 'none',
			newAppointment: {
				appointment_date: null,
				description: null
			}
		};
	}

	componentDidMount() {
		const { fetchAppointments, fetchUsers } = this.props;
		fetchAppointments();
		this.interval = setInterval(() => {
			this.props.fetchAppointments();
		}, 20000);

		fetchUsers(1);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { role, users } = this.props;

		const doctors = {};
		if (users.length > 0) {
			for (let i = 0; i < users.length; i++) {
				doctors[
					users[i].id
				] = `${users[i].first_name} ${users[i].last_name}`;
			}
		}

		return (
			<ModuleLayout hasHeader>
				<ContainerView>
					<div className='AppointmentContainer'>
						{this.renderModal()}
						{role === 0 && (
							<div className='AppointmentContainer__doctor-select'>
								<p className='AppointmentContainer__doctor-select-label'>
									<b>View Calendar For: </b>
								</p>
								<SelectMenu
									handleChange={(newValue) => {
										this.setState({
											doctor_id: newValue
										});
									}}
									options={getSelectMenuOptionsObjectReverse(
										doctors
									)}
									value={this.state.doctor_id}
								/>
							</div>
						)}
						<Calendar
							localizer={this.localizer}
							events={this.getAppointments()}
							startAccessor='start'
							endAccessor='end'
							style={{ height: 500 }}
							components={this.renderCustomComponents()}
						/>
						<div className='AppointmentContainer__splitter'>
							<p className='AppointmentContainer__splitter-title'>
								{role === 2
									? 'Your Appointments'
									: 'Appointments'}
							</p>
							{role === 2 && (
								<button
									className='AppointmentContainer__splitter-button button'
									onClick={() =>
										this.setState({
											modalView: 'add_appointment'
										})
									}
								>
									Schedule Appointment
								</button>
							)}
						</div>
						<div className='AppointmentContainer__list'>
							{this.renderAppointmentList()}
						</div>
					</div>
				</ContainerView>
			</ModuleLayout>
		);
	}

	getAppointments = () => {
		const {
			props: { id, role },
			state: { doctor_id }
		} = this;
		switch (role) {
			case 0: {
				return this.props.appointments.map((appointment) => {
					if (
						doctor_id &&
						doctor_id.value &&
						appointment.doctor_id === parseInt(doctor_id.value)
					) {
						const splitDate = appointment.appointment_date.split(
							'-'
						);
						const splitTime = appointment.time.split(':');
						const startDate = new Date(
							splitDate[0],
							splitDate[1] - 1,
							splitDate[2],
							splitTime[0],
							splitTime[1],
							splitTime[2]
						);

						const endDate = new Date(
							splitDate[0],
							splitDate[1] - 1,
							splitDate[2],
							parseInt(splitTime[0]) + 1,
							splitTime[1],
							splitTime[2]
						);

						return {
							title: 'Appointment',
							start: startDate,
							end: endDate,
							allDay: false
						};
					}
				});
			}
			case 1: {
				return this.props.appointments.map((appointment) => {
					if (appointment.doctor_id === id) {
						const splitDate = appointment.appointment_date.split(
							'-'
						);
						const splitTime = appointment.time.split(':');
						const startDate = new Date(
							splitDate[0],
							splitDate[1] - 1,
							splitDate[2],
							splitTime[0],
							splitTime[1],
							splitTime[2]
						);

						const endDate = new Date(
							splitDate[0],
							splitDate[1] - 1,
							splitDate[2],
							parseInt(splitTime[0]) + 1,
							splitTime[1],
							splitTime[2]
						);

						return {
							title: 'Appointment',
							start: startDate,
							end: endDate,
							allDay: false
						};
					}
				});
			}
			case 2: {
				return this.props.appointments.map((appointment) => {
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

					const endDate = new Date(
						splitDate[0],
						splitDate[1] - 1,
						splitDate[2],
						parseInt(splitTime[0]) + 1,
						splitTime[1],
						splitTime[2]
					);

					return {
						title: 'Appointment',
						start: startDate,
						end: endDate,
						allDay: false
					};
				});
			}
			default: {
				return [];
			}
		}
	};

	renderCustomComponents = () => {
		return <p>Hello there</p>;
	};

	renderAppointmentList = () => {
		const {
			props: { appointments, deleteAppointment, role, users }
		} = this;
		if (!appointments.length) {
			return (
				<React.Fragment>
					<hr />
					<div style={{ padding: '10px' }}>
						You have no appointments. Click "Schedule Appointment"
						above to create one!
					</div>
				</React.Fragment>
			);
		} else {
			return appointments
				.sort((a, b) => {
					const dateA = new Date(a.appointment_date);
					const dateB = new Date(b.appointment_date);
					if (dateA > dateB) {
						return -1;
					} else if (dateA < dateB) {
						return 1;
					} else {
						return 0;
					}
				})
				.map((appointment, index) => {
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
					const doctors = {};
					if (users.length > 0) {
						for (let i = 0; i < users.length; i++) {
							doctors[
								users[i].id
							] = `${users[i].first_name} ${users[i].last_name}`;
						}
					}
					if ([0, 1].includes(role)) {
						return (
							<React.Fragment key={index}>
								<hr />
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<div className='AppointmentContainer__list-appointment'>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Date/Time: </b>
											{formattedDate.date} at{' '}
											{formattedDate.time}
										</p>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Reason: </b>
											{appointment.description}
										</p>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Status: </b>
											<span
												style={{
													backgroundColor:
														APPOINTMENT_STATUS_COLORS[
															appointment.status
														]
												}}
											>
												{
													APPOINTMENT_STATUS[
														appointment.status
													]
												}
											</span>
										</p>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Patient: </b>
											{`${appointment.first_name} ${appointment.last_name}`}
										</p>
										{appointment.doctor_id && (
											<p className='AppointmentContainer__list-appointment-field'>
												<b>Assigned To: </b>
												{doctors[appointment.doctor_id]}
											</p>
										)}
									</div>
									<div className='AppointmentContainer__list-appointment-field'>
										<FontAwesomeIcon
											className='AppointmentContainer__list-appointment-field-icon button'
											icon={faEdit}
											onClick={() =>
												this.setState({
													modalView:
														'edit_appointment',
													editAppointment: {
														...this.state
															.editAppointment,
														appointment_id:
															appointment.id
													}
												})
											}
										/>
									</div>
								</div>
							</React.Fragment>
						);
					} else {
						return (
							<React.Fragment key={index}>
								<hr />
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<div className='AppointmentContainer__list-appointment'>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Date/Time: </b>
											{formattedDate.date} at{' '}
											{formattedDate.time}
										</p>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Reason: </b>
											{appointment.description}
										</p>
										<p className='AppointmentContainer__list-appointment-field'>
											<b>Status: </b>
											<span
												style={{
													backgroundColor:
														APPOINTMENT_STATUS_COLORS[
															appointment.status
														]
												}}
											>
												{
													APPOINTMENT_STATUS[
														appointment.status
													]
												}
											</span>
										</p>
										{appointment.doctor_id && (
											<p className='AppointmentContainer__list-appointment-field'>
												<b>Assigned To: </b>
												{doctors[appointment.doctor_id]}
											</p>
										)}
									</div>
									<div className='AppointmentContainer__list-appointment-field'>
										<FontAwesomeIcon
											className='AppointmentContainer__list-appointment-field-icon button'
											icon={faTrashAlt}
											onClick={() =>
												deleteAppointment(
													appointment.id
												)
											}
										/>
									</div>
								</div>
							</React.Fragment>
						);
					}
				});
		}
	};

	renderModal = () => {
		const {
			props: {
				appointments,
				deleteAppointment,
				fetchAppointments,
				id,
				postAppointment,
				role,
				updateAppointment,
				users
			},
			state: { modalView }
		} = this;

		if (modalView === 'add_appointment') {
			return (
				<Modal
					cancelText={'Cancel'}
					cancel={() => {
						this.setState({
							newAppointment: {
								appointment_date: null,
								description: null
							},
							modalView: 'none'
						});
					}}
					canSubmit={() => {
						return (
							this.state.newAppointment.appointment_date &&
							this.state.newAppointment.description
						);
					}}
					submitText={'Schedule'}
					submit={() => {
						const date = this.state.newAppointment.appointment_date;
						postAppointment({
							appointment_date: `${date.getFullYear()}-${date.getMonth() +
								1}-${date.getDate()}`,
							description: this.state.newAppointment.description,
							time: `${date.getHours()}:${date.getMinutes()}`
						});
						this.setState(
							{
								newAppointment: {
									appointment_date: null,
									description: null
								},
								modalView: 'none'
							},
							fetchAppointments
						);
					}}
					title={'Schedule An Appointment'}
				>
					<div className='AppointmentContainer__modal'>
						<div className='AppointmentContainer__modal-date'>
							<p className='AppointmentContainer__modal-date-label'>
								<b>Select a Date & Time</b>
							</p>
							<DateTimePicker
								value={
									this.state.newAppointment.appointment_date
								}
								onChange={(newVal) =>
									this.setState({
										newAppointment: {
											...this.state.newAppointment,
											appointment_date: newVal
										}
									})
								}
							/>
						</div>
						<div className='AppointmentContainer__modal-description'>
							<p className='AppointmentContainer__modal-description-label'>
								<b>Reason for Appointment</b>
							</p>
							<textarea
								className='AppointmentContainer__modal-description-input'
								placeholder='Description...'
								onChange={(e) =>
									this.setState({
										newAppointment: {
											...this.state.newAppointment,
											description: e.target.value
										}
									})
								}
							/>
						</div>
					</div>
				</Modal>
			);
		} else if (modalView === 'edit_appointment') {
			let current_appointment = {};
			const doctors = {};
			for (let i = 0; i < appointments.length; i++) {
				if (
					appointments[i].id ===
					this.state.editAppointment.appointment_id
				) {
					current_appointment = { ...appointments[i] };
				}
			}
			if (users.length > 0) {
				for (let i = 0; i < users.length; i++) {
					doctors[
						users[i].id
					] = `${users[i].first_name} ${users[i].last_name}`;
				}
			}
			return (
				<Modal
					cancelText={'Close'}
					cancel={() => {
						this.setState({
							editAppointment: {
								appointment_id: null,
								status: null,
								assigned_to: null
							},
							modalView: 'none'
						});
					}}
					canSubmit={() => {
						return false;
					}}
					submitText={'Save'}
					submit={() => {}}
					title={'Edit Appointment'}
				>
					<div className='AppointmentContainer__modal'>
						<div className='AppointmentContainer__modal-row'>
							<p className='AppointmentContainer__modal-row-label'>
								<b>Update Status: </b>
							</p>
							<SelectMenu
								handleChange={(newValue) => {
									this.setState(
										{
											editAppointment: {
												...this.state.editAppointment,
												status: newValue
											}
										},
										() => {
											updateAppointment(
												{
													age:
														current_appointment.age,
													description:
														current_appointment.description,
													first_name:
														current_appointment.first_name,
													last_name:
														current_appointment.last_name,
													status: newValue.value,
													user_id:
														current_appointment.user_id
												},
												this.state.editAppointment
													.appointment_id
											);
										}
									);
								}}
								options={getSelectMenuOptionsObjectReverse(
									APPOINTMENT_STATUS
								)}
								value={this.state.editAppointment.status}
							/>
						</div>
						{role === 1 && (
							<div className='AppointmentContainer__modal-row'>
								<button
									className='AppointmentContainer__modal-row-button button'
									disabled={
										current_appointment.doctor_id === id
									}
									onClick={() => {
										updateAppointment(
											{
												age: current_appointment.age,
												description:
													current_appointment.description,
												doctor_id: id,
												first_name:
													current_appointment.first_name,
												last_name:
													current_appointment.last_name,
												user_id:
													current_appointment.user_id
											},
											this.state.editAppointment
												.appointment_id
										);
									}}
								>
									Assign to Me
								</button>
								<button
									className='AppointmentContainer__modal-row-button button'
									onClick={() => {
										deleteAppointment(
											this.state.editAppointment
												.appointment_id
										);
									}}
								>
									Delete Appointment
								</button>
							</div>
						)}
						{role === 0 && (
							<React.Fragment>
								<div className='AppointmentContainer__modal-row'>
									<p className='AppointmentContainer__modal-row-label'>
										<b>Assign to Doctor: </b>
									</p>
									<SelectMenu
										handleChange={(newValue) => {
											this.setState(
												{
													editAppointment: {
														...this.state
															.editAppointment,
														assigned_to: newValue
													}
												},
												() => {
													updateAppointment(
														{
															age:
																current_appointment.age,
															description:
																current_appointment.description,
															first_name:
																current_appointment.first_name,
															last_name:
																current_appointment.last_name,
															doctor_id:
																newValue.value,
															user_id:
																current_appointment.user_id
														},
														this.state
															.editAppointment
															.appointment_id
													);
												}
											);
										}}
										options={getSelectMenuOptionsObjectReverse(
											doctors
										)}
										value={
											this.state.editAppointment
												.assigned_to
										}
									/>
								</div>
								<div className='AppointmentContainer__modal-row'>
									<button
										className='AppointmentContainer__modal-row-button button'
										onClick={() => {
											deleteAppointment(
												this.state.editAppointment
													.appointment_id
											);
										}}
									>
										Delete Appointment
									</button>
								</div>
							</React.Fragment>
						)}
					</div>
				</Modal>
			);
		}
	};
}

const MapDispatchToProps = {
	deleteAppointment,
	fetchAppointments,
	fetchUsers,
	postAppointment,
	updateAppointment
};

const MapStateToProps = (state) => {
	const filterAppointments = (list = []) => {
		if (state.user.info.role === 2) {
			return list.filter((value) => value.user_id === state.user.info.id);
		} else {
			return list;
		}
	};
	return {
		appointments: filterAppointments(state.appointments.appointments),
		id: state.user.info.id,
		role: state.user.info.role,
		users: state.user.users
	};
};

export default connect(
	MapStateToProps,
	MapDispatchToProps
)(AppointmentContainer);
