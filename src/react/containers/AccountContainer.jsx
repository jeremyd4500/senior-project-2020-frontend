import React from 'react';
import { connect } from 'react-redux';
import ModuleLayout from 'react/components/ModuleLayout';
import ContainerView from 'react/components/ContainerView';
import SelectMenu from 'react/components/SelectMenu';
import DatePicker from 'react-date-picker';
import { updateUser } from 'state/actions';
import { getSelectMenuOptionsObject, PATHS, SEX, STATES } from 'utils';

const AccountContainer = ({ info, updateUser }) => {
	const getStateLabel = () => {
		for (const obj in STATES) {
			if (STATES[obj] === info.state) {
				return obj;
			}
		}
	};

	const getSexLabel = () => {
		for (const obj in SEX) {
			if (SEX[obj] === info.sex) {
				return obj;
			}
		}
	};

	const getDate = () => {
		if (info && info.dob) {
			const splitDate = info.dob.split('-');
			return new Date(splitDate[0], splitDate[1], splitDate[2]);
		}
	};

	const [firstName, setFirstName] = React.useState(info.first_name);
	const [lastName, setLastName] = React.useState(info.last_name);
	const [username, setUsername] = React.useState(info.username);
	const [phone, setPhone] = React.useState(info.phone);
	const [email, setEmail] = React.useState(info.email);
	const [address, setAddress] = React.useState(info.address);
	const [city, setCity] = React.useState(info.city);
	const [state, setState] = React.useState({
		label: getStateLabel(),
		value: info.state
	});
	const [dob, setDob] = React.useState(getDate());
	const [sex, setSex] = React.useState({
		label: getSexLabel(),
		value: info.sex
	});

	const isValid = () => {
		if (
			address !== info.address ||
			city !== info.city ||
			`${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}` !==
				info.dob ||
			email !== info.email ||
			firstName !== info.first_name ||
			lastName !== info.last_name ||
			phone !== info.phone ||
			sex.value !== info.sex ||
			state.value !== info.state ||
			username !== info.username
		) {
			return true;
		} else {
			return false;
		}
	};

	const renderSexSelector = () => {
		const options = getSelectMenuOptionsObject(SEX);
		return (
			<SelectMenu
				value={sex}
				handleChange={setSex}
				options={options}
				placeholder={getSexLabel()}
			/>
		);
	};

	const renderStateSelector = () => {
		const options = getSelectMenuOptionsObject(STATES);
		return (
			<SelectMenu
				value={state}
				handleChange={setState}
				options={options}
				placeholder={getStateLabel()}
			/>
		);
	};

	const submit = () => {
		if (isValid()) {
			const data = {
				...info,
				address: address,
				date_of_birth: `${dob.getFullYear()}-${dob.getMonth() +
					1}-${dob.getDate()}`,
				city: city,
				email: email,
				first_name: firstName,
				last_name: lastName,
				phone: phone,
				sex: sex.value,
				state: state.value,
				username: username
			};
			updateUser(data);
		}
	};

	return (
		<ModuleLayout hasHeader>
			<ContainerView>
				<div className='AccountContainer'>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>FIRST NAME: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
							required
							value={firstName}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>LAST NAME: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
							required
							value={lastName}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>USERNAME: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='Username'
							onChange={(e) => setUsername(e.target.value)}
							required
							value={username}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>PHONE NUMBER: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='Phone Number'
							onChange={(e) => setPhone(e.target.value)}
							required
							value={phone}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>EMAIL ADDRESS: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
							required
							value={email}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>STREET ADDRESS: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='Address'
							onChange={(e) => setAddress(e.target.value)}
							required
							value={address}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>CITY: </b>
						</label>
						<input
							className='AccountContainer__field-input'
							type='text'
							placeholder='City'
							onChange={(e) => setCity(e.target.value)}
							required
							value={city}
						/>
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>STATE: </b>
						</label>
						{renderStateSelector()}
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>DATE OF BIRTH: </b>
						</label>
						<DatePicker onChange={setDob} value={dob} />
					</div>
					<div className='AccountContainer__field'>
						<label className='AccountContainer__field-label'>
							<b>SEX: </b>
						</label>
						{renderSexSelector()}
					</div>
					<div className='AccountContainer__buttons'>
						<button
							className='AccountContainer__buttons-cancel button'
							to={PATHS.login}
						>
							Cancel
						</button>
						<button
							className='AccountContainer__buttons-submit button'
							disabled={!isValid()}
							onClick={submit}
							type='submit'
						>
							Submit
						</button>
					</div>
				</div>
			</ContainerView>
		</ModuleLayout>
	);
};

const MapStateToProps = (state) => {
	return {
		info: state.user.info
	};
};

const MapDispatchToProps = {
	updateUser
};

export default connect(MapStateToProps, MapDispatchToProps)(AccountContainer);
