const settings = require('./static/config/settings');

const fontNpmPackage = settings.typography.npmPackage;
const performanceMode = settings.performanceMode;

exports.onInitialClientRender = () => {
	if (!performanceMode) {
		if (fontNpmPackage.length > 0) {
			/**
			 * This custom font directory is created by gatsby-node
			 * `onPreBootstrap` hook. I would be easier right here to
			 * just call `import(fontNpmPackage)` but that DOES NOT
			 * work:
			 *
			 * https://webpack.js.org/guides/dependency-management/#require-with-expression
			 *
			 * `imports` and paths with variables inside don't play well.
			 *
			 * Another, more elegant, solution was to call
			 * `import(`typeface-${fontNpmPackage}/index.css`)`
			 * but that would make this script import everything that
			 * starts with `typeface` in it's name and would bloat our app
			 * when things are not performed with care (a user trying many
			 * typefaces and not deleting the packages that are not desired
			 * in the production app).
			 */
			import(`./public/custom-fonts/index.css`);
		}
	}

	require('./src/styles/index.scss');
};
