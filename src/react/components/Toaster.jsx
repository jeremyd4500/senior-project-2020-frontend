import React, { Component } from 'react';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faThumbsUp,
	faThumbsDown,
	faInfoCircle,
	faUndo,
	faSmile
} from '@fortawesome/free-solid-svg-icons';

class Toaster extends Component {
	componentDidMount() {
		const { alert } = this.props;
		if (alert) {
			if (alert.clears) this.setTimer();
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { alert } = this.props;
		const { alert: prevAlert } = prevProps;

		if (alert) {
			if (prevAlert) {
				if (
					alert.status !== prevAlert.status ||
					alert.message !== prevAlert.message
				) {
					if (alert.clears) this.setTimer();
				}
			} else {
				if (alert.clears) this.setTimer();
			}
		}
	}

	render() {
		const { alert } = this.props;
		const status = alert ? alert.status : '';
		const message = alert ? alert.message : '';
		const isOpen = alert ? true : false;

		return (
			<Spring
				from={{
					opacity: 0,
					right: -330
				}}
				to={{
					opacity: isOpen ? 1 : 0,
					right: isOpen ? 30 : -330
				}}
			>
				{(styles) => (
					<div className={`toast-message ${status}`} style={styles}>
						<aside>
							<FontAwesomeIcon
								icon={this.getIcon(status)}
								size={'2x'}
								fixedWidth={true}
							/>
						</aside>
						<main>{message}</main>
					</div>
				)}
			</Spring>
		);
	}

	clearAlert = () => {
		const { resolveToast } = this.props;
		if (!this.timerID) {
			resolveToast();
		}
	};

	close = () => {
		this.timerID = null;
		setTimeout(this.clearAlert, 500);
	};

	getIcon = (status) => {
		switch (status) {
			case 'SUCCESS': {
				return faThumbsUp;
			}
			case 'ERROR': {
				return faThumbsDown;
			}
			case 'INFO': {
				return faInfoCircle;
			}
			case 'WARNING': {
				return faUndo;
			}
			default: {
				return faSmile;
			}
		}
	};

	setTimer = () => {
		if (this.timerID) {
			clearTimeout(this.timerID);
			this.timerID = null;
		}
		this.timerID = setTimeout(this.close, 3500);
	};
}

Toaster.propTypes = {
	alert: PropTypes.object,
	resolveToast: PropTypes.func.isRequired
};

export default Toaster;
