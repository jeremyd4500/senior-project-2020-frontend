const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-cheap-source-map',
	devServer: {
		compress: true,
		contentBase: path.resolve(__dirname, 'build'),
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods':
				'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers':
				'X-Requested-With, content-type, Authorization'
		},
		historyApiFallback: true,
		host: 'localhost',
		hot: true,
		port: 9000,
		publicPath: '/',
		stats: 'errors-only',
		watchContentBase: true
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/html/index.html',
			filename: './index.html',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			inject: true
		})
	]
});
