import React, { Component } from 'react';
import ContainerView from 'react/components/ContainerView';
import ModuleLayout from 'react/components/ModuleLayout';

class ReportsSubmissionContainer extends Component {
	render() {
		//...

		return (
			<ModuleLayout hasHeader>
				<ContainerView className='testin'>
					<div className='ReportRegContainer'>
						<h1 className='title'>Report Submission</h1>
						<table className='reportSubmissionTable'>
							<tr>
								<td>Waist:</td>
								<td>Height:</td>
							</tr>
							<td>Weight: </td>
							<td>First Name:</td>
							<td>Last Name:</td>
						</table>
					</div>
				</ContainerView>
			</ModuleLayout>
		);
	}
}

export default ReportsSubmissionContainer;
