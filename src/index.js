import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

import Routes from 'react/Routes';
import store from 'state';
import 'less/styles.less';

// filter out react router warnings
const orgError = console.error;
console.error = (...args) => {
	if (
		args &&
		typeof args[0] === 'string' &&
		args[0].includes('You cannot change <Router routes>')
	) {
		// React route changed
		// Can ignore this warning
	} else {
		orgError.apply(console, args);
	}
};

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);
