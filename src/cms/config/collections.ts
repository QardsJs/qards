import PostsSettings from '../../../static/config/posts.json';

export const settingsCollection = {
	name  : 'settings',
	label : 'Settings',
	delete: false,
	editor: {
		preview: false,
	},
	files : [{
		name  : 'general',
		label : 'Site Settings',
		file  : 'static/config/settings.json',
		fields: [{
			label : 'Name',
			name  : 'name',
			widget: 'string',
		}, {
			label : 'Title',
			name  : 'title',
			widget: 'string',
		}, {
			label : 'Excerpt',
			name  : 'excerpt',
			widget: 'text',
		}, {
			label : 'Base url',
			name  : 'baseUrl',
			widget: 'string',
		}, {
			label  : 'Performance mode',
			name   : 'performanceMode',
			widget : 'boolean',
			default: false,
			hint   : `In performance mode Qards does its best to operate with
			minimum of resources. The overall experience should be noticeably
			faster both for your users and search engines. In performance mode
			we won't load many posters (when showing posts results), we will
			not be using too many css effects and we will not load an external
			font. Some of these tweaks can also be altered separately.`,
		}, {
			label : 'Typography',
			name  : 'typography',
			widget: 'object',
			hint  : `Customise your main font from here. There are certain performance
			advantages in using the "typeface-?" packages (you can search for them on npmjs)
			so I added support for specifying them here.
			`,
			fields: [{
				label  : 'Family',
				name   : 'bodyFontFamily',
				widget : 'string',
				default: 'Roboto',
				hint   : 'The font family for your body content',
			}, {
				label  : 'Family',
				name   : 'headerFontFamily',
				widget : 'string',
				default: 'Roboto',
				hint   : 'The font family for headers and titles',
			}, {
				label  : 'Base line height',
				name   : 'baseLineHeight',
				widget : 'number',
				default: 1,
				hint   : `The base line height for your typography`,
			}, {
				label   : 'Typeface package',
				name    : 'fontSize',
				widget  : 'string',
				required: false,
				default : '15px',
				hint    : `The font size (in pixels) to serve as a base for all fonts
				calculations.`,
			}, {
				label   : 'Typeface package',
				name    : 'npmPackage',
				widget  : 'string',
				required: false,
				default : 'typeface-roboto',
				hint    : `(optional) Specify the "typeface-?" package to be imported. If you
				don't want to use a "typeface-?" package you can leave this field blank.`,
			}],
		}, {
			label : 'Logo',
			name  : 'logo',
			widget: 'image',
			hint  : `If you want to change the logo you have to delete the existing
			one (delete the file from media library also) first and then upload 
			the new one which MUST be named logo.png. IMPORTANT: Please upload a
			high-res version that is bigger than 512px because we will use it for the
			manifest as well`,
		}, {
			label : 'Social media share image',
			name  : 'socialShareImg',
			widget: 'image',
		}, {
			label   : 'Editorial mode?',
			name    : 'editorialMode',
			widget  : 'boolean',
			hint    : `The editorial mode option allows you to enable "Editorial Workflow" 
			mode for more control over the content publishing phases. All unpublished 
			entries will be arranged in a board according to their status, and they 
			can be further reviewed and edited before going live.`,
			default : false,
			required: false,
		}],
	}, {
		name  : 'theme',
		label : 'Theme',
		file  : 'static/config/theme.json',
		fields: [{
			//	Any color that doesn't target a specific element or type
			//	of content (text, border, etc) should provide 2 options
			//	for configuration: background and color (text)
			label : 'Colors',
			name  : 'colors',
			widget: 'object',
			fields: [{
				label : 'Intents',
				name  : 'intents',
				widget: 'object',
				hint  : 'Text and background colors used for various message intents',
				fields: [{
					label : 'Success',
					name  : 'success',
					widget: 'object',
					fields: [{
						label  : 'Text',
						name   : 'text',
						widget : 'color',
						default: '#2fb57d',
					}, {
						label  : 'Background',
						name   : 'background',
						widget : 'color',
						format : 'hex',
						default: '#7cd6b1',
					}],
				}, {
					label : 'Warning',
					name  : 'warning',
					widget: 'object',
					fields: [{
						label  : 'Text',
						name   : 'text',
						widget : 'color',
						format : 'hex',
						default: '#ffa000',
					}, {
						label  : 'Background',
						name   : 'background',
						widget : 'color',
						format : 'hex',
						default: '#ffd796',
					}],
				}, {
					label : 'Danger',
					name  : 'danger',
					widget: 'object',
					fields: [{
						label  : 'Text',
						name   : 'text',
						widget : 'color',
						format : 'hex',
						default: '#f74444',
					}, {
						label  : 'Background',
						name   : 'background',
						widget : 'color',
						format : 'hex',
						default: '#ffb2b2',
					}],
				}],
			}, {
				label : 'Primary',
				name  : 'primary',
				widget: 'object',
				hint  : 'Text and background colors used as primary in your theme',
				fields: [{
					label  : 'Text',
					name   : 'text',
					widget : 'color',
					format : 'hex',
					default: '#ffffff',
				}, {
					label  : 'Background',
					name   : 'background',
					widget : 'color',
					format : 'hex',
					default: '#192633',
				}],
			}, {
				label : 'Secondary',
				name  : 'secondary',
				widget: 'object',
				hint  : 'Text and background colors used as secondary in your theme',
				fields: [{
					label  : 'Text',
					name   : 'text',
					widget : 'color',
					format : 'hex',
					default: '#192633',
				}, {
					label  : 'Background',
					name   : 'background',
					widget : 'color',
					format : 'hex',
					default: '#BFCCD6',
				}],
			}, {
				label : 'Accent',
				name  : 'accent',
				widget: 'object',
				hint  : 'Text and background colors used as accent in your theme',
				fields: [{
					label  : 'Text',
					name   : 'text',
					widget : 'color',
					format : 'hex',
					default: '#FFFFFF',
				}, {
					label  : 'Background',
					name   : 'background',
					widget : 'color',
					format : 'hex',
					default: '#41a893',
				}],
			}, {
				label : 'Secondary accent',
				name  : 'secondaryAccent',
				widget: 'object',
				hint  : 'Text and background colors used as secondary accent in your theme',
				fields: [{
					label  : 'Text',
					name   : 'text',
					widget : 'color',
					format : 'hex',
					default: '#FFFFFF',
				}, {
					label  : 'Background',
					name   : 'background',
					widget : 'color',
					format : 'hex',
					default: '#F432AC',
				}],
			}, {
				label : 'Faded',
				name  : 'faded',
				widget: 'object',
				hint  : 'Text and background colors used for faded content',
				fields: [{
					label  : 'Text',
					name   : 'text',
					widget : 'color',
					format : 'hex',
					default: '#192633',
				}, {
					label  : 'Background',
					name   : 'background',
					widget : 'color',
					format : 'hex',
					default: '#f0f4f7',
				}],
			}, {
				label  : 'Text',
				name   : 'text',
				widget : 'color',
				format : 'hex',
				default: '#333333',
			}, {
				label  : 'Light text',
				name   : 'lightText',
				widget : 'color',
				format : 'hex',
				default: '#5e7180',
			}, {
				label  : 'Borders',
				name   : 'borders',
				widget : 'color',
				format : 'hex',
				default: '#E1E8ED',
			}],
		}],
	}, {
		name       : 'posts',
		label      : 'Posts',
		file       : 'static/config/posts.json',
		description: 'Posts related settings',
		widget     : 'object',
		fields     : [{
			label : 'Number of posts on frontpage',
			name  : 'frontLimit',
			widget: 'number',
		}, {
			label   : 'Show post scroll progress?',
			name    : 'progressShow',
			widget  : 'boolean',
			hint    : `When scrolling a post, a progress bar 
					indicating the current position in page will be 
					shown on the bottom of the page`,
			default : true,
			required: false,
		}, {
			label   : 'Show table of contents?',
			name    : 'tocShow',
			widget  : 'boolean',
			default : true,
			required: false,
		}, {
			label   : 'Show social media share buttons?',
			name    : 'socialShow',
			widget  : 'boolean',
			default : true,
			required: false,
		}, {
			label   : 'Show subscribe box?',
			name    : 'subscribeShow',
			widget  : 'boolean',
			default : true,
			required: false,
		}, {
			label   : 'Show excerpts?',
			name    : 'showExcerpts',
			widget  : 'boolean',
			default : true,
			required: false,
			hint    : `If true, the post excerpts will be shown when
			displaying post results (cards)`,
		}, {
			label   : 'Slug structure',
			name    : 'slugStructure',
			widget  : 'string',
			hint    : `Allows you to fine tune the structure and details present in the
			posts slug. The available tokens are can be found on netlify-cms documentation
			page: https://www.netlifycms.org/docs/configuration-options/#slug`,
			default : '{{slug}}',
			required: true,
		}, {
			label   : 'Path prefix',
			name    : 'pathPrefix',
			widget  : 'string',
			hint    : `Specify the path where your index should be. This value can be something like
			"/posts" or "/blog". Your prefix should start with a slash "/" but NOT end with one!`,
			default : '/posts',
			required: true,
		}],
	}, {
		name  : 'plugins',
		label : 'Plugins',
		file  : 'static/config/plugins.json',
		fields: [{
			label : 'Tracking',
			name  : 'tracking',
			widget: 'object',
			fields: [{
				label : 'Enable?',
				name  : 'enable',
				widget: 'boolean',
			}, {
				label : 'Google Analytics',
				name  : 'analytics',
				widget: 'object',
				fields: [{
					label : 'Tracking ID',
					name  : 'trackingId',
					widget: 'string',
				}],
			}],
		}, {
			label : 'Email subscribers',
			name  : 'emailSubscribers',
			widget: 'object',
			fields: [{
				label : 'Enable?',
				name  : 'enable',
				widget: 'boolean',
			}, {
				label : 'Mailchimp',
				name  : 'mailchimp',
				widget: 'object',
				fields: [{
					label : 'Mailchimp list endpoint',
					name  : 'endpoint',
					widget: 'string',
				}],
			}],
		}, {
			label : 'Disqus comments',
			name  : 'disqus',
			widget: 'object',
			fields: [{
				label : 'Enable?',
				name  : 'enable',
				widget: 'boolean',
			}, {
				label : 'Shortname',
				name  : 'shortname',
				widget: 'string',
			}],
		}, {
			label : 'Search',
			name  : 'search',
			widget: 'object',
			fields: [{
				label : 'Enable',
				name  : 'enable',
				widget: 'boolean',
				hint  : `Make sure you also add an environment variable in Netlify \`deploys\`
				settings page. The environment variable must be called ALGOLIA_ADMIN_API_KEY. If
				you're not usong Netlify to deploy you need to make sure this ENV var is set
				when your site is built otherwise it won't be able to manage the search index
				and your website will fail to build. The value of this ENV var must hold your 
				Algolia admin api key.`,

			}, {
				label : 'Algolia',
				name  : 'algolia',
				widget: 'object',
				fields: [{
					label : 'App id',
					name  : 'appId',
					widget: 'string',
				}, {
					label : 'Index name',
					name  : 'indexName',
					widget: 'string',
				}, {
					label : 'Search key',
					name  : 'searchKey',
					widget: 'string',
				}],
			}],
		}, {
			label : 'RSS Feed',
			name  : 'rssFeed',
			widget: 'object',
			fields: [{
				label : 'Enable',
				name  : 'enable',
				widget: 'boolean',
			}],
		}],
	}],
};

export const authorsCollection = {
	name          : 'authors',
	preview       : true,
	label         : 'Authors',
	label_singular: 'Author',
	folder        : 'static/content/collections/authors',
	create        : true,
	allow_add     : false,
	fields        : [{
		label : 'Name',
		name  : 'title',
		widget: 'string',
	}, {
		label  : 'Excerpt',
		name   : 'excerpt',
		widget : 'markdown',
		buttons: [
			'bold',
			'italic',
		],
	}, {
		label : 'Avatar',
		name  : 'avatar',
		widget: 'image',
	}],
};

export const categoriesCollection = {
	name          : 'categories',
	preview       : false,
	label         : 'Categories',
	label_singular: 'Category',
	folder        : 'static/content/collections/categories',
	create        : true,
	allow_add     : false,
	fields        : [{
		label : 'Tag',
		name  : 'title',
		widget: 'string',
	}, {
		label : 'Excerpt',
		name  : 'excerpt',
		widget: 'text',
	}, {
		label   : 'Header Image',
		name    : 'header',
		widget  : 'object',
		required: false,
		fields  : [{
			label   : 'Image',
			name    : 'image',
			widget  : 'image',
			required: false,
		}, {
			label   : 'Alt text',
			name    : 'alt',
			widget  : 'string',
			required: false,
		}, {
			label : 'Meta',
			name  : 'meta',
			widget: 'object',
			fields: [{
				label   : 'Meta keywords',
				name    : 'keywords',
				widget  : 'string',
				required: false,
			}, {
				label   : 'Meta description',
				name    : 'description',
				widget  : 'string',
				required: false,
				hint    : 'If left empty we will use the excerpt insteads',
			}],
		}],
	}],
};

export const postsCollection = {
	name          : 'posts',
	label         : 'Posts',
	label_singular: 'Post',
	folder        : 'static/content/collections/posts',
	create        : true,
	slug          : '{{slug}}',
	sort          : 'created_at:desc',
	fields        : [{
		label : 'Title',
		name  : 'title',
		widget: 'string',
	}, {
		label : 'Publish Date',
		name  : 'created_at',
		widget: 'datetime',
	}, {
		label  : 'Body',
		name   : 'body',
		widget : 'markdown',
		buttons: [
			'bold',
			'italic',
			'link',
			'quote',
			'bulleted-list',
			'numbered-list',
		],
	}, {
		label : 'Tags',
		name  : 'tags',
		widget: 'list',
		hint  : 'Comma separated list of tags',
	}, {
		//	currently Netlify-CMS does not allow for a 1-m relation
		//	but they will implement so I'll let this field on the
		//	"plural" side until we can do something and add more
		//	authors to a post
		label        : 'Authors',
		name         : 'authors',
		widget       : 'relation',
		collection   : 'authors',
		searchFields : ['title'],
		valueField   : 'title',
		displayFields: ['title'],
	}, {
		label        : 'Categories',
		name         : 'categories',
		widget       : 'relation',
		collection   : 'categories',
		searchFields : ['title', 'excerpt'],
		valueField   : 'title',
		displayFields: ['title'],
	}, {
		label : 'Meta',
		name  : 'meta',
		widget: 'object',
		fields: [{
			label   : 'Meta keywords',
			name    : 'keywords',
			widget  : 'string',
			required: false,
		}, {
			label   : 'Meta description',
			name    : 'description',
			widget  : 'string',
			required: false,
			hint    : 'If left empty we will use the excerpt instead',
		}],
	}, {
		label   : 'Is page?',
		name    : 'isPage',
		widget  : 'boolean',
		required: false,
		default : false,
	}, {
		label   : 'Show author?',
		name    : 'showAuthor',
		widget  : 'boolean',
		required: false,
		default : true,
	}, {
		label   : 'Is featured?',
		name    : 'isFeatured',
		widget  : 'boolean',
		required: false,
		default : false,
	}, {
		label   : 'Sidebar pinning',
		name    : 'pinSidebar',
		widget  : 'object',
		required: false,
		hint    : `Alter these rules to pin a post to the sidebar of your blog. A pinned
		post can be used to drive traffic to a post which can be a sales page, product intro or
		just about anything that you want to promote. NOTICE: a maximum of two (2) posts can be
		pinned to the sidebar`,
		fields  : [{
			label   : 'Enable?',
			name    : 'enable',
			widget  : 'boolean',
			required: true,
			default : false,
		}, {
			label        : 'Target categories',
			name         : 'categories',
			widget       : 'relation',
			collection   : 'categories',
			searchFields : ['title', 'excerpt'],
			valueField   : 'title',
			displayFields: ['title'],
			required     : true,
			hint         : `Select the category where this post should appear in the sidebar. 
			WARNING: A current limitation in the CMS does not allow selecting multiple categories`,
		}],
	}, {
		label   : 'Hero',
		name    : 'hero',
		widget  : 'object',
		required: false,
		fields  : [{
			label   : 'Image',
			name    : 'image',
			widget  : 'image',
			required: false,
		}, {
			label   : 'Alt text',
			name    : 'alt',
			widget  : 'string',
			required: false,
		}],
	}, {
		label : 'Excerpt',
		name  : 'excerpt',
		widget: 'text',
	}],
};
