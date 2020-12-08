import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, browserHistory } from 'react-router';

import { PATHS } from 'utils';
import { fetchToken, fetchUserInfo } from 'state/actions';
import store from 'state';

import AppContainer from 'react/containers/AppContainer';
import LoginContainer from 'react/containers/LoginContainer';
import LandingContainer from 'react/containers/LandingContainer';
import RegisterContainer from 'react/containers/RegisterContainer';
import InboxContainer from 'react/containers/InboxContainer';
import AppointmentContainer from 'react/containers/AppointmentContainer';
import AccountContainer from 'react/containers/AccountContainer';
import ReportsContainer from 'react/containers/ReportsContainer';
import BlogContainer from 'react/containers/BlogContainer';

const redirect = (nextState, replace, callback) => {
	replace(PATHS.home);
	return callback();
};

const requireAuth = (nextState, replace, callback) => {
	store.dispatch(fetchToken()).then(() => {
		store.dispatch(fetchUserInfo()).then((resp) => {
			if (!resp || !resp.authenticated) {
				replace(PATHS.login);
				return callback();
			}
			return callback();
		});
	});
};

const scrollTop = () => {
	window.scrollTo(0, 0);
};

const routeConfig = {
	path: PATHS.root,
	component: AppContainer,
	indexRoute: {
		component: LandingContainer,
		onEnter: requireAuth
	},
	childRoutes: [
		{
			path: PATHS.home,
			component: LandingContainer,
			onEnter: requireAuth
		},
		{
			path: PATHS.login,
			component: LoginContainer
		},
		{
			path: PATHS.register,
			component: RegisterContainer
		},
		{
			path: PATHS.inbox,
			component: InboxContainer,
			onEnter: requireAuth
		},
		{
			path: PATHS.appointments,
			component: AppointmentContainer,
			onEnter: requireAuth
		},
		{
			path: PATHS.account,
			component: AccountContainer,
			onEnter: requireAuth
		},
		{
			path: PATHS.reports,
			component: ReportsContainer,
			onEnter: requireAuth
		},
		{
			path: PATHS.blogs,
			component: BlogContainer,
			onEnter: requireAuth
		},
		{
			path: '*',
			onEnter: redirect
		}
	]
};

const Routes = () => (
	<Router
		onUpdate={scrollTop}
		history={browserHistory}
		routes={routeConfig}
	/>
);

export default hot(Routes);
