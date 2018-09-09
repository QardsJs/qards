let contentfulConfig, mailchimpConfig, algoliaConfig;

try {
	contentfulConfig = require('./config/contentful.json');
} catch (_) {
	contentfulConfig = {
		spaceId: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
	}
}

try {
	mailchimpConfig = require('./config/mailchimp.json')
} catch (_) {
	mailchimpConfig = {
		endpoint: process.env.MAILCHIMP_ENDPOINT
	}
}

try {
	algoliaConfig = require('./config/algolia.json')
} catch (_) {
	algoliaConfig = {
		appId: process.env.ALGOLIA_APP_ID,
		apiKey: process.env.ALGOLIA_API_KEY,
		indexName: process.env.ALGOLIA_INDEX_NAME,
	}
}

const query = `{
	allContentfulPost {
		edges {
			node {
				objectID: id
				
				slug
				title
				excerpt
				
				updatedAt
				createdAt
				
				tags {
					title
				}
				
				categories {
					title
				}

				cards {
					headers {
						title
						subtitle
					}
				
					paragraphs {
						text {
							text
						}
					}
				}
			}
		}
	}
}`;

function concatSearchIndex(node) {
	//	Will concat some of the nodes as we don't need such
	//	a nested structure of content to target posts in searches
	const tags = [];
	const categories = [];

	if (node.tags) for (let i = 0; i < node.tags.length; i++) {
		tags.push(node.tags[i]);
	}

	if (node.categories) for (let i = 0; i < node.categories.length; i++) {
		categories.push(node.categories[i]);
	}

	return {
		objectID: node.objectID,
		title: node.title,
		slug: node.slug,
		createdAt: node.createdAt,
		updatedAt: node.updatedAt,
		excerpt: node.excerpt,
		tags, categories
	}
}

const queries = [{
	query,
	transformer: ({data}) => data.allContentfulPost.edges.map(({node}) => concatSearchIndex(node)), // optional
}];

algoliaConfig["queries"] = queries;
algoliaConfig["chunkSize"] = 10000;

module.exports = {
	siteMetadata: {
		name: "qards",
		title: 'Qards - the blogging platform for professionals',
		description: 'Qards is a blogging platform for professionals',
		siteUrl: 'https://qards.io',
		algolia: {
			indexName: algoliaConfig.indexName,
			appId: algoliaConfig.appId,
			searchKey: algoliaConfig.searchKey
		}
	},
	plugins: [
		{
			resolve: `gatsby-plugin-algolia`,
			options: algoliaConfig,
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/static/`,
			},
		},
		`gatsby-plugin-offline`,
		'gatsby-plugin-react-helmet',
		`gatsby-plugin-typescript`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-styled-components`,
		//	This is unusable because it removes everything from blueprintjs and many other components
		//	I'll leave it here because it's something I want to come back too since there's a lot of
		//	unused css code being exported
		//
		// {
		// 	resolve: `gatsby-plugin-purgecss`,
		// 	options: {
		// 		printRejected: true,
		// 		whitelist: []
		// 	}
		// },
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-36099094-14",
				// Puts tracking script in the head instead of the body
				head: false,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: [],
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: "src/static/images/logo.png",
				appName: "Qards", // Inferred with your package.json
				appDescription: null,
				developerName: "Romeo Mihalcea",
				developerURL: null,
				dir: 'auto',
				lang: 'en-US',
				background: 'transparent',
				theme_color: '#fff',
				display: 'standalone',
				orientation: 'any',
				start_url: '/',
				version: '1.0',

				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: false
				}
			}
		},
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography.ts`,
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: contentfulConfig,
		},
		{
			resolve: 'gatsby-plugin-mailchimp',
			options: mailchimpConfig,
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
									title: edge.node.title,
									description: edge.node.excerpt,
									url: site.siteMetadata.siteUrl + edge.node.slug,
									guid: site.siteMetadata.siteUrl + edge.node.slug,
									custom_elements: [{
										//"content:encoded": edge.node.html
									}],
								};
							});
						},
						query: `
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
						output: "/rss.xml",
					},
				],
			},
		},
		`gatsby-plugin-netlify`, // make sure to keep it last in the array
	],
};
