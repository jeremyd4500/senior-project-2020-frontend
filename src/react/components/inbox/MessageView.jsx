import React from 'react';
import PropTypes from 'prop-types';

const MessageView = (props) => (
	<button className='MessageView' onClick={props.handleSelect}>
		<p className='MessageView__sender'>
			<b>From: </b>
			{props.content ? props.content.sender : ''}
		</p>
		<p className='MessageView__subject'>
			<b>Subject: </b>
			{props.subject}
		</p>
		<p className='MessageView__date'>
			<b>Sent On: </b>
			{`${props.date.date} at ${props.date.time}`}
		</p>
	</button>
);

MessageView.propTypes = {
	content: PropTypes.object,
	date: PropTypes.object.isRequired,
	handleSelect: PropTypes.func.isRequired,
	subject: PropTypes.string.isRequired
};

export default MessageView;
