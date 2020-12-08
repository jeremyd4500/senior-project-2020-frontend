import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import MessageView from 'react/components/inbox/MessageView';
import {
	appNavigate,
	clearThreadMessages,
	fetchMessages,
	fetchThreadMessagesList,
	setCurrentThread
} from 'state/actions';
import { formatDate, PATHS } from 'utils';

class InboxView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadedThreads: false
		};
	}

	componentDidMount() {
		this.props.fetchMessages();
	}

	render() {
		return <div className='InboxView'>{this.renderMessages()}</div>;
	}

	renderMessages = () => {
		const {
			appNavigate,
			clearThreadMessages,
			fetchThreadMessagesList,
			messages = [],
			router,
			setCurrentThread,
			thread_messages = {}
		} = this.props;

		if (!messages || !messages.length) {
			return <p className='InboxView__none'>You have no messages</p>;
		} else {
			const abbreviatedMessages = messages.slice(0, 3);
			if (!this.state.loadedThreads) {
				this.setState(
					{
						loadedThreads: true
					},
					() => {
						clearThreadMessages();
						abbreviatedMessages.forEach((message) => {
							fetchThreadMessagesList(message.uuid);
						});
					}
				);
			} else {
				const renderedMessages = [];
				renderedMessages.push(
					...abbreviatedMessages.map((message, index) => (
						<MessageView
							content={this.showThreadInfo(
								thread_messages,
								message.uuid
							)}
							date={formatDate(message.sent_at)}
							handleSelect={() => {
								setCurrentThread(message.uuid);
								appNavigate(PATHS.inbox, router);
							}}
							key={index}
							subject={message.subject}
						/>
					))
				);
				if (messages.length > 3) {
					renderedMessages.push(
						<p className='InboxView__see-more' key={'uniqueKey'}>
							...Go to your inbox to see more!
						</p>
					);
				}
				return renderedMessages;
			}
		}
	};

	showThreadInfo = (thread_messages, uuid) => {
		if (thread_messages && uuid) {
			if (thread_messages[uuid] && thread_messages[uuid].length) {
				return {
					sender: thread_messages[uuid][0].sender.display_name,
					message: thread_messages[uuid][0].content
				};
			}
		}
	};
}

const mapStateToProps = (state) => {
	return {
		messages: state.messages.messages,
		thread_messages: state.messages.thread_messages
	};
};

const mapDispatchToProps = {
	appNavigate,
	clearThreadMessages,
	fetchMessages,
	fetchThreadMessagesList,
	setCurrentThread
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(InboxView)
);
