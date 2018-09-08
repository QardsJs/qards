/**
 * Based on `gatsby-plugin-postcss-sass`, but with the addition
 * of passing `includePaths=['node_modules']` to `sass-loader` as a query param
 */
const path = require('path');
const util = require('util');
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);
const {cssModulesConfig} = require(`gatsby-1-config-css-modules`);

exports.modifyWebpackConfig = ({config, stage}, options) => {
	const cssModulesConf = `css?modules&minimize&importLoaders=1`;
	const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`;

	const nmpath = path.resolve(__dirname, "../../node_modules");

	// Pass in plugins regardless of stage.
	// If none specified, fallback to Gatsby default postcss plugins.
	if (options.postCssPlugins) {
		config.merge(current => {
			current.postcss = options.postCssPlugins;
			return current
		})
	}

	options.sourceMap = true;

	const sassFiles = /\.s[ac]ss$/;
	const sassModulesFiles = /\.module\.s[ac]ss$/;
	const sassLoader = `sass?${JSON.stringify(options)}`;
	const imageLoader = stage !== 'develop' ? 'file?name=[name]-[hash].[ext]' : 'file';

	switch (stage) {
		case `develop`: {
			config.loader(`sass`, {
				test: sassFiles,
				exclude: sassModulesFiles,
				loaders: [`style`, `css`, `postcss`, 'resolve-url-loader', sassLoader],
			});

			config.loader(`sassModules`, {
				test: sassModulesFiles,
				loaders: [`style`, cssModulesConfig(stage), `postcss`, 'resolve-url-loader', sassLoader],
			});
			return config
		}
		case `build-css`: {
			config.loader(`sass`, {
				test: sassFiles,
				exclude: sassModulesFiles,
				loader: ExtractTextPlugin.extract([
					`css?minimize`,
					`postcss`,
					'resolve-url-loader', sassLoader,
				]),
			});

			config.loader(`sassModules`, {
				test: sassModulesFiles,
				loader: ExtractTextPlugin.extract(`style`, [
					cssModulesConfig(stage),
					`postcss`,
					'resolve-url-loader', sassLoader,
				]),
			});
			return config
		}
		case `develop-html`:
		case `build-html`: {
			config.loader(`sass`, {
				test: sassFiles,
				exclude: sassModulesFiles,
				loader: `null`,
			});

			config.loader(`sassModules`, {
				test: sassModulesFiles,
				loader: ExtractTextPlugin.extract(`style`, [
					cssModulesConfig(stage),
					`postcss`,
					'resolve-url-loader', sassLoader,
				]),
			});
			return config
		}
		case `build-javascript`: {
			config.loader(`sass`, {
				test: sassFiles,
				exclude: sassModulesFiles,
				loader: `null`,
			});

			config.loader(`sassModules`, {
				test: sassModulesFiles,
				loader: ExtractTextPlugin.extract(`style`, cssModulesConfDev, [
					cssModulesConfig(stage),
					'resolve-url-loader', sassLoader,
				]),
			});
			return config
		}
		default: {
			return config
		}
	}
};