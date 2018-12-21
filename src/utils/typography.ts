import Typography from 'typography';
import {getSettingsConfig} from './helpers';

const fontSize = getSettingsConfig(['typography', 'fontSize']);
const fontFamily = getSettingsConfig(['typography', 'bodyFontFamily']);
const baseLineHeight = getSettingsConfig(['typography', 'baseLineHeight']);
const headerFontFamily = getSettingsConfig(['typography', 'headerFontFamily']);

const typography = new Typography({
	baseFontSize    : fontSize,
	baseLineHeight  : parseInt(baseLineHeight),
	omitGoogleFont  : true,
	bodyFontFamily  : fontFamily.split(','),
	headerFontFamily: headerFontFamily.split(','),
});

export default typography;
