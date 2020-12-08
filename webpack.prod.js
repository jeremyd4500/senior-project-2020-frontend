const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true,
				terserOptions: {
					ecma: 6,
					output: {
						comments: false
					}
				}
			})
		]
	},
	target: 'web'
});
