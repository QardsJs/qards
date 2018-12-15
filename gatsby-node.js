require('typescript-require');

const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const base64 = require('base-64');
const {createFilePath} = require('gatsby-source-filesystem');

const postsSettings = require('./static/config/posts.json');

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
		categories.push(edge.node);
	});

	return categories;
};

exports.createPages = ({graphql, actions}) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		const postTemplate = path.resolve('./src/templates/post/index.tsx');
		const tagTemplate = path.resolve('./src/templates/tag/index.tsx');
		const categoryTemplate = path.resolve('./src/templates/category/index.tsx');

		resolve(
			graphql(`
				{
					posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//collections/posts//"}}) {
						edges {
							node {
								fields{
									slug
								}
								frontmatter {
									tags
									created_at
								}
							}
						}
					}
					
					categories: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//collections/categories//"}}) {
						edges {
							node {
								id
								fields{
									slug
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

				const postsEdges = result.data.posts.edges;
				const categoriesEdges = result.data.categories.edges;

				const tags = getTags(postsEdges);
				const categories = getCategories(categoriesEdges);

				// Create posts and pages.
				_.each(postsEdges, (edge, index) => {

					const slug = edge.node.fields.slug;

					const previous = index === postsEdges.length - 1 ? null : postsEdges[index + 1].node;
					const next = index === 0 ? null : postsEdges[index - 1].node;

					// create posts
					createPage({
						path     : slug,
						component: postTemplate,
						context  : {
							slug,
							previous,
							next,
							tags: edge.node.frontmatter.tags,
						},
					});
				});

				// Make tag pages
				_.uniq(tags).forEach((tag) => {
					createPage({
						path     : `/tags/${slugify(tag)}/`,
						component: tagTemplate,
						context  : {
							slug: slugify(tag), tag,
						},
					});
				});

				// Make category pages
				_.uniqBy(categories, 'id').forEach((category) => {
					createPage({
						path     : category.fields.slug,
						component: categoryTemplate,
						context  : {
							slug: category.fields.slug,
						},
					});
				});
			}),
		);
	});
};

const isNodeOfCollection = (node, collection) => node.internal.type === 'MarkdownRemark' &&
	node.fileAbsolutePath.match(`collections/${collection}`);

//	Will return only nodes that are from a given collection
const getCollectionNodes = (collection, getNodes) => {
	return getNodes().filter(node => isNodeOfCollection(node, collection)) || [];
};

//	Given a post node, returns the node of the author
const getPostAuthorNode = (postNode, getNodes) => {
	return getCollectionNodes('authors', getNodes).find(node => {
		return node.frontmatter.title === postNode.frontmatter.authors;
	});
};

//	Given a post node, returns the node of the category
const getPostCategoryNode = (postNode, getNodes) => {
	return getCollectionNodes('categories', getNodes).find(node => {
		return node.frontmatter.title === postNode.frontmatter.categories;
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

const slugify = (text) => {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
};

/**
 *    Netlify cms supports custom slugs but not fully
 *    For example you can't add a slug config like: {{year}}/{{month}}/{{day}}
 *    and expect for it to work because the slashes will get replaced with
 *    dashes since Netlify CMS does NOT know how to deal with subfolders
 *    For a new blog this is not a big deal but it might be for a blog that
 *    is being imported from Wordpress which has this type of urls (I know
 *    because I faced this issue). The solution is to create the slug here
 */
const createFinalSlug = (post, slug) => {
	//	based on the posts settings
	const slugConfig = postsSettings.slugStructure;

	//	SUPPORTED TOKENS
	//
	// {{slug}}:   a url-safe version of the title field for the file
	// {{year}}:   4-digit year of the file creation date
	// {{month}}:  2-digit month of the file creation date
	// {{day}}:    2-digit day of the month of the file creation date
	// {{hour}}:   2-digit hour of the file creation date
	// {{minute}}: 2-digit minute of the file creation date
	// {{second}}: 2-digit second of the file creation date
	const dt = new Date(post.frontmatter.created_at);
	const mo = ('0' + (dt.getMonth() + 1)).slice(-2);
	const day = ('0' + dt.getDate()).slice(-2);
	const year = dt.getFullYear();
	const hour = dt.getHours();
	const minute = dt.getMinutes();
	const second = dt.getSeconds();

	return `/${slugConfig}/`
		.replace('{{slug}}', slug)
		.replace('{{year}}', year)
		.replace('{{month}}', mo)
		.replace('{{day}}', day)
		.replace('{{hour}}', hour)
		.replace('{{minute}}', minute)
		.replace('{{second}}', second)
		//	replace double slashes with a single one
		.replace(/\/+/g, '/');
};

//	Creates a mapping between posts and authors, sets the slug
//	and other required attributes
exports.sourceNodes = ({actions, getNodes, getNode}) => {
	const {createNodeField} = actions;

	getCollectionNodes('categories', getNodes).forEach(node => {
		createNodeField({node, name: 'slug', value: `categories${createFilePath({node, getNode})}`});
	});

	getCollectionNodes('posts', getNodes).forEach(node => {
		mapAuthorsToPostNode(node, getNodes);
		mapCategoriesToPostNode(node, getNodes);

		//	create the post slug
		const slugPath = createFilePath({node, getNode});
		createNodeField({node, name: 'slug', value: createFinalSlug(node, slugPath)});
	});
};

const createReferencesField = (node, actions, getNodes) => {
	const cPattern = /{"widget":"([a-zA-Z0-9-]+)","config":"(.*?)"}/;

	function decodeWidgetDataObject(data) {
		return JSON.parse(base64.decode(data));
	}

	if (!node.rawMarkdownBody) return;

	const references = [];

	node.rawMarkdownBody.split('\n').map(line => {
		if (RegExp(cPattern).test(line)) {
			const params = line.match(cPattern);
			const widget = params[1];
			const config = decodeWidgetDataObject(params[2]);

			if (widget === 'qards-reference') {
				//	find the post that is referenced based on title
				//	TODO: check back with Netlify CMS and see if they made it possible to
				//	put an id in the valueField or a slug because the `title` field can
				//	change at any time and it's only a matter of time before we get into
				//	trouble with missing referenced posts
				getCollectionNodes('posts', getNodes).forEach(searchNode => {
					//	this title match is inneficient! See above
					if (searchNode.frontmatter.title === config.reference) {
						references.push(searchNode.id);
					}
				});
			}
		}
	});

	node.references___NODES = references;
};

//	Creates a `references` field that holds the references to other posts
exports.onCreateNode = async ({node, actions, getNodes}) => {
	if (isNodeOfCollection(node, 'posts')) createReferencesField(node, actions, getNodes);
};

//	Netlify cms fix for netlify deploys?
module.exports.resolvableExtensions = () => ['.json'];
