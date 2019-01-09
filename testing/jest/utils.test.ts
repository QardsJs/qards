// @ts-ignore
import {Base64} from 'js-base64';
import * as helpers from '../../src/utils/helpers';
import {CategoryType} from '../../src/templates/category';
import {PostType} from '../../src/fragments/post';

//	I HAVE NO IDEA WHAT THESE CHINESE WORDS MEAN. NO HATE PLEASE! :)
test('[slugify] non-latin characters are not stripped out', () => {
	expect(helpers.slugify('寻找罪魁祸首')).toBe('寻找罪魁祸首');
});

test('[slugify] multiple repetitive dashes should be replaced with a single one', () => {
	expect(helpers.slugify('寻-找-罪--魁-祸首')).toBe('寻-找-罪-魁-祸首');
});

test('[slugify] non-word characters should be filtered out', () => {
	expect(helpers.slugify('寻!-找-$罪--魁-祸首@')).toBe('寻-找-罪-魁-祸首');
});

test('[slugify] dashes should be trimmed from start or finish', () => {
	expect(helpers.slugify('-寻!-找-$罪--魁-祸首@-')).toBe('寻-找-罪-魁-祸首');
});

test('[slugify] spaces should be trimmed from start or finish', () => {
	expect(helpers.slugify(' -寻!-找-$罪--魁-祸首@- ')).toBe('寻-找-罪-魁-祸首');
});

test('[Base64] should encode without errors', () => {
	expect(Base64.encode('寻找罪魁祸首')).toBe('5a+75om+572q6a2B56W46aaW');
	expect(Base64.encode(
		'{"title":"Get a quality microphone","type":"secondary"}')).toBe(
		'eyJ0aXRsZSI6IkdldCBhIHF1YWxpdHkgbWljcm9waG9uZSIsInR5cGUiOiJzZWNvbmRhcnkifQ==',
	);
});

test('[Base64] should decode without errors', () => {
	expect(Base64.decode('5a+75om+572q6a2B56W46aaW')).toBe('寻找罪魁祸首');
	expect(Base64.decode(
		'eyJ0aXRsZSI6IkdldCBhIHF1YWxpdHkgbWljcm9waG9uZSIsInR5cGUiOiJzZWNvbmRhcnkifQ==')).toBe(
		'{"title":"Get a quality microphone","type":"secondary"}',
	);
});

test('[Base64] encodes and decodes with same result', () => {
	const input = `寻找罪魁祸首-我一得到任何消息，就立刻给你发短信`;
	const output = `5a+75om+572q6a2B56W46aaWLeaIkeS4gOW+l+WIsOS7u+S9lea2iOaBr++8jOWwseeri+WIu+e7meS9oOWPkeefreS/oQ==`;
	expect(Base64.encode(input)).toBe(output);
	expect(Base64.decode(output)).toBe(input);
});

test('[normalizeCfgPath] should return an array if a string is passed', () => {
	expect(helpers.normalizeCfgPath('a')).toEqual(['a']);
});

test('[extractNodesFromEdges] should extract nodes from...yeah...edges', () => {
	expect(helpers.extractNodesFromEdges([{
		node: 'foo',
	}])).toEqual(['foo']);

	expect(helpers.extractNodesFromEdges([{
		node: {
			foo: ['bar'],
		},
	}], 'foo')).toEqual(['bar']);
});

test('[readingTime] should return proper values', () => {
	expect(helpers.readingTime('a')).toEqual({
		'minutes': 0.002,
		'text'   : 'less than a minute read',
		'time'   : 120,
		'words'  : 1,
	});

	expect(helpers.readingTime('寻找罪魁祸首')).toEqual({
		'minutes': 0.002,
		'text'   : 'less than a minute read',
		'time'   : 120,
		'words'  : 1,
	});

	let longT = '';
	for (let i = 0; i < 900; i++) {
		longT += `\nIn the last delivery (2.2.1) a correction was made on the index.d.ts which is making the Typescript import`;
	}

	expect(helpers.readingTime(longT)).toEqual({
		'minutes': 32.402,
		'text'   : '32 min. read',
		'time'   : 1944120.0000000002,
		'words'  : 16201,
	});

	let utfLongT = '';
	for (let i = 0; i < 900; i++) {
		utfLongT += `\n寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首 寻找罪魁祸首`;
	}

	expect(helpers.readingTime(utfLongT)).toEqual({
		'minutes': 18,
		'text'   : '18 min. read',
		'time'   : 1080000,
		'words'  : 9000,
	});
});

test('[lineRepresentsEncodedComponent] should should detect encoded component', () => {
	const l = `{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkF1ZGlvIHBsYXlsaXN0Iiwic3VidGl0bGUiOiJBbiBhdWRpbyBwbGF5bGlzdCBjYW4gY29udGFpbiBvbmUgb3IgbXVsdGlwbGUgYXVkaW8gZmlsZXMiLCJ0eXBlIjoicHJpbWFyeSJ9"}`;
	expect(helpers.lineRepresentsEncodedComponent(l)).toBe(true);
	expect(helpers.lineRepresentsEncodedComponent(`-${l}`)).toBe(true);
});

test('[getPostPrimaryHeadings] should return primary headings', () => {
	const md = `
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkF1ZGlvIHBsYXlsaXN0Iiwic3VidGl0bGUiOiJBbiBhdWRpbyBwbGF5bGlzdCBjYW4gY29udGFpbiBvbmUgb3IgbXVsdGlwbGUgYXVkaW8gZmlsZXMiLCJ0eXBlIjoicHJpbWFyeSJ9"}
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkF1ZGlvIHBsYXlsaXN0Iiwic3VidGl0bGUiOiJBbiBhdWRpbyBwbGF5bGlzdCBjYW4gY29udGFpbiBvbmUgb3IgbXVsdGlwbGUgYXVkaW8gZmlsZXMiLCJ0eXBlIjoicHJpbWFyeSJ9"}
	`;

	expect(helpers.getPostPrimaryHeadings(md).length).toBe(2);
});

test('[tokenizePost] should replace specified tokens with provided values', () => {
	let p: PostType = {
		id         : 'test',
		frontmatter: {
			title     : 'test',
			created_at: new Date().toUTCString(),
			excerpt   : 'test',
			hero      : {
				alt  : 'test',
				image: {
					thumb: {
						alt: 'asd',
					},
					sharp: {
						alt: 'asd',
					},
				},
			},
			isFeatured: false,
			isPage    : false,
			meta      : {
				description: '',
				keywords   : '',
			},
			showAuthor: true,
			tags      : ['asd'],
		},
		authors    : [],
		categories : [],
		fields     : {
			audios   : [],
			galleries: [],
			images   : [],
			slug     : 'asd',
		},
		md         : '',
		html       : '',
		references : [],
	};

	expect(helpers.tokenizePost(p)).toEqual(p);

	p.frontmatter.title = '{cardsNum} number of cards';
	expect(helpers.tokenizePost(p).frontmatter.title).toEqual('0 number of cards');


	p.frontmatter.title = '{cardsNum} number of cards';
	p.frontmatter.excerpt = '{cardsNum} number of cards';
	p.md = `
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkF1ZGlvIHBsYXlsaXN0Iiwic3VidGl0bGUiOiJBbiBhdWRpbyBwbGF5bGlzdCBjYW4gY29udGFpbiBvbmUgb3IgbXVsdGlwbGUgYXVkaW8gZmlsZXMiLCJ0eXBlIjoicHJpbWFyeSJ9"}
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkF1ZGlvIHBsYXlsaXN0Iiwic3VidGl0bGUiOiJBbiBhdWRpbyBwbGF5bGlzdCBjYW4gY29udGFpbiBvbmUgb3IgbXVsdGlwbGUgYXVkaW8gZmlsZXMiLCJ0eXBlIjoicHJpbWFyeSJ9"}
	`;
	expect(helpers.tokenizePost(p).frontmatter.title).toBe('2 number of cards');
	expect(helpers.tokenizePost(p).frontmatter.excerpt).toBe('2 number of cards');


	p.frontmatter.title = '{createdAt:yyyy} is the year the article was written';
	p.frontmatter.excerpt = '{createdAt:yyyy} is the year the article was written';
	expect(helpers.tokenizePost(p).frontmatter.title).toBe('2019 is the year the article was written');
	expect(helpers.tokenizePost(p).frontmatter.excerpt).toBe('2019 is the year the article was written');


	p.frontmatter.title = '{currentDate:yyyy} is current year';
	p.frontmatter.excerpt = '{currentDate:yyyy} is current year';
	expect(helpers.tokenizePost(p).frontmatter.title).toBe('2019 is current year');
	expect(helpers.tokenizePost(p).frontmatter.excerpt).toBe('2019 is current year');

});

test('[getPopularCategories] should return categories ordered by occurence', () => {
	const c1 = {
		id         : 'test',
		fields     : {
			slug: 'test',
		},
		frontmatter: {
			excerpt: 'test',
			title  : 'test',
		},
	};

	const c2 = {
		id         : 'test2',
		fields     : {
			slug: 'test2',
		},
		frontmatter: {
			excerpt: 'test2',
			title  : 'test2',
		},
	};

	const c3 = {
		id         : 'test3',
		fields     : {
			slug: 'test3',
		},
		frontmatter: {
			excerpt: 'test3',
			title  : 'test3',
		},
	};
	const categories: CategoryType[] = [c1, c2, c3, c1, c1, c3];

	//	We expect them to be ordered by occurences descending
	expect(helpers.getPopularCategories(categories)).toEqual([{
		category : c1,
		occurence: 3,
	}, {
		category : c3,
		occurence: 2,
	}, {
		category : c2,
		occurence: 1,
	}]);
});

//	getThemeConfig
test('[getThemeConfig] should return the requested value', () => {
	expect(helpers.getThemeConfig(['colors', 'intents', 'success', 'text'])).toBe('#2fb57d');
	expect(helpers.getThemeConfig(['colors', 'intents', 'success', 'background'])).toBe('#B5F3D9');

	expect(helpers.getThemeConfig(['colors', 'intents', 'warning', 'text'])).toBe('#ffa000');
	expect(helpers.getThemeConfig(['colors', 'intents', 'warning', 'background'])).toBe('#FFECCE');

	expect(helpers.getThemeConfig(['colors', 'intents', 'danger', 'text'])).toBe('#f74444');
	expect(helpers.getThemeConfig(['colors', 'intents', 'danger', 'background'])).toBe('#FFD9D9');

	expect(helpers.getThemeConfig(['colors', 'primary', 'text'])).toBe('#ffffff');
	expect(helpers.getThemeConfig(['colors', 'primary', 'background'])).toBe('#192633');

	expect(helpers.getThemeConfig(['colors', 'secondary', 'text'])).toBe('#192531');
	expect(helpers.getThemeConfig(['colors', 'secondary', 'background'])).toBe('#becbd4');

	expect(helpers.getThemeConfig(['colors', 'accent', 'text'])).toBe('#ffffff');
	expect(helpers.getThemeConfig(['colors', 'accent', 'background'])).toBe('#3ea38f');

	expect(helpers.getThemeConfig(['colors', 'secondaryAccent', 'text'])).toBe('#ffffff');
	expect(helpers.getThemeConfig(['colors', 'secondaryAccent', 'background'])).toBe('#F432AC');

	expect(helpers.getThemeConfig(['colors', 'faded', 'text'])).toBe('#192533');
	expect(helpers.getThemeConfig(['colors', 'faded', 'background'])).toBe('#ecf0f3');

	expect(helpers.getThemeConfig(['colors', 'text'])).toBe('#2c2c2c');
	expect(helpers.getThemeConfig(['colors', 'lightText'])).toBe('#5a6c7a');
	expect(helpers.getThemeConfig(['colors', 'borders'])).toBe('#dde6eb');

	expect(helpers.getThemeConfig(['colors']).keySeq().toArray().length).toBe(9);
	expect(helpers.getThemeConfig(['colors', 'intents']).keySeq().toArray().length).toBe(3);

	expect(helpers.getThemeConfig(['colors', 'intents', 'success']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'intents', 'warning']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'intents', 'danger']).keySeq().toArray().length).toBe(2);

	expect(helpers.getThemeConfig(['colors', 'primary']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'secondary']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'accent']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'secondaryAccent']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'secondaryAccent']).keySeq().toArray().length).toBe(2);
	expect(helpers.getThemeConfig(['colors', 'faded']).keySeq().toArray().length).toBe(2);
});

test('[getThemeConfig] should return a provided default if requested not available', () => {
	expect(helpers.getThemeConfig('foobar', 'bar')).toBe('bar');
});

test('[getThemeConfig] should accept array or string', () => {
	expect(helpers.getThemeConfig('colors').keySeq().toArray().length).toBe(9);
	expect(helpers.getThemeConfig(['colors']).keySeq().toArray().length).toBe(9);
});

//	getPostsConfig
test('[getPostsConfig] should return the requested value', () => {
	expect(helpers.getPostsConfig(['frontLimit'])).toBe(12);
	expect(helpers.getPostsConfig(['progressShow'])).toBe(true);
	expect(helpers.getPostsConfig(['tocShow'])).toBe(true);
	expect(helpers.getPostsConfig(['socialShow'])).toBe(true);
	expect(helpers.getPostsConfig(['subscribeShow'])).toBe(true);
	expect(helpers.getPostsConfig(['slugStructure'])).toBe('{{slug}}');
	expect(helpers.getPostsConfig(['pathPrefix'])).toBe('/posts');

});

test('[getPostsConfig] should accept array or string', () => {
	expect(helpers.getPostsConfig('frontLimit')).toBe(12);
	expect(helpers.getPostsConfig(['frontLimit'])).toBe(12);
});

test('[getPostsConfig] should return a provided default if requested not available', () => {
	expect(helpers.getPostsConfig('foobar', 'bar')).toBe('bar');
});


//	getSettingsConfig
test('[getSettingsConfig] should return the requested value', () => {
	expect(helpers.getSettingsConfig(['name'])).toBe('qards');
	expect(helpers.getSettingsConfig(['title'])).toBe('Qards - the blogging platform for professionals');
	expect(helpers.getSettingsConfig(['excerpt'])).toBe('Qards is a blogging platform for professionals');
	expect(helpers.getSettingsConfig(['baseUrl'])).toBe('https://affectionate-hamilton-12254a.netlify.com');
	expect(helpers.getSettingsConfig(['performanceMode'])).toBe(false);
	expect(helpers.getSettingsConfig(['logo'])).toBe('/images/uploads/logo.png');
	expect(helpers.getSettingsConfig(['socialShareImg'])).toBe('/images/uploads/andrew-ridley-76547-unsplash.jpg');

	expect(helpers.getSettingsConfig(['typography', 'fontSize'])).toBe('15px');
	expect(helpers.getSettingsConfig(['typography', 'bodyFontFamily'])).toBe('Roboto');
	expect(helpers.getSettingsConfig(['typography', 'baseLineHeight'])).toBe(1);
	expect(helpers.getSettingsConfig(['typography', 'headerFontFamily'])).toBe('Roboto');
	expect(helpers.getSettingsConfig(['typography', 'npmPackage'])).toBe('typeface-roboto');

	expect(helpers.getSettingsConfig(['fallbackFont'])).toBe('arial');
});

test('[getSettingsConfig] should accept array or string', () => {
	expect(helpers.getSettingsConfig('fallbackFont')).toBe('arial');
	expect(helpers.getSettingsConfig(['fallbackFont'])).toBe('arial');
});

test('[getSettingsConfig] should return a provided default if requested not available', () => {
	expect(helpers.getSettingsConfig('foobar', 'bar')).toBe('bar');
});

//	getPluginsConfig
test('[getPluginsConfig] should return the requested value', () => {
	expect(helpers.getPluginsConfig(['tracking', 'enable'])).toBe(false);
	expect(helpers.getPluginsConfig(['tracking', 'analytics', 'trackingId'])).toBe('');

	expect(helpers.getPluginsConfig(['emailSubscribers', 'enable'])).toBe(false);
	expect(helpers.getPluginsConfig(['emailSubscribers', 'mailchimp', 'endpoint'])).toBe('');

	expect(helpers.getPluginsConfig(['disqus', 'enable'])).toBe(false);
	expect(helpers.getPluginsConfig(['disqus', 'shortname'])).toBe('');

	expect(helpers.getPluginsConfig(['rssFeed', 'enable'])).toBe(true);

	expect(helpers.getPluginsConfig(['search', 'enable'])).toBe(false);
	expect(helpers.getPluginsConfig(['search', 'algolia', 'appId'])).toBe('');
	expect(helpers.getPluginsConfig(['search', 'algolia', 'indexName'])).toBe('');
	expect(helpers.getPluginsConfig(['search', 'algolia', 'searchKey'])).toBe('');
});

test('[getPluginsConfig] should accept array or string', () => {
	expect(helpers.getPluginsConfig(['rssFeed']).get('enable')).toBe(true);
	expect(helpers.getPluginsConfig('rssFeed').get('enable')).toBe(true);
});

test('[getPluginsConfig] should return a provided default if requested not available', () => {
	expect(helpers.getPluginsConfig('foobar', 'bar')).toBe('bar');
});
