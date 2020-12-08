import React from 'react';
import Header from 'react/components/Header';
import PropTypes from 'prop-types';

const ModuleLayout = ({ children, hasHeader }) => (
	<div className='ModuleLayout'>
		{hasHeader && <Header />}
		<div className='ModuleLayout__children'>{children}</div>
	</div>
);

ModuleLayout.propTypes = {
	hasHeader: PropTypes.bool
};

export default ModuleLayout;
