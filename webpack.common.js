const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
	target: 'web',
	entry: './src/index.js',
	output: {
		chunkFilename: 'js/[name].v.js',
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new CopyPlugin([
			{
				from: path.resolve(__dirname, 'src/html/favicon.ico'),
				to: path.resolve(__dirname, 'build')
			},
			{
				from: path.resolve(__dirname, 'src/images'),
				to: path.resolve(__dirname, 'build/images')
			},
			{
				from: path.resolve(__dirname, 'src/fonts'),
				to: path.resolve(__dirname, 'build/fonts')
			}
		]),
		new DashboardPlugin(),
		new HTMLWebpackPlugin({
			template: './src/html/index.html',
			filename: './index.html',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			inject: true
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				resolve: { extensions: ['.js', '.jsx'] }
			},
			{
				test: /\.(less|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			},
			{
				test: /\.jpe?g$|\.gif$|\.svg$|\.eot$|\.otf$|\.woff$|\.woff2$|\.ttf$|\.wav$|\.mp3$/,
				use: ['file-loader']
			},
			{
				test: /\.png$/,
				use: ['url-loader?mimetype=image/png']
			}
		]
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];
						return `nm.${packageName.replace('@', '')}`;
					}
				}
			}
		}
	}
};
