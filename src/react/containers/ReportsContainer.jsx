import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerView from 'react/components/ContainerView';
import ModuleLayout from 'react/components/ModuleLayout';
import Modal from 'react/components/Modal';
import SelectMenu from 'react/components/SelectMenu';
import {
	fetchReports,
	fetchUsers,
	postReport,
	updateReport
} from 'state/actions';
import { formatDate, getSelectMenuOptionsObjectReverse } from 'utils';

class ReportsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalView: 'none',
			newReport: {
				bp: null,
				temperature: null,
				bmi: null,
				pulse: null,
				weight: null,
				respiration: null,
				height: null,
				oxygen_saturation: null,
				file: null,
				user_id: null
			}
		};

		this.interval = null;
	}

	componentDidMount() {
		const { fetchReports, fetchUsers } = this.props;
		fetchReports();
		fetchUsers(2);
		this.interval = setInterval(() => {
			fetchReports();
		}, 20000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidUpdate() {
		if (
			this.state.modalView === 'add_report' &&
			this.props.role === 2 &&
			this.state.newReport.user_id === null
		) {
			this.setState({
				newReport: {
					...this.state.newReport,
					user_id: this.props.id
				}
			});
		}
	}

	render() {
		return (
			<ModuleLayout hasHeader>
				<ContainerView>
					<div className='ReportsContainer'>
						<div className='ReportsContainer__header'>
							<p className='ReportsContainer__header-label'>
								Reports & Vitals
							</p>
							{this.renderModal()}
							{this.props.role !== 2 && (
								<button
									className='ReportsContainer__header-button button'
									onClick={() =>
										this.setState({
											modalView: 'add_report'
										})
									}
								>
									Add Report
								</button>
							)}
						</div>
						<div className='ReportsContainer__list'>
							{this.renderReports()}
						</div>
					</div>
				</ContainerView>
			</ModuleLayout>
		);
	}

	renderReports = () => {
		const {
			props: { reports, role, users }
		} = this;
		if (reports && reports.length && reports.length > 0) {
			const patients = {};
			for (let i = 0; i < users.length; i++) {
				patients[
					users[i].id
				] = `${users[i].first_name} ${users[i].last_name}`;
			}
			return reports.map((report, index) => (
				<React.Fragment key={index}>
					<hr />
					<div className='ReportsContainer__list-group'>
						{[0, 1].includes(role) && (
							<div className='ReportsContainer__list-group-section'>
								<p className='ReportsContainer__list-group-section-item'>
									<b>Patient: </b>
									{patients[report.user_id]}
								</p>
							</div>
						)}
						<div className='ReportsContainer__list-group-section'>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Blood Pressure: </b>
								{report.bp}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Temperature: </b>
								{report.temperature}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Body Mass Index: </b>
								{report.bmi}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Pulse: </b>
								{report.pulse}
							</p>
						</div>
						<div className='ReportsContainer__list-group-section'>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Weight: </b>
								{report.weight}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Height: </b>
								{report.height}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Respiration: </b>
								{report.respiration}
							</p>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Oxygen Saturation: </b>
								{report.oxygen_saturation}
							</p>
						</div>
						<div className='ReportsContainer__list-group-section'>
							<p className='ReportsContainer__list-group-section-item'>
								<b>Created On: </b>
								{formatDate(report.date).date}
							</p>
							{report.reportfile && (
								<p className='ReportsContainer__list-group-section-item'>
									<button
										className='ReportsContainer__list-group-section-item-button button'
										type='submit'
										onClick={() =>
											window.open(report.reportfile)
										}
									>
										Open Attachment
									</button>
								</p>
							)}
						</div>
					</div>
				</React.Fragment>
			));
		} else {
			return (
				<React.Fragment>
					<hr />
					<div className='ReportsContainer__list-empty'>
						There are no blogs. Click "Add Report" to create one!
					</div>
				</React.Fragment>
			);
		}
	};

	renderModal = () => {
		const {
			props: { fetchReports, postReport, role, users },
			state: { modalView }
		} = this;
		if (modalView === 'add_report') {
			const patients = {};
			for (let i = 0; i < users.length; i++) {
				patients[
					users[i].id
				] = `${users[i].first_name} ${users[i].last_name}`;
			}
			return (
				<Modal
					cancelText='Cancel'
					cancel={() => {
						this.setState({
							modalView: 'none',
							newReport: {
								bp: null,
								temperature: null,
								bmi: null,
								pulse: null,
								weight: null,
								respiration: null,
								height: null,
								oxygen_saturation: null,
								file: null,
								user_id: null
							}
						});
					}}
					canSubmit={() => {
						return (
							this.state.newReport.bp &&
							this.state.newReport.temperature &&
							this.state.newReport.bmi &&
							this.state.newReport.pulse &&
							this.state.newReport.weight &&
							this.state.newReport.respiration &&
							this.state.newReport.height &&
							this.state.newReport.oxygen_saturation &&
							this.state.newReport.user_id
						);
					}}
					submitText='Upload'
					submit={() => {
						const data = {
							bp: this.state.newReport.bp,
							temperature: this.state.newReport.temperature,
							bmi: this.state.newReport.bmi,
							pulse: this.state.newReport.pulse,
							weight: this.state.newReport.weight,
							respiration: this.state.newReport.respiration,
							height: this.state.newReport.height,
							oxygen_saturation: this.state.newReport
								.oxygen_saturation,
							file: this.state.newReport.file,
							user_id: null
						};
						if (role === 2) {
							data.user_id = this.state.newReport.user_id;
						} else {
							data.user_id = this.state.newReport.user_id.value;
						}
						postReport(data);
						this.setState(
							{
								modalView: 'none',
								newReport: {
									bp: null,
									temperature: null,
									bmi: null,
									pulse: null,
									weight: null,
									respiration: null,
									height: null,
									oxygen_saturation: null,
									file: null,
									user_id: null
								}
							},
							fetchReports
						);
					}}
					title='Upload a New Report'
				>
					<div className='ReportsContainer__modal'>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Blood Pressure: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Blood Pressure...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											bp: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Temperature: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Temperature...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											temperature: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Body Mass Index: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Body Mass Index...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											bmi: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Pulse: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Pulse...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											pulse: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Weight: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Weight...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											weight: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Height: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Height...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											height: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Respiration: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Respiration...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											respiration: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Oxygen Saturation: </b>
							</p>
							<input
								className='ReportsContainer__modal-row-input'
								type='number'
								placeholder='Oxygen Saturation...'
								onChange={(e) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											oxygen_saturation: e.target.value
										}
									})
								}
							/>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>Add Attachment: </b>
							</p>
							<div
								style={{
									width: '50%',
									border: '1px solid black',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: 'calc(40px - 4px)'
								}}
							>
								<input
									style={{
										width: 'auto',
										height: 'auto',
										margin: '0',
										padding: '0px 10px'
									}}
									type='file'
									placeholder='No File Selected'
									onChange={(e) =>
										this.setState({
											newReport: {
												...this.state.newReport,
												file: e.target.files[0]
											}
										})
									}
								/>
							</div>
						</div>
						<div className='ReportsContainer__modal-row'>
							<p className='ReportsContainer__modal-row-label'>
								<b>User: </b>
							</p>
							<SelectMenu
								handleChange={(newValue) =>
									this.setState({
										newReport: {
											...this.state.newReport,
											user_id: newValue
										}
									})
								}
								options={getSelectMenuOptionsObjectReverse(
									patients
								)}
								value={this.state.newReport.user_id}
							/>
						</div>
					</div>
				</Modal>
			);
		}
	};
}

const MapStateToProps = (state) => {
	const filterReports = (list = []) => {
		if (state.user.info.role === 2) {
			return list.filter((value) => value.user_id === state.user.info.id);
		} else {
			return list;
		}
	};
	return {
		id: state.user.info.id,
		reports: filterReports(state.reports.reports),
		role: state.user.info.role,
		users: state.user.users
	};
};

const MapDispatchToProps = {
	fetchReports,
	fetchUsers,
	postReport,
	updateReport
};

export default connect(MapStateToProps, MapDispatchToProps)(ReportsContainer);
