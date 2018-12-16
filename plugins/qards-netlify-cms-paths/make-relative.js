const cwd = process.cwd();
const fs = require('fs');
const path = require('path');

const isNetlifyAsset = (value, public_folder) => {
	return typeof value === `string` && value.indexOf(`${public_folder}/`) !== -1 && path.isAbsolute(value);
};

module.exports = (markdownPath, imagePath, netlifyCfg) => {
	const {media_folder, public_folder} = netlifyCfg;

	//	Ignore paths that are not set by netlify-cms
	if (!isNetlifyAsset(imagePath, public_folder)) {
		return imagePath;
	}

	const dirMarkdownPath = path.dirname(markdownPath).replace(`${cwd}/`, `/`);
	imagePath = imagePath.replace(public_folder, `/${media_folder}`);

	const fullPath = `${cwd}${imagePath}`;

	//	A full stop because our GraphQl will start vomiting errors
	//	that will make us question our existence
	if (!fs.existsSync(fullPath)) {
		throw new Error(JSON.stringify({
			message     : 'One of your markdown files contains an asset (image) that was not found on disk',
			markdownFile: markdownPath,
			imagePath   : fullPath,
		}));
	}

	return path.relative(dirMarkdownPath, imagePath);
};
