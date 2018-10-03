const configSite = require("./static/config/settings");
const configPlugins = require("./static/config/plugins");

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

const plugins = [
	`gatsby-plugin-sharp`,
	`gatsby-transformer-sharp`,
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `posts`,
			path: `${__dirname}/static/content/collections/posts`
		}
	},
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `authors`,
			path: `${__dirname}/static/content/collections/authors`
		}
	},
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `categories`,
			path: `${__dirname}/static/content/collections/categories`
		}
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			path: `${__dirname}/static/images/uploads`,
			name: "images"
		}
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			path: `${__dirname}/src/app/static`,
			name: "app_images"
		}
	},
	`gatsby-plugin-offline`,
	"gatsby-plugin-react-helmet",
	`gatsby-plugin-typescript`,
	`qards-plugin-sass`,
	`gatsby-plugin-catch-links`,
	`gatsby-plugin-styled-components`,
	{
		resolve: `qards-netlify-cms-paths`,
		options: {
			cmsConfigPath: `${__dirname}/src/cms/config/index.ts`
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
						cmsConfigPath: `${__dirname}/src/cms/config/index.ts`
					}
				},
				{
					resolve: `gatsby-remark-images`,
					options: {
						// It's important to specify the maxWidth (in pixels) of
						// the content container as this plugin uses this as the
						// base for generating different widths of each image.
						maxWidth       : 2500,
						backgroundColor: "transparent"
					}
				}, {
					resolve: "gatsby-remark-emojis",
					options: {
						// Deactivate the plugin globally (default: true)
						active: true,
						// Add a custom css class
						class : "emoji-icon",
						// Select the size (available size: 16, 24, 32, 64)
						size  : 64,
						// Add custom styles
						styles: {
							display     : "inline",
							margin      : "0",
							"margin-top": "1px",
							position    : "relative",
							top         : "5px",
							width       : "25px"
						}
					}
				}]
		}
	},
	{
		resolve: `gatsby-plugin-favicon`,
		options: {
			logo          : `${__dirname}/src/static/images/logo.png`,
			appName       : "Qards", // Inferred with your package.json
			appDescription: null,
			developerName : "Romeo Mihalcea",
			developerURL  : null,
			dir           : "auto",
			lang          : "en-US",
			background    : "transparent",
			theme_color   : "#fff",
			display       : "standalone",
			orientation   : "any",
			start_url     : "/",
			version       : "1.0",

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
				windows     : false
			}
		}
	},
	{
		resolve: `gatsby-plugin-page-creator`,
		options: {
			path: `${__dirname}/src/app/pages`
		}
	},
	{
		resolve: `fix-external-links`,
		options: {
			attributes: {
				nofollow: {
					skipMatch: [
						/** regex that will be matched against external link */
					]
				}
			}
		}
	},
	{
		resolve: `gatsby-plugin-typography`,
		options: {
			pathToConfigModule: `src/utils/typography.ts`
		}
	},
	{
		resolve: "gatsby-plugin-netlify-cms",
		options: {
			manualInit: true,
			modulePath: `${__dirname}/src/cms/cms.ts`
		}
	}
];

if (
	configPlugins.tracking &&
	configPlugins.tracking.analytics &&
	configPlugins.tracking.analytics.enable &&
	configPlugins.tracking.analytics.trackingId) {
	plugins.push({
		resolve: `gatsby-plugin-google-analytics`,
		options: {
			trackingId: configPlugins.tracking.analytics.trackingId,
			head      : false,
			respectDNT: true
		}
	});
}

if (
	configPlugins.emailSubscribers &&
	configPlugins.emailSubscribers.enable &&
	configPlugins.emailSubscribers.mailchimp) {
	plugins.push({
		resolve: "gatsby-plugin-mailchimp",
		options: {
			endpoint: configPlugins.emailSubscribers.mailchimp.endpoint
		}
	});
}

if (
	configPlugins.search &&
	configPlugins.search.enable &&
	configPlugins.search.algolia.appId &&
	configPlugins.search.algolia.indexName &&
	configPlugins.search.algolia.searchKey
) {
	console.log("ENABLING: algolia");
	plugins.push({
		resolve: `gatsby-plugin-algolia`,
		options: Object.assign({
			appId    : configPlugins.search.algolia.appId,
			indexName: configPlugins.search.algolia.indexName,
			apiKey   : process.env.ALGOLIA_ADMIN_API_KEY || "",
			searchKey: configPlugins.search.algolia.searchKey
		}, {
			queries      : [{
				query,
				transformer: ({ data }) => {
					return data.allMarkdownRemark.edges.map(
						({ node }) => {
							return {
								objectID: node.objectID,
								...node
							};
						}
					);
				}
			}], chunkSize: 10000
		})
	});
}

if (configPlugins.rssFeed && configPlugins.rssFeed.enable) {
	plugins.push({
		resolve: `gatsby-plugin-feed`,
		options: {
			feeds: [
				{
					serialize: ({ query: { allMarkdownRemark } }) => {
						return allMarkdownRemark.edges.map(edge => {
							return {
								title          : edge.node.frontmatter.title,
								description    : edge.node.frontmatter.excerpt,
								url            : configSite.baseUrl + edge.node.fields.slug,
								guid           : configSite.baseUrl + edge.node.fields.slug,
								custom_elements: [
									{
										//"content:encoded": edge.node.html
									}
								]
							};
						});
					},
					query    : `
							{
								allMarkdownRemark(
									limit: 1000,
									sort: {fields: [frontmatter___created_at], order: DESC},
									filter: {
										fileAbsolutePath: {regex: "//collections/posts//"},
										frontmatter: {isPage: {ne: true}}
									}
								) {
									edges {
										node {
											fields {
												slug
											}
										
											frontmatter {
												title
												excerpt
											}
										}
									}
								}
							}
		  `,
					output   : "/rss.xml"
				}
			]
		}

	});
}

//	last
plugins.push(`gatsby-plugin-netlify`);

module.exports = {
	siteMetadata: {
		title      : configSite.title,
		siteUrl    : configSite.baseUrl,
		description: configSite.excerpt
	},
	plugins
};