const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const {createFilePath} = require(`gatsby-source-filesystem`);
const {createRemoteFileNode} = require(`gatsby-source-filesystem`);

const getTags = (edges) => {
	const tags = [];

	_.each(edges, edge => {
		if (_.get(edge, "node.tags")) {
			for (let i = 0; i < edge.node.tags.length; i++) {
				tags.push(edge.node.tags[i]);
			}
		}
	});

	return tags;
};

const getCategories = (edges) => {
	const categories = [];

	_.each(edges, edge => {
		if (_.get(edge, "node.categories")) {
			for (let i = 0; i < edge.node.categories.length; i++) {
				categories.push(edge.node.categories[i]);
			}
		}
	});

	return categories;
};

exports.createPages = ({graphql, actions}) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		const postTemplate = path.resolve('./src/templates/post/index.tsx');
		const tagTemplate = path.resolve("./src/templates/tag/index.tsx");
		const categoryTemplate = path.resolve("./src/templates/category/index.tsx");

		resolve(graphql(`
				{
					allContentfulPost(sort: {fields: [createdAt], order: DESC}) {
						edges {
							node {
								id
								slug
								
								tags {
									id
									slug
									title
								}

								categories {
									id
									slug
									title
								}

								createdAt
								updatedAt
							}
						}
					}
				}
			`).then(result => {
			if (result.errors) {
				console.error(result.errors);
				reject(result.errors);
			}

			const edges = result.data.allContentfulPost.edges;

			const tags = getTags(edges);
			const categories = getCategories(edges);

			// Create posts and pages.
			_.each(edges, (edge, index) => {
				const slug = edge.node.slug;

				const previous = index === edges.length - 1 ? null : edges[index + 1].node;
				const next = index === 0 ? null : edges[index - 1].node;

				//	create posts pages
				createPage({
					path: `/posts/${slug}/`,
					component: postTemplate,
					context: {
						slug: slug,
						previous,
						next,
					},
				});
			});

			// Make tag pages
			_.uniq(tags).forEach(tag => {
				createPage({
					path: `/tags/${tag.slug}/`,
					component: tagTemplate,
					context: {
						slug: tag.slug
					},
				})
			});

			// Make category pages
			_.uniqBy(categories, 'id').forEach(category => {
				createPage({
					path: `/categories/${category.slug}/`,
					component: categoryTemplate,
					context: {
						slug: category.slug
					},
				})
			});
		}));
	});
};