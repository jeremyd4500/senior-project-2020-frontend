const { MONTHS } = require('./constants');

const getSelectMenuOptionsArray = (options = []) => {
	return options.map((option) => {
		return {
			label: option,
			value: option.toLowerCase()
		};
	});
};

const getSelectMenuOptionsObject = (options = {}) => {
	return Object.keys(options).map((key) => {
		return {
			label: key,
			value: options[key]
		};
	});
};
const getSelectMenuOptionsObjectReverse = (options = {}) => {
	return Object.keys(options).map((key) => {
		return {
			label: options[key],
			value: key
		};
	});
};

const formatDate = (dateObj) => {
	const date = new Date(dateObj);
	const formattedDate = `${
		MONTHS[date.getMonth()]
	} ${date.getDate()}, ${date.getFullYear()}`;

	let time;
	const hour = date.getHours();
	if (hour === 0) {
		time = `12:${date.getMinutes()} am`;
	} else if (hour < 12) {
		time = `${hour}:${date.getMinutes()} am`;
	} else if (hour === 12) {
		time = `12:${date.getMinutes()} pm`;
	} else {
		time = `${hour - 12}:${date.getMinutes()} pm`;
	}

	const splitTime = time.trim().split(' ');
	const hourMinutes = splitTime[0].split(':');
	if (hourMinutes[1].length === 1) {
		time = `${splitTime[0]}0 ${splitTime[1]}`;
	}

	return {
		date: formattedDate,
		time: time
	};
};

const getPort = () =>
	process.env.PORT ? process.env.PORT : process.env.DEV_PORT;

const getAppHost = (extended_path) => {
	console.log(process.env);
	console.log(process.env.LIVE);
	console.log(process.env.PUBLIC_API_URL);
	console.log(process.env.LOCAL_API_URL);
	const API_URL = process.env.LIVE
		? process.env.PUBLIC_API_URL
		: process.env.LOCAL_API_URL;
	return `${API_URL}${extended_path}`;
};

module.exports = {
	formatDate,
	getAppHost,
	getPort,
	getSelectMenuOptionsArray,
	getSelectMenuOptionsObject,
	getSelectMenuOptionsObjectReverse
};
