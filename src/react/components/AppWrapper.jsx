import React from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';

const AppWrapper = ({ children, className }) => {
	return (
		<div className='AppWrapper'>
			<div className='AppWrapper__welcome'>
				<div className='AppWrapper__welcome-branding'>
					<img
						className='AppWrapper__welcome-branding-img'
						src='images/Logo.png'
						alt='Logo'
					/>
					<p className='AppWrapper__welcome-branding-name'>My Care</p>
					<p className='AppWrapper__welcome-branding-motto'>
						Take Control
					</p>
				</div>
			</div>
			<div className='AppWrapper__form'>
				<FocusLock className={className}>{children}</FocusLock>
			</div>
		</div>
	);
};

AppWrapper.propTypes = {
	className: PropTypes.string.isRequired
};

export default AppWrapper;
