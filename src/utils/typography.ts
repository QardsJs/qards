import Typography from 'typography';
import {getSettingsConfig} from './helpers';

const fontSize = getSettingsConfig(['mainFont', 'fontSize']);
const fontFamily = getSettingsConfig(['mainFont', 'bodyFontFamily']);
const baseLineHeight = getSettingsConfig(['mainFont', 'baseLineHeight']);
const headerFontFamily = getSettingsConfig(['mainFont', 'headerFontFamily']);

const typography = new Typography({
	baseFontSize    : fontSize,
	baseLineHeight  : parseInt(baseLineHeight),
	omitGoogleFont  : true,
	bodyFontFamily  : fontFamily,
	headerFontFamily: headerFontFamily,
});

export default typography;
