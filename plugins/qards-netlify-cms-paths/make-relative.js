const cwd = process.cwd();
const path = require('path');

const isNetlifyAsset = (value, public_folder) => {
	return typeof value === `string` && value.indexOf(`${public_folder}/`) !== -1 && path.isAbsolute(value);
};

module.exports = (markdownPath, imagePath, netlifyCfg) => {
	const {media_folder, public_folder} = netlifyCfg;

	//	Ignore paths that are not set by netlify-cms
	if (!isNetlifyAsset(imagePath, public_folder)) {
		return imagePath
	}

	markdownPath = path.dirname(markdownPath).replace(`${cwd}/`, `/`);
	imagePath = imagePath.replace(public_folder, `/${media_folder}`);

	return path.relative(markdownPath, imagePath);
};