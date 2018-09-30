import Typography from "typography";
import { getSettingsConfig } from "./helpers";

let bodyFontFamily = ["Roboto", "Helvetica", "Arial", "sans-serif"];
let headerFontFamily = bodyFontFamily;

const performance = getSettingsConfig("performanceMode");

if (performance == true) {
	bodyFontFamily.shift();
	headerFontFamily.shift();
}

const typography = new Typography({
	baseFontSize    : performance ? "15px" : "16px",
	baseLineHeight  : 1,
	omitGoogleFont  : true,
	headerFontFamily: headerFontFamily,
	bodyFontFamily  : bodyFontFamily
});

export default typography;