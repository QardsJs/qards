import _ from "lodash";
import rTime from "reading-time";
import {Category as CategoryProps, Post as PostProps} from "../templates/types";
import moment from "moment";


/**
 * There are some tokens that we can use (currently only in the title and excerpt sections) as
 * placeholders to be swapped when building the site. For example the `cardsNum` token may be
 * used in titles where an enumeration is needed:
 *
 * `{cardsNum} tools to help you writing - which enforces you to use each card to display such a tool -
 * not perfect but good to have
 */
export function tokenizePost(post: PostProps): PostProps {
    const tokens = [
        {
            //  Will replace the token `{cardsNum}` with the number of cards found in this post
            perform: (input: string): string => {
                return input.replace("{cardsNum}", `${post.cards.length}`);
            }
        }, {
            //  Will replace the token with a `createdAt` derrived date (the date format is specified)
            //  using a formatter that is applied with moment
            perform: (input: string): string => {
                const r = /{createdAt:([a-zA-Z0-9-_:]+)}/i;
                const match = r.exec(input);

                if (!match) return input;
                const format = match[1];
                return input.replace(r, moment(post.createdAt).format(format));
            }
        }, {
            //  Will replace the token with a `updatedAt` derrived date (the date format is specified)
            //  using a formatter that is applied with moment
            perform: (input: string): string => {
                const r = /{updatedAt:([a-zA-Z0-9-_:]+)}/i;
                const match = r.exec(input);

                if (!match) return input;
                const format = match[1];
                return input.replace(r, moment(post.updatedAt).format(format));
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
        post.title = tokens[i].perform(post.title);
        post.excerpt = tokens[i].perform(post.excerpt);

        for (let j = 0; j < post.cards.length; j++) {
            const card = post.cards[j];

            for (let k = 0; k < card.headers.length; k++) {
                post.cards[j].headers[k].title = tokens[i].perform(post.cards[j].headers[k].title);

                if (post.cards[j].headers[k].subtitle) {
                    post.cards[j].headers[k].subtitle = tokens[i].perform(`${post.cards[j].headers[k].subtitle}`);
                }
            }
        }
    }

    return post;
}

export interface PopularCategoriesCategory {
    category: CategoryProps;
    occurence: number;
}

/**
 * Receives the query results that extracts the most popular
 * categories and formats the data in a group-by style saving
 * some counters along he way
 */
export function getPopularCategories(categories: CategoryProps[]): PopularCategoriesCategory[] {
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
                category: category
            })
        }
    });

    //  Sort by occurence descending and return
    return _.sortBy(res, 'occurence').reverse();
}

export function getPostUrlPath(p: PostProps): string {
    return `/posts/${p.slug}/`;
}

/**
 * Will return an array of node values from edges and stuff
 * returned by a grapql query of multiple children
 */
export function extractNodesFromEdges(edges: any, path: string): any {
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
    text: string;
    time: number;
    words: number;
    minutes: number;
}

export function readingTime(post: PostProps): rTimeResponse {
    const headers = [];
    const paragraphs: string[] = [];
    const content = [];

    for (let i = 0; i < post.cards.length; i++) {
        const card = post.cards[i];
        const h = card.headers || [];
        const p = card.paragraphs || [];

        for (let i = 0; i < h.length; i++) {
            headers.push(h[i].title);
            headers.push(h[i].subtitle);
        }

        for (let i = 0; i < p.length; i++) {
            paragraphs.push(p[i].text.text);
        }
    }

    if (headers.length > 0) content.push(headers.join(" "));
    if (paragraphs.length > 0) content.push(paragraphs.join(" "));

    return rTime(content.join(" "));
}