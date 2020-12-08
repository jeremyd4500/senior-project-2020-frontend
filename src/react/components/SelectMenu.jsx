import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const SelectMenu = (props) => {
	const parentClass = 'SelectMenu';
	const selectClass = `${parentClass}__select`;
	const innerSelectClass = `${selectClass}-inner`;

	return (
		<div className={parentClass}>
			{props.label && (
				<label className={`${parentClass}-label`}>{props.label}</label>
			)}
			<Select
				backspaceRemovesValue
				className={selectClass}
				classNamePrefix={innerSelectClass}
				closeMenuOnSelect={props.closeMenuOnSelect}
				isClearable={props.multi}
				isDisabled={props.disabled}
				isMulti={props.multi}
				isSearchable={props.searchable}
				loadingMessage={() => 'Loading Options...'}
				menuPlacement={'auto'}
				noOptionsMessage={() =>
					props.noOptionsMessage
						? props.noOptionsMessage
						: 'No Options'
				}
				onChange={props.handleChange}
				options={props.options}
				placeholder={props.placeholder}
				tabSelectsValue={false}
				value={props.value}
			/>
		</div>
	);
};

SelectMenu.propTypes = {
	closeMenuOnSelect: PropTypes.bool,
	disabled: PropTypes.bool,
	handleChange: PropTypes.func.isRequired,
	multi: PropTypes.bool,
	noOptionsMessage: PropTypes.string,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	searchable: PropTypes.bool,
	value: PropTypes.object
};

export default SelectMenu;
