require('typescript-require');

const _ = require('lodash');
const crypto = require('crypto');
const Promise = require('bluebird');
const path = require('path');
const base64 = require('base-64');
const {createFilePath} = require('gatsby-source-filesystem');


const getTags = (edges) => {
	const tags = [];

	_.each(edges, (edge) => {
		if (_.get(edge, 'node.frontmatter.tags')) {
			for (let i = 0; i < edge.node.frontmatter.tags.length; i++) {
				tags.push(edge.node.frontmatter.tags[i]);
			}
		}
	});

	return tags;
};

const getCategories = (edges) => {
	const categories = [];

	_.each(edges, (edge) => {
		if (_.get(edge, 'node.frontmatter.categories')) {
			for (let i = 0; i < edge.node.frontmatter.categories.length; i++) {
				categories.push(edge.node.frontmatter.categories[i]);
			}
		}
	});

	return categories;
};

const slugify = (text) => {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
};

exports.createPages = ({graphql, actions}) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		const postTemplate = path.resolve('./src/templates/post/index.tsx');
		const tagTemplate = path.resolve('./src/templates/tag/index.tsx');
		// const categoryTemplate = path.resolve('./src/templates/category/index.tsx');

		resolve(
			graphql(`
				{
					posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//collections/posts//"}}) {
						edges {
							node {
								id
								fields{
									slug
								}
								frontmatter {
									title
									tags
								}
							}
						}
					}
				}
			`).then((result) => {
				if (result.errors) {
					console.error(result.errors);
					reject(result.errors);
				}

				const edges = result.data.posts.edges;

				const tags = getTags(edges);
				//const categories = getCategories(edges);

				// Create posts and pages.
				_.each(edges, (edge, index) => {
					const slug = edge.node.fields.slug;

					const previous = index === edges.length - 1 ? null : edges[index + 1].node;
					const next = index === 0 ? null : edges[index - 1].node;

					// create posts
					createPage({
						path     : slug,
						component: postTemplate,
						context  : {
							slug,
							previous,
							next
						}
					});
				});

				// Make tag pages
				_.uniq(tags).forEach((tag) => {
					createPage({
						path     : `/tags/${slugify(tag)}/`,
						component: tagTemplate,
						context  : {
							slug: slugify(tag)
						}
					});
				});

				// // Make category pages
				// _.uniqBy(categories, 'id').forEach((category) => {
				// 	createPage({
				// 		path: `/categories/${category.slug}/`,
				// 		component: categoryTemplate,
				// 		context: {
				// 			slug: category.slug
				// 		}
				// 	});
				// });
			})
		);
	});
};

const isNodeOfCollection = (node, collection) => node.internal.type === "MarkdownRemark" &&
	node.fileAbsolutePath.match(`collections/${collection}`);

//	Will return only nodes that are from a given collection
const getCollectionNodes = (collection, getNodes) => {
	return getNodes().filter(node => isNodeOfCollection(node, collection)) || [];
};

//	Given a post node, returns the node of the author
const getPostAuthorNode = (postNode, getNodes) => {
	return getCollectionNodes('authors', getNodes).find(node => {
		return node.frontmatter.title === postNode.frontmatter.authors
	});
};

//	Given a post node, returns the node of the category
const getPostCategoryNode = (postNode, getNodes) => {
	return getCollectionNodes('categories', getNodes).find(node => {
		return node.frontmatter.title === postNode.frontmatter.categories
	});
};


const mapCategoriesToPostNode = (node, getNodes) => {
	const category = getPostCategoryNode(node, getNodes);

	//	Netlify CMS does not (yet) support one to many relationships
	//	but we're adding an array to avoid introducing breaking changes
	//	once they do and we have to adapt
	if (category) node.categories___NODES = [category.id];
};

const mapAuthorsToPostNode = (node, getNodes) => {
	const author = getPostAuthorNode(node, getNodes);

	//	Same as above...an array is created
	if (author) node.authors___NODES = [author.id];
};

//	Creates a mapping between posts and authors, sets the slug
//	and other required attributes
exports.sourceNodes = ({actions, getNodes, getNode}) => {
	const {createNodeField} = actions;

	getCollectionNodes('categories', getNodes).forEach(node => {
		createNodeField({node, name: "slug", value: `categories${createFilePath({node, getNode})}`});
	});

	getCollectionNodes('posts', getNodes).forEach(node => {
		mapAuthorsToPostNode(node, getNodes);
		mapCategoriesToPostNode(node, getNodes);
		createPostImageNodes(node, actions);

		//	create the post slug
		createNodeField({node, name: "slug", value: `posts${createFilePath({node, getNode})}`});
	});
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
const createPostImageNodes = (node, actions) => {
	if (!node.rawMarkdownBody) return;

	// TODO: This regex is in three places right now!
	// TODO: We need a better regex here (the base64 part:  ([0-9a-zA-Z+/=]+?) )
	const cPattern = /{"widget":"([a-zA-Z0-9-]+)","config":"([0-9a-zA-Z+/=]+?)"}/;

	function decodeWidgetDataObject(data) {
		return JSON.parse(base64.decode(data));
	}

	const camelize = (string) => {
		return string
			.replace(/\W/g, ' ')
			.replace(/\s(.)/g, $1 => $1.toUpperCase())
			.replace(/\s/g, '')
			.replace(/^(.)/, $1 => $1.toUpperCase())
	};

	const {createNode, createParentChildLink} = actions;

	node.rawMarkdownBody.split("\n").map((line) => {
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
			scanObjForImages(matches, config, node).then((subMatches) => {
				matches.concat(subMatches);

				for (let i = 0; i < matches.length; i++) {
					const src = matches[i];

					const imageNode = {
						id          : `${widget}_${i}`,
						parent      : node.id,
						extension   : path.extname(src).toLowerCase().split('.')[1],
						absolutePath: path.join(__dirname, 'static', src),
						name        : path.basename(src).split('.')[0],
						internal    : {
							//	The type of the node must match the type of the widget
							//	because we want to be able to select and modify them
							//	differently based on the widget. For example we will
							//	crop further down audio posters as compared to gallery
							//	items
							type         : `${camelize(widget)}Images`,
							content      : src,
							contentDigest: crypto.createHash(`md5`).update(src).digest(`hex`)
						}
					};

					createNode(imageNode);
					createParentChildLink({parent: node, child: imageNode})
				}
			});
		}
	});
};

const scanObjForImages = async (matches, obj) => {
	// Find all values on the object which end in an extension we recognise, then create a
	// file node for them so that all the standard image processing stuff will kick up
	const extensions = new Set([`.jpeg`, `.jpg`, `.png`, `.webp`, `.tif`, `.tiff`]);

	for (const key of Object.keys(obj)) {
		const value = obj[key];

		if (typeof value !== 'string') {
			//	go deeper and keep adding the keys to the name
			//	so we can have an understanding of how to query these images
			await scanObjForImages(matches, value).then((subMatches) => {
				matches.concat(subMatches);
			});
		} else {
			if (key === 'src') {
				const extension = path.extname(value).toLowerCase();

				if (extensions.has(extension)) {
					//	got an image
					matches.push(value);
				}
			}
		}
	}

	return matches;
};

//	Netlify cms fix for netlify deploys?
module.exports.resolvableExtensions = () => ['.json'];
