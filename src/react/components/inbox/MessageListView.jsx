import React from 'react';
import PropTypes from 'prop-types';

const MessageListView = (props) => (
	<button className='MessageListView' onClick={props.handleSelect}>
		<p className='MessageListView__sender'>
			{props.content ? props.content.sender : ''}
		</p>
		<div className='MessageListView__middle'>
			<p className='MessageListView__subject'>
				<b>{props.subject}</b>
			</p>
			<p className='MessageListView__date'>{props.date.date}</p>
		</div>
		<p className='MessageListView__content'>
			{props.content ? props.content.message : ''}
		</p>
	</button>
);

MessageListView.propTypes = {
	content: PropTypes.object,
	date: PropTypes.object.isRequired,
	handleSelect: PropTypes.func.isRequired,
	subject: PropTypes.string.isRequired
};

export default MessageListView;
