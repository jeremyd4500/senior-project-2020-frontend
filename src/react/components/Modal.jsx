import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
	return (
		<div className='Modal'>
			<div className='Modal__content'>
				<p className='Modal__content-title'>{props.title}</p>
				<div className='Modal__content-children'>{props.children}</div>
				<div className='Modal__content-footer'>
					<button
						className='Modal__content-footer-cancel button'
						onClick={props.cancel}
					>
						{props.cancelText ? props.cancelText : 'Cancel'}
					</button>
					<button
						className='Modal__content-footer-submit button'
						disabled={!props.canSubmit()}
						onClick={props.submit}
					>
						{props.submitText ? props.submitText : 'Submit'}
					</button>
				</div>
			</div>
			<div className='Modal__overlay' onClick={props.cancel} />
		</div>
	);
};

Modal.propTypes = {
	cancel: PropTypes.func.isRequired,
	cancelText: PropTypes.string,
	canSubmit: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	submitText: PropTypes.string,
	title: PropTypes.string.isRequired
};

export default Modal;
