require('typescript-require');

const makeRelative = require('./make-relative');
const deepMap = require('deep-map-object');

const mapNetlifyMediaPath = async (node, options) => {
	if (node.internal.type === `MarkdownRemark`) {
		node.frontmatter = deepMap(value => {
			const {default: netlifyCfg} = require(options.cmsConfigPath);
			const {public_folder} = netlifyCfg;

			if (typeof value === `string` && value.indexOf(`${public_folder}/`) !== -1) {
				return makeRelative(node.fileAbsolutePath, value, netlifyCfg);
			} else {
				return value;
			}
		})(node.frontmatter);
	}
};

exports.onCreateNode = async ({node}, options) => {
	await mapNetlifyMediaPath(node, options)
};