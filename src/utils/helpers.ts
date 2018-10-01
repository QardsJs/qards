import _ from "lodash";
import rTime from "reading-time";
import { PostType } from "../fragments/post";
import moment from "moment";
import { CategoryType } from "../templates/category";
import { CardHeaderType } from "../components/qard/header";
import { decodeWidgetDataObject } from "../cms/utils";
import Immutable from "immutable";

import settingsConfig from "../../static/config/settings.json";
import postsConfig from "../../static/config/posts.json";
import pluginsConfig from "../../static/config/plugins.json";
import themeConfig from "../../static/config/theme.json";

export const cPatternWithId = (id: string): string => {
	return `{"widget":"${id}","config":"([0-9a-zA-Z+/=]+?)"}`;
};
export const cPattern = /{"widget":"([a-zA-Z0-9-]+)","config":"([0-9a-zA-Z+/=]+?)"}/;

export function lineRepresentsEncodedComponent(line: string) {
	if (!line || line.replace(/\s+/g, "") === "") return false;
	return RegExp(cPattern).test(line);
}

export function getPostPrimaryHeadings(post: PostType): CardHeaderType[] {
	const headings: CardHeaderType[] = [];

	post.md.split("\n").map((line, k) => {
		if (lineRepresentsEncodedComponent(line)) {
			const params = line.match(cPattern);
			if (!params || params.length < 3) return;

			if (params[1] == "qards-section-heading") {
				headings.push(decodeWidgetDataObject(params[2]));
			}
		}
	});

	return headings;
}

export function prependBaseUrl(path: string): string {
	return [getSettingsConfig(["baseUrl"]), path].join("");
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
				return input.replace("{cardsNum}", `${getPostPrimaryHeadings(post).length}`);
			}
		}, {
			//  Will replace the token with a `createdAt` derrived date (the date format is specified)
			//  using a formatter that is applied with moment
			perform: (input: string): string => {
				const r = /{createdAt:([a-zA-Z0-9-_:]+)}/i;
				const match = r.exec(input);

				if (!match) return input;
				const format = match[1];
				return input.replace(r, moment(post.frontmatter.created_at).format(format));
			}
		}, {
			//  Will replace the token with derrived date (from current date) (the date format is specified)
			//  using a formatter that is applied with moment
			perform: (input: string): string => {
				const r = /{currentDate:([a-zA-Z0-9-_:]+)}/i;
				const match = r.exec(input);

				if (!match) return input;
				const format = match[1];
				return input.replace(r, moment().format(format));
			}
		}
	];

	for (let i = 0; i < tokens.length; i++) {
		post.frontmatter.title = tokens[i].perform(post.frontmatter.title);
		post.frontmatter.excerpt = tokens[i].perform(post.frontmatter.excerpt);
	}

	return post;
}

export function slugify(text: string) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, "-")           // Replace spaces with -
		.replace(/[^\w\-]+/g, "")       // Remove all non-word chars
		.replace(/\-\-+/g, "-")         // Replace multiple - with single -
		.replace(/^-+/, "")             // Trim - from start of text
		.replace(/-+$/, "");            // Trim - from end of text
}

export function deGatsbyFyContentfulId(id: string): string {
	//  if the contentful_id field starts with a number, Gatsby adds a `c` (letter) in front
	//  due to some bs I don't have the time to check so, if a c is followed by a number we
	//  have to remove that `c` in order to be able to query the real data
	const firstChar = id.charAt(0);
	const secondChar = id.charAt(1);

	if (firstChar == "c" && "0123456789".indexOf(secondChar) !== -1) {
		return id.substring(1);
	}
	return id;
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

	_.each(categories, (category) => {
		// find if it's already added and if it is,
		// just increase the counter it has
		let found = false;

		_.each(res, (existing, k) => {
			if (existing.category.id == category.id) {
				found = true;
				res[k].occurence += 1;
			}
		});

		if (!found) {
			res.push({
				occurence: 1,
				category : category
			});
		}
	});

	//  Sort by occurence descending and return
	return _.sortBy(res, "occurence").reverse();
}

/**
 * Will return an array of node values from edges and stuff
 * returned by a grapql query of multiple children
 */
export function extractNodesFromEdges(edges: any, path: string = ""): any {
	const res: any = [];

	_.each(edges, e => {
		if (path == "") {
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

export function readingTime(post: PostType): rTimeResponse {
	//return rTime(content.join(" "));
	return {};
}

export function getConfig(path: string[]): string {
	const cfg = path.shift();

	switch (cfg) {
		case "theme":
			return Immutable.fromJS(themeConfig).getIn(path);
		case "posts":
			return Immutable.fromJS(postsConfig).getIn(path);
		case "plugins":
			return Immutable.fromJS(pluginsConfig).getIn(path);
		default:
			return Immutable.fromJS(settingsConfig).getIn(path);
	}
}

function normalizeCfgPath(path: string | string[]): string[] {
	return (typeof path === "string") ? [path] : path;
}

export function getThemeConfig(path: string[] | string): any {
	path = normalizeCfgPath(path);
	path.unshift("theme");
	return getConfig(path);
}

export function getPostsConfig(path: string[] | string): any {
	path = normalizeCfgPath(path);
	path.unshift("posts");
	return getConfig(path);
}

export function getSettingsConfig(path: string[] | string): any {
	path = normalizeCfgPath(path);
	path.unshift("settings");
	return getConfig(path);
}

export function getPluginsConfig(path: string[] | string): any {
	path = normalizeCfgPath(path);
	path.unshift("plugins");
	return getConfig(path);
}