const configPlugins = require("./static/config/plugins");

// let algoliaConfig;
//
// try {
// 	algoliaConfig = require('./config/algolia.json');
// } catch (_) {
// 	algoliaConfig = {
// 		appId    : process.env.ALGOLIA_APP_ID,
// 		apiKey   : process.env.ALGOLIA_API_KEY,
// 		indexName: process.env.ALGOLIA_INDEX_NAME,
// 		searchKey: process.env.ALGOLIA_SEARCH_KEY
// 	};
// }

const query = `{
	allMarkdownRemark(
		filter: {fileAbsolutePath: {regex: "//collections/posts//"}}
	) {
		edges {
			node {
				objectID: id
				
				fields {
					slug
				}
				
				frontmatter {
					title
					excerpt
					tags
					created_at
				}
				
				
				
				categories {
					frontmatter {
						title
					}
				}
			}
		}
	}
}`;

function concatSearchIndex(node) {
	const tags = [];
	const categories = [];

	if (node.tags)
		for (let i = 0; i < node.tags.length; i++) {
			tags.push(node.tags[i]);
		}

	if (node.categories) {
		for (let i = 0; i < node.categories.length; i++) {
			categories.push(node.categories[i].frontmatter.title);
		}
	}

	return {
		objectID : node.objectID,
		title    : node.frontmatter.title,
		slug     : node.fields.slug,
		createdAt: node.frontmatter.created_at,
		excerpt  : node.frontmatter.excerpt,
		tags, categories
	};
}

const plugins = [
	`gatsby-plugin-sharp`,
	`gatsby-transformer-sharp`,
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `posts`,
			path: `${__dirname}/static/content/collections/posts`,
		},
	},
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `authors`,
			path: `${__dirname}/static/content/collections/authors`,
		},
	},
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `categories`,
			path: `${__dirname}/static/content/collections/categories`,
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			path: `${__dirname}/static/images/uploads`,
			name: 'images',
		},
	},
	`gatsby-plugin-offline`,
	'gatsby-plugin-react-helmet',
	`gatsby-plugin-typescript`,
	`gatsby-plugin-sass`,
	`gatsby-plugin-catch-links`,
	`gatsby-plugin-styled-components`,
	{
		resolve: `qards-netlify-cms-paths`,
		options: {
			cmsConfigPath: `${__dirname}/src/cms/config/index.ts`,
		}
	},
	{
		resolve: `gatsby-transformer-remark`,
		options: {
			//	Plugins that will modify markdown body
			plugins: [
				{
					resolve: `qards-netlify-cms-paths`,
					options: {
						cmsConfigPath: `${__dirname}/src/cms/config/index.ts`,
					}
				},
				{
					resolve: `gatsby-remark-images`,
					options: {
						// It's important to specify the maxWidth (in pixels) of
						// the content container as this plugin uses this as the
						// base for generating different widths of each image.
						maxWidth       : 2500,
						backgroundColor: 'transparent'
					},
				}, {
					resolve: 'gatsby-remark-emojis',
					options: {
						// Deactivate the plugin globally (default: true)
						active: true,
						// Add a custom css class
						class : 'emoji-icon',
						// Select the size (available size: 16, 24, 32, 64)
						size  : 64,
						// Add custom styles
						styles: {
							display     : 'inline',
							margin      : '0',
							'margin-top': '1px',
							position    : 'relative',
							top         : '5px',
							width       : '25px'
						}
					}
				}],
		},
	},
	{
		resolve: `gatsby-plugin-favicon`,
		options: {
			logo          : `${__dirname}/src/static/images/logo.png`,
			appName       : 'Qards', // Inferred with your package.json
			appDescription: null,
			developerName : 'Romeo Mihalcea',
			developerURL  : null,
			dir           : 'auto',
			lang          : 'en-US',
			background    : 'transparent',
			theme_color   : '#fff',
			display       : 'standalone',
			orientation   : 'any',
			start_url     : '/',
			version       : '1.0',

			icons: {
				android     : true,
				appleIcon   : true,
				appleStartup: true,
				coast       : false,
				favicons    : true,
				firefox     : true,
				opengraph   : false,
				twitter     : false,
				yandex      : false,
				windows     : false,
			},
		},
	},
	{
		resolve: `fix-external-links`,
		options: {
			attributes: {
				nofollow: {
					skipMatch: [
						/** regex that will be matched against external link */
					],
				},
			},
		},
	},
	{
		resolve: `gatsby-plugin-typography`,
		options: {
			pathToConfigModule: `src/utils/typography.ts`,
		},
	},
	{
		resolve: `gatsby-plugin-feed`,
		options: {
			query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
			feeds: [
				{
					serialize: ({query: {site, allContentfulPost}}) => {
						return allContentfulPost.edges.map(edge => {
							return {
								title          : edge.node.title,
								description    : edge.node.excerpt,
								url            : site.siteMetadata.siteUrl + edge.node.slug,
								guid           : site.siteMetadata.siteUrl + edge.node.slug,
								custom_elements: [
									{
										//"content:encoded": edge.node.html
									},
								],
							};
						});
					},
					query    : `
							{
								allContentfulPost(
									limit: 1000,
									sort: {fields: [createdAt], order: DESC}
								) {
									edges {
										node {
											title
											excerpt
											slug
										}
									}
								}
							}
		  `,
					output   : '/rss.xml',
				},
			],
		},
	},
	{
		resolve: 'gatsby-plugin-netlify-cms',
		options: {
			manualInit: true,
			modulePath: `${__dirname}/src/cms/cms.ts`,
		},
	},
];

if (configPlugins.tracking_google_analytics_tracking_id && configPlugins.tracking_enable_google_analytics) {
	plugins.push({
		resolve: `gatsby-plugin-google-analytics`,
		options: {
			trackingId: configPlugins.tracking_google_analytics_id,
			head      : false,
			respectDNT: true,
		},
	},)
}

if (configPlugins.email_subscribers_enable && configPlugins.email_subscribers_mailchimp) {
	plugins.push({
		resolve: 'gatsby-plugin-mailchimp',
		options: {
			endpoint: configPlugins.email_subscribers_mailchimp_endpoint
		},
	})
}

if (configPlugins.search_enable) {
	plugins.push({
		resolve: `gatsby-plugin-algolia`,
		options: Object.assign({
			appId    : configPlugins.search_algolia_app_id,
			indexName: configPlugins.search_algolia_index_name,
			searchKey: configPlugins.search_algolia_search_key,
		}, {
			queries      : [{
				query,
				transformer: ({data}) => {
					return data.allMarkdownRemark
						.edges.map(({node}) => concatSearchIndex(node))
				}
			}], chunkSize: 10000
		}),
	})
}

//	last
plugins.push(`gatsby-plugin-netlify`);

module.exports = {
	plugins,
};