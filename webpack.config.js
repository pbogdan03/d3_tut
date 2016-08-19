'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',

	entry: __dirname + '/app/scripts.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!postcss!sass'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack'
				]
			}
		]
	},

	imageWebpackLoader: {
		pngquant: {
			quality: '65-90',
			speed: 4
		},
		svgo: {
			plugins: [
				{
					removeViewBox: false
				},
				{
					removeEmptyAttrs: false
				}
			]
		}
	},

	postcss: [
		require('autoprefixer')
	],

	plugins: [
		new webpack.BannerPlugin('Copyright notice'),
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		contentBase: './public',
		colors: true,
		historyApiFallback: true,
		inline: true,
		hot: true
	}
};