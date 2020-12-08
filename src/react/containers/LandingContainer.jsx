import React from 'react';
import ModuleLayout from 'react/components/ModuleLayout';
import ViewWrapper from 'react/components/ViewWrapper';
import InboxView from 'react/components/inbox/InboxView';
import AppointmentsView from 'react/components/AppointmentsView';
import BlogsView from 'react/components/BlogsView';
import ReportsView from 'react/components/ReportsView';
import { PATHS } from 'utils';

const LandingContainer = () => (
	<div className='LandingContainer'>
		<ModuleLayout hasHeader>
			<div className='LandingContainer__views'>
				<ViewWrapper type='Inbox' path={PATHS.inbox}>
					<InboxView />
				</ViewWrapper>
				<ViewWrapper type='Appointments' path={PATHS.appointments}>
					<AppointmentsView />
				</ViewWrapper>
				<ViewWrapper type='Blogs' path={PATHS.blogs}>
					<BlogsView />
				</ViewWrapper>
				<ViewWrapper type='Reports & Vitals' path={PATHS.reports}>
					<ReportsView />
				</ViewWrapper>
			</div>
		</ModuleLayout>
	</div>
);

export default LandingContainer;
