import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import AppWrapper from 'react/components/AppWrapper';
import SelectMenu from 'react/components/SelectMenu';
import { getSelectMenuOptionsObject, PATHS, SEX, STATES } from 'utils';
import { appNavigate, registerUser } from 'state/actions';

const RegisterContainer = (props) => {
	const [firstName, setFirstName] = React.useState(null);
	const [lastName, setLastName] = React.useState(null);
	const [username, setUsername] = React.useState(null);
	const [phone, setPhone] = React.useState(null);
	const [email, setEmail] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [confirmPassword, setConfirmPassword] = React.useState(null);
	const [address, setAddress] = React.useState(null);
	const [city, setCity] = React.useState(null);
	const [state, setState] = React.useState(null);
	const [dob, setDob] = React.useState(new Date());
	const [sex, setSex] = React.useState(null);

	const isValid = () => {
		if (
			address &&
			city &&
			confirmPassword &&
			dob &&
			email &&
			firstName &&
			lastName &&
			password &&
			phone &&
			sex &&
			username &&
			password === confirmPassword
		) {
			return true;
		} else {
			return false;
		}
	};

	const renderSexSelector = () => {
		const options = getSelectMenuOptionsObject(SEX);
		return (
			<SelectMenu value={sex} handleChange={setSex} options={options} />
		);
	};

	const renderStateSelector = () => {
		const options = getSelectMenuOptionsObject(STATES);
		return (
			<SelectMenu
				value={state}
				handleChange={setState}
				options={options}
			/>
		);
	};

	const submit = () => {
		const { appNavigate, registerUser } = props;
		if (isValid()) {
			const data = {
				address: address,
				date_of_birth: `${dob.getFullYear()}-${dob.getMonth() +
					1}-${dob.getDate()}`,
				city: city,
				re_password: confirmPassword,
				email: email,
				first_name: firstName,
				last_name: lastName,
				password: password,
				phone: phone,
				sex: sex.value,
				state: state.value,
				username: username,
				user_role: 2
			};
			registerUser(data, appNavigate);
		}
	};

	return (
		<AppWrapper className='RegisterContainer'>
			<p className='RegisterContainer__title'>Create Account</p>
			<div className='RegisterContainer__form'>
				<div className='RegisterContainer__form-field-multi'>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							FIRST NAME
						</label>
						<input
							className='RegisterContainer__form-field-input'
							type='text'
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</div>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							LAST NAME
						</label>
						<input
							className='RegisterContainer__form-field-input'
							type='text'
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className='RegisterContainer__form-field-multi'>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							USERNAME
						</label>
						<input
							className='RegisterContainer__form-field-input'
							type='text'
							placeholder='Username'
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							PHONE NUMBER
						</label>
						<input
							className='RegisterContainer__form-field-input'
							type='text'
							placeholder='Phone Number'
							onChange={(e) => setPhone(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className='RegisterContainer__form-field'>
					<label className='RegisterContainer__form-field-label'>
						EMAIL ADDRESS
					</label>
					<input
						className='RegisterContainer__form-field-input'
						type='text'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='RegisterContainer__form-field'>
					<label className='RegisterContainer__form-field-label'>
						STREET ADDRESS
					</label>
					<input
						className='RegisterContainer__form-field-input'
						type='text'
						placeholder='Address'
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div className='RegisterContainer__form-field-multi'>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							CITY
						</label>
						<input
							className='RegisterContainer__form-field-input'
							type='text'
							placeholder='City'
							onChange={(e) => setCity(e.target.value)}
							required
						/>
					</div>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							STATE
						</label>
						{renderStateSelector()}
					</div>
				</div>
				<div className='RegisterContainer__form-field-multi'>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							DATE OF BIRTH
						</label>
						<DatePicker onChange={setDob} value={dob} />
					</div>
					<div className='RegisterContainer__form-field multi'>
						<label className='RegisterContainer__form-field-label'>
							SEX
						</label>
						{renderSexSelector()}
					</div>
				</div>
				<div className='RegisterContainer__form-field'>
					<label className='RegisterContainer__form-field-label'>
						PASSWORD
					</label>
					<input
						className='RegisterContainer__form-field-input'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className='RegisterContainer__form-field'>
					<label className='RegisterContainer__form-field-label'>
						CONFIRM PASSWORD
					</label>
					<input
						className='RegisterContainer__form-field-input'
						type='password'
						placeholder='Password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className='RegisterContainer__form-buttons'>
					<button
						className='RegisterContainer__form-buttons-submit button'
						disabled={!isValid()}
						onClick={submit}
						type='submit'
					>
						Submit
					</button>
					<Link
						className='RegisterContainer__form-buttons-cancel button'
						to={PATHS.login}
					>
						Cancel
					</Link>
				</div>
			</div>
		</AppWrapper>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		appNavigate: (path) => dispatch(appNavigate(path, ownProps.router)),
		registerUser: (data, appNavigate) =>
			dispatch(registerUser(data, appNavigate))
	};
};

export default withRouter(connect(null, mapDispatchToProps)(RegisterContainer));
