import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReports } from 'state/actions';
import { formatDate } from 'utils';

class ReportsView extends Component {
	componentDidMount() {
		this.props.fetchReports();
	}
	render() {
		return <div className='ReportsView'>{this.renderReports()}</div>;
	}

	renderReports = () => {
		const { reports } = this.props;
		if (!reports || !reports.length) {
			return (
				<p className='ReportsView__none'>You have no reports to view</p>
			);
		} else {
			const abbreviatedReports = reports.slice(0, 3);
			const renderedReports = [];
			renderedReports.push(
				...abbreviatedReports.map((report, index) => {
					return (
						<React.Fragment key={index}>
							<div className='ReportsView__list-report'>
								<p className='ReportsView__list-report-field'>
									<b>Height: </b>
									{report.height}
								</p>
								<p className='ReportsView__list-report-field'>
									<b>Weight: </b>
									{report.weight}
								</p>
								<p className='ReportsView__list-report-field'>
									<b>Temperature: </b>
									{report.temperature}
								</p>
								<p className='ReportsView__list-report-field'>
									<b>Created On: </b>
									{formatDate(report.date).date}
								</p>
							</div>
						</React.Fragment>
					);
				})
			);
			if (reports.length > 3) {
				renderedReports.push(
					<p className='ReportsView__see-more' key={'uniqueKey'}>
						...Go to your reports to see more!
					</p>
				);
			}
			return renderedReports;
		}
	};
}

const mapStateToProps = (state) => {
	const filterReports = (list = []) => {
		if (state.user.info.role === 2) {
			return list.filter((value) => value.user_id === state.user.info.id);
		} else {
			return list;
		}
	};
	return {
		reports: filterReports(state.reports.reports)
	};
};

const mapDispatchToProps = {
	fetchReports
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsView);
