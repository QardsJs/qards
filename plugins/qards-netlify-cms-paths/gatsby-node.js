require('typescript-require');

const _ = require('lodash');
const base64 = require('base-64');
const path = require('path');
const makeRelative = require('./make-relative');
const deepMap = require('deep-map-object');

const mapNetlifyMediaPath = (node, options) => {
	if (node.internal.type === `MarkdownRemark`) {
		node.frontmatter = deepMap(value => {
			const {default: netlifyCfg} = require(options.cmsConfigPath);
			return makeRelative(node.fileAbsolutePath, value, netlifyCfg);
		})(node.frontmatter);

		node.fields = deepMap(value => {
			const {default: netlifyCfg} = require(options.cmsConfigPath);
			return makeRelative(node.fileAbsolutePath, value, netlifyCfg);
		})(node.fields);
	}
};
/**
 * I'll start explaining this code by relating the problem we're facing.
 *
 * The custom editor components that we created in Netlify-CMS are encoding
 * their content using base64 and the result injected in the markdown in each
 * post that we're fetching above (`createPages`). Since those blocks
 * are encoded, they will skip our image processing middlewares defined
 * inside `gatsby-config.js` and who knows where else. This results in
 * images that are not processed (resized, srcSet generated, tracedSVG)
 * and not optimized for display.
 *
 * THE SOLUTION: Parse the content line by line (like we're doing in the
 * post preview for Netlify-CMS admin) and identify our blocks. Decode
 * the blocks and create a node for each of them images and hope that
 * this will be enough for Gatsby to kick in those optimization incantations.
 */
const createPostImageNodes = async (node, actions) => {
	if (!node.rawMarkdownBody) return;

	// TODO: This regex is in three places right now!
	// TODO: We need a better regex here (the base64 part:  ([0-9a-zA-Z+/=]+?) )
	const cPattern = /{"widget":"([a-zA-Z0-9-]+)","config":"([0-9a-zA-Z+/=]+?)"}/;

	function decodeWidgetDataObject(data) {
		return JSON.parse(base64.decode(data));
	}

	const {createNodeField} = actions;

	node.rawMarkdownBody.split('\n').map((line) => {
		//	for the sake of simplicity we will only search for fields
		//	that are named `src` (to identify an image) so keep that
		//	in mind when creating components with images that don't
		//	have src as their name because they will be ignored by this
		//	parser
		if (RegExp(cPattern).test(line)) {// this is one of the custom components
			const params = line.match(cPattern);
			const widget = params[1];
			const config = decodeWidgetDataObject(params[2]);
			const matches = [];

			//	The `config` is an object that may or may not go nested
			//	so we're going to have to parse it recursively to find
			//	our needles
			const subMatches = scanObjForImagesAndCreateNodes(matches, config, node);
			matches.concat(subMatches);

			createNodeField({
				node, name: `${_.camelCase(widget)}`, value: matches,
			});
		}
	});
};

const scanObjForImagesAndCreateNodes = (matches, obj) => {
	// Find all values on the object which end in an extension we recognise, then create a
	// file node for them so that all the standard image processing stuff will kick up
	const extensions = new Set([`.jpeg`, `.jpg`, `.png`, `.webp`, `.tif`, `.tiff`]);

	for (const key of Object.keys(obj)) {
		const value = obj[key];

		if (typeof value !== 'string') {
			//	go deeper and keep adding the keys to the name
			//	so we can have an understanding of how to query these images
			const subMatches = scanObjForImagesAndCreateNodes(matches, value);
			matches.concat(subMatches);
		} else {
			const extension = path.extname(value).toLowerCase();

			if (extensions.has(extension)) {
				//	got an image
				matches.push(obj);
			}
		}
	}

	return matches;
};

exports.onCreateNode = async ({node, actions}, options) => {
	createPostImageNodes(node, actions).then(() => mapNetlifyMediaPath(node, options));
};