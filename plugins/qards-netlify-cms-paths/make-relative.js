const cwd = process.cwd();
const path = require('path');

module.exports = async (markdownPath, imagePath, netlifyCfg) => {
	const {media_folder, public_folder} = netlifyCfg;

	//	Ignore paths that are not set by netlify-cms
	if (typeof imagePath !== `string` || imagePath.indexOf(`${public_folder}/`) !== 0) {
		return imagePath
	}

	markdownPath = path.dirname(markdownPath).replace(`${cwd}/`, ``);
	imagePath = imagePath.replace(public_folder, media_folder);

	return path.relative(markdownPath, imagePath);
};