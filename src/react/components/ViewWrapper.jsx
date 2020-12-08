import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ViewWrapper = ({ children, path, type }) => (
	<div className='ViewWrapper'>
		<label className='ViewWrapper__label'>{type}</label>
		<div className='ViewWrapper__content'>{children}</div>
		<div className='ViewWrapper__button-wrapper'>
			<Link
				className='ViewWrapper__button'
				to={path}
			>{`Go to ${type}`}</Link>
		</div>
	</div>
);

ViewWrapper.propTypes = {
	path: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default ViewWrapper;
