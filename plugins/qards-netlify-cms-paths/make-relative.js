const cwd = process.cwd();
const fs = require('fs');
const path = require('path');

const isNetlifyAsset = (value, public_folder) => {
	return value.indexOf(`${public_folder}/`) !== -1 && path.isAbsolute(value);
};

module.exports = (markdownPath, imagePath, netlifyCfg) => {
	const {media_folder, public_folder} = netlifyCfg;

	if (typeof imagePath != 'string') return imagePath;

	if (imagePath.indexOf(`${public_folder}/`) !== -1) {
		//	If this is a dummy image it will have a different path here
		//	so we have to cut it in order to look like a netlify-cms path
		imagePath = `${public_folder}${imagePath.split(public_folder)[1]}`;
	}

	//	Ignore paths that are not set by netlify-cms
	if (!isNetlifyAsset(imagePath, public_folder)) {
		return imagePath;
	}

	const dirMarkdownPath = path.dirname(markdownPath).replace(`${cwd}/`, `/`);
	imagePath = imagePath.replace(public_folder, `/${media_folder}`);

	let fullPath = `${cwd}${imagePath}`;

	//	Maybe it's a dummy image (for the test post we have) in which case we
	//	should also look inside our dummy folder for this image
	if (!fs.existsSync(fullPath)) {
		//	there is no static folder inside the dummy content so we must replace
		//	that with the `/src/dummy-content` dir instead so that our paths can
		//	be generated correctly and media files be found
		imagePath = imagePath.replace('/static/images', '/src/dummy-content/images');
		fullPath = `${cwd}${imagePath}`;
	}

	//	A full stop because our GraphQl will start vomiting errors
	//	that will make us question our existence
	if (!fs.existsSync(fullPath)) {
		throw new Error(JSON.stringify({
			message: 'One of your markdown files contains an asset (image) that was not found on disk',
			markdownPath, imagePath, fullPath,
		}));
	}

	return path.relative(dirMarkdownPath, imagePath);
};
