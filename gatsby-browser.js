import {getSettingsConfig} from './src/utils/helpers';

const fontNpmPackage = getSettingsConfig(['mainFont', 'npmPackage']);
const performanceMode = getSettingsConfig('performanceMode');

exports.onInitialClientRender = () => {
	if (!performanceMode) {
		if (fontNpmPackage) {
			require(fontNpmPackage);
		}
	}

	require('./src/styles/index.scss');
};
