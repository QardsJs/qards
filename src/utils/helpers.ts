import {sortBy, each} from 'lodash';
import {readingTime as rTime} from 'reading-time-estimator';
import {PostType} from '../fragments/post';
import {CategoryType} from '../templates/category';
import {CardHeaderType} from '../components/qard/header';
import {decodeWidgetDataObject} from '../cms/utils';
import Immutable from 'immutable';
import {format} from 'date-fns';

let settingsConfig = require('../../static/config/settings.json');
let postsConfig = require('../../static/config/posts.json');
let pluginsConfig = require('../../static/config/plugins.json');
let themeConfig = require('../../static/config/theme.json');

export const cPattern = /^{"widget":"([a-zA-Z0-9-]+)","config":"(.*?)"}$/;
export const cPatternWithId = (id: string): string => {
	return `{"widget":"${id}","config":"(.*?)"}`;
};

export function lineRepresentsEncodedComponent(line: string) {
	if (!line || line.replace(/\s+/g, '') === '') return false;
	return RegExp(cPattern).test(line);
}

export function prependBaseUrl(path: string): string {
	return [getSettingsConfig(['baseUrl']), path].join('');
}

export const Base64 = {
	// private property
	_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

	// public method for encoding
	, encode : function(input: string) {
		let output = '';
		let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		let i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		} // Whend

		return output;
	}, decode: function(input: string) {
		let output = '';
		let chr1, chr2, chr3;
		let enc1, enc2, enc3, enc4;
		let i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		while (i < input.length) {
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}

			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		} // Whend

		output = Base64._utf8_decode(output);

		return output;
	} // End Function decode


	// private method for UTF-8 encoding
	, _utf8_encode: function(string: string) {
		let utftext = '';
		string = string.replace(/\r\n/g, '\n');

		for (let n = 0; n < string.length; n++) {
			let c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		} // Next n

		return utftext;
	} // End Function _utf8_encode

	// private method for UTF-8 decoding
	, _utf8_decode: function(utftext: string) {
		let string = '';
		let i = 0;
		let c, c1, c2, c3;
		c = c1 = c2 = 0;

		while (i < utftext.length) {
			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		} // Whend

		return string;
	}, // End Function _utf8_decode

};

export function getPostPrimaryHeadings(markdown: string): any {
	const headings: CardHeaderType[] = [];

	markdown.split('\n').map((line, k) => {
		if (lineRepresentsEncodedComponent(line)) {
			const params = line.match(cPattern);
			if (!params || params.length < 3) return;

			if (params[1] == 'qards-section-heading') {
				headings.push(decodeWidgetDataObject(params[2]));
			}
		}
	});

	return headings.filter((h) => h.type === 'primary');
}

/**
 * There are some tokens that we can use (currently only in the title and excerpt sections) as
 * placeholders to be swapped when building the site. For example the `cardsNum` token may be
 * used in titles where an enumeration is needed:
 *
 * `{cardsNum} tools to help you writing - which enforces you to use each card to display such a tool -
 * not perfect but good to have
 */
export function tokenizePost(post: PostType): PostType {
	const tokens = [
		{
			//  Will replace the token `{cardsNum}` with the number of cards found in this post
			perform: (input: string): string => {
				return input.replace('{cardsNum}', `${getPostPrimaryHeadings(post.md).length}`);
			},
		}, {
			//  Will replace the token with a `createdAt` derrived date (the date format is specified)
			//  using a formatter that is applied with date-fns
			perform: (input: string): string => {
				const r = /{createdAt:([a-zA-Z0-9-_:]+)}/i;
				const match = r.exec(input);

				if (!match) return input;
				const dtFormat = match[1];
				return input.replace(r, format(new Date(post.frontmatter.created_at), dtFormat));
			},
		}, {
			//  Will replace the token with derrived date (from current date) (the date format is specified)
			//  using a formatter that is applied with date-fns
			perform: (input: string): string => {
				const r = /{currentDate:([a-zA-Z0-9-_:]+)}/i;
				const match = r.exec(input);

				if (!match) return input;
				const dtFormat = match[1];
				return input.replace(r, format(new Date(), dtFormat));
			},
		},
	];

	for (let i = 0; i < tokens.length; i++) {
		post.frontmatter.title = tokens[i].perform(post.frontmatter.title);
		post.frontmatter.excerpt = tokens[i].perform(post.frontmatter.excerpt);
	}

	return post;
}

export function slugify(text: string) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}\[\]\\\/]+/g, '')       // Remove all non-word chars
		.replace(/--+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '')// Trim - from end of text
		.trim();
}

export interface PopularCategoriesCategory {
	category: CategoryType;
	occurence: number;
}

/**
 * Receives the query results that extracts the most popular
 * categories and formats the data in a group-by style saving
 * some counters along he way
 */
export function getPopularCategories(categories: CategoryType[]): PopularCategoriesCategory[] {
	const res: PopularCategoriesCategory[] = [];

	each(categories, (category) => {
		// find if it's already added and if it is,
		// just increase the counter it has
		let found = false;

		each(res, (existing, k) => {
			if (existing.category.id == category.id) {
				found = true;
				res[k].occurence += 1;
			}
		});

		if (!found) {
			res.push({
				occurence: 1,
				category : category,
			});
		}
	});

	//  Sort by occurence descending and return
	return sortBy(res, 'occurence').reverse();
}

/**
 * Will return an array of node values from edges and stuff
 * returned by a graphql query of multiple children
 */
export function extractNodesFromEdges(edges: any, path: string = ''): any {
	const res: any = [];

	each(edges, e => {
		if (path == '') {
			res.push(e.node);
		} else {
			if (e.node[path]) {
				for (let i = 0; i < e.node[path].length; i++) {
					res.push(e.node[path][i]);
				}
			}
		}
	});

	return res;
}

interface rTimeResponse {
	text?: string;
	time?: number;
	words?: number;
	minutes?: number;
}

export function readingTime(markdown: string): rTimeResponse {
	const text = markdown.split('\n').filter(
		line => !lineRepresentsEncodedComponent(line)).join('\n');
	//	make sure there's at least one latin char in your string otherwise we get
	//	a funny error from our estimator which complains with a `Data provided is invalid`
	return rTime(`a${text}`);
}

export function getConfig(path: string[]): string {
	const cfg = path.shift();

	switch (cfg) {
		case 'theme':
			return Immutable.fromJS(themeConfig).getIn(path);
		case 'posts':
			return Immutable.fromJS(postsConfig).getIn(path);
		case 'plugins':
			return Immutable.fromJS(pluginsConfig).getIn(path);
		default:
			return Immutable.fromJS(settingsConfig).getIn(path);
	}
}

export function normalizeCfgPath(path: string | string[]): string[] {
	return (typeof path === 'string') ? [path] : path;
}

export function getThemeConfig(path: string[] | string, defaultValue?: any): any {
	path = normalizeCfgPath(path);
	path.unshift('theme');
	const val = getConfig(path);
	if (typeof val === 'undefined') {
		return defaultValue;
	}
	return val;
}

export function getPostsConfig(path: string[] | string, defaultValue?: any): any {
	path = normalizeCfgPath(path);
	path.unshift('posts');
	const val = getConfig(path);
	if (typeof val === 'undefined') {
		return defaultValue;
	}
	return val;
}

export function getSettingsConfig(path: string[] | string, defaultValue?: any): any {
	path = normalizeCfgPath(path);
	path.unshift('settings');
	const val = getConfig(path);
	if (typeof val === 'undefined') {
		return defaultValue;
	}
	return val;
}

export function getPluginsConfig(path: string[] | string, defaultValue?: any): any {
	path = normalizeCfgPath(path);
	path.unshift('plugins');

	const val = getConfig(path);

	if (typeof val === 'undefined') {
		return defaultValue;
	}
	return val;
}
