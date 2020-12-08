import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import AppWrapper from 'react/components/AppWrapper';
import { PATHS } from 'utils';
import { appNavigate, authenticateUser } from 'state/actions';

const LoginContainer = (props) => {
	const [username, setUsername] = React.useState(null);
	const [password, setPassword] = React.useState(null);

	const isValid = () => {
		if (username && password) return true;
		return false;
	};

	const submit = () => {
		const { appNavigate, authenticateUser } = props;
		if (isValid()) {
			const data = {
				username: username,
				password: password
			};
			authenticateUser(data, appNavigate);
		}
	};

	return (
		<AppWrapper className='LoginContainer'>
			<p className='LoginContainer__title'>Login</p>
			<div className='LoginContainer__form'>
				<div className='LoginContainer__form-field'>
					<label className='LoginContainer__form-field-label'>
						USERNAME
					</label>
					<input
						className='LoginContainer__form-field-input'
						type='text'
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='LoginContainer__form-field'>
					<label className='LoginContainer__form-field-label'>
						PASSWORD
					</label>
					<input
						className='LoginContainer__form-field-input'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='LoginContainer__form-help'>
					<Link
						className='LoginContainer__form-help-btn button'
						to={PATHS.register}
					>
						CREATE ACCOUNT
					</Link>
				</div>
				<button
					className='LoginContainer__form-submit button'
					disabled={!isValid()}
					onClick={submit}
					type='submit'
				>
					Submit
				</button>
			</div>
		</AppWrapper>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		appNavigate: (path) => dispatch(appNavigate(path, ownProps.router)),
		authenticateUser: (data, appNavigate) =>
			dispatch(authenticateUser(data, appNavigate))
	};
};

export default withRouter(connect(null, mapDispatchToProps)(LoginContainer));
