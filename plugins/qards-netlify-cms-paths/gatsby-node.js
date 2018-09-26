require('typescript-require');

const path = require('path');
const makeRelative = require('./make-relative');
const deepMap = require('deep-map-object');

const mapNetlifyMediaPath = (node, options) => {
	if (node.internal.type === `MarkdownRemark`) {
		node.frontmatter = deepMap(value => {
			const {default: netlifyCfg} = require(options.cmsConfigPath);
			return makeRelative(node.fileAbsolutePath, value, netlifyCfg);
		})(node.frontmatter);
	}
};

exports.onCreateNode = async ({node}, options) => {
	mapNetlifyMediaPath(node, options)
};