import Typography from 'typography';
import {getSettingsConfig} from './helpers';

let baseFont = getSettingsConfig('baseFont');
let fallbackFont = getSettingsConfig('fallbackFont');

let bodyFontFamily = ['sans-serif'];
let headerFontFamily = bodyFontFamily;

if (fallbackFont) {
	bodyFontFamily.unshift(fallbackFont);
}

bodyFontFamily.unshift(baseFont);

const performance = getSettingsConfig('performanceMode');

if (performance == true) {
	bodyFontFamily.shift();
	headerFontFamily.shift();
}

const typography = new Typography({
	baseFontSize    : performance ? '15px' : '16px',
	baseLineHeight  : 1,
	omitGoogleFont  : true,
	headerFontFamily: headerFontFamily,
	bodyFontFamily  : bodyFontFamily,
});

export default typography;
