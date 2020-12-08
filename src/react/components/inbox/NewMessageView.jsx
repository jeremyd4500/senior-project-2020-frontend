import React from 'react';
import SelectMenu from 'react/components/SelectMenu';

const NewMessageView = (props) => {
	const recipientOptions = props.recipients.map((option) => {
		return {
			label: option.name,
			value: option.id
		};
	});
	return (
		<div className='NewMessageView'>
			<SelectMenu
				value={props.recipient}
				handleChange={props.setRecipient}
				options={recipientOptions}
				placeholder='To:'
			/>
			<input
				className='NewMessageView__subject'
				onChange={(e) => props.setSubject(e.target.value)}
				placeholder='Subject: '
			/>
			<textarea
				className='NewMessageView__message'
				onChange={(e) => props.setMessage(e.target.value)}
				placeholder='Message...'
			/>
			<div className='NewMessageView__footer'>
				<button
					className='button NewMessageView__footer-button cancel'
					onClick={props.handleCancel}
				>
					Cancel
				</button>
				<button
					className='button NewMessageView__footer-button submit'
					disabled={!props.canSubmit()}
					onClick={props.handleSubmit}
				>
					Send Message
				</button>
			</div>
		</div>
	);
};

export default NewMessageView;
