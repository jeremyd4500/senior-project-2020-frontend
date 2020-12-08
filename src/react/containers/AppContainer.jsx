import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Toaster from 'react/components/Toaster';
import { clearAlert, windowResize } from 'state/actions';

const AppContainer = (props) => {
	const { children, ...passThroughProps } = props;
	const childrenWithProps = React.Children.map(children, (child) => {
		return React.cloneElement(child, passThroughProps);
	});

	window.onresize = () =>
		props.windowResize(window.innerHeight, window.innerWidth);

	return (
		<div className='AppContainer'>
			{childrenWithProps}
			<Toaster alert={props.alert} resolveToast={props.clearAlert} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		alert: state.app.alert ? state.app.alert.APP : undefined,
		height: state.app.height,
		width: state.app.width
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clearAlert: () => {
			return dispatch(clearAlert('APP'));
		},
		windowResize: (height, width) => {
			return dispatch(windowResize(height, width));
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
