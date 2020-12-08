const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
// const httpsRedirect = require('express-https-redirect');
const { getPort } = require('./utils');

const app = express();

app.use(cors({ origin: false }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('build'));
// app.use('/', httpsRedirect(true));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const server = {
	name: 'MyCare',
	port: getPort(),
	version: '1.0.0'
};

app.listen(server.port, () => {
	console.log(`${server.name} listening on port ${server.port}`);
});
