import React from 'react';

const ContainerView = ({ children }) => (
	<div className='ContainerView'>
		<div className='ContainerView__children'>{children}</div>
	</div>
);

export default ContainerView;
