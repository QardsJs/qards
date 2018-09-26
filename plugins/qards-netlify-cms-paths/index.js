require('typescript-require');

const select = require(`unist-util-select`);
const makeRelative = require(`./make-relative`);

module.exports = async ({markdownNode, markdownAST, getNode}, options) => {
	const imgs = select(markdownAST, `image`);

	if (imgs.length) {
		const {default: netlifyCfg} = require(options.cmsConfigPath);
		const {absolutePath} = getNode(markdownNode.parent);

		imgs.forEach((img) => {
			img.url = makeRelative(absolutePath, img.url, netlifyCfg)
		})
	}
};