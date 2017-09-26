/* eslint-env node*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
	entry: __dirname + '/index.jsx',
	output: {
		path: path.resolve(__dirname),
		filename: 'app.bundle.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname)
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: require.resolve('babel-loader'), exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: require.resolve('babel-loader'), exclude: /node_modules/ },
			{
				test: /\.less$/, use: [{
					loader: require.resolve('style-loader')
				},{
					loader: require.resolve('css-loader')
				}, {
					loader: require.resolve('less-loader')
				}], exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Development'
		})
	],
};

module.exports = config;