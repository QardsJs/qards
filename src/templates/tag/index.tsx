import React from 'react';

import {graphql} from 'gatsby';

import TagsPage from '../../components/pages/tags';
import Route from '../../components/common/route';
import {extractNodesFromEdges, getPostsConfig} from '../../utils/helpers';
import {PostType} from '../../fragments/post';
import PostsRoute from '../../components/pages/posts';

interface DataProps {
	posts: {
		totalCount: number;
		edges: {
			node: PostType;
		}[];
	};

	featured: {
		edges: {
			node: PostType
		}[];
	};
}

interface Props {
	data: DataProps;
	pageContext: {
		tag: string;
		slug: string;
		numPages: number;
		currentPage: number;
	};
}

interface State {

}

export default class TagTemplate extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>, State> {
	render() {
		const {data, pageContext} = this.props;
		const {tag, slug} = pageContext;
		const {featured, posts} = data;

		const {currentPage, numPages} = pageContext;

		const isFirst = currentPage === 1;
		const isLast = currentPage === numPages;

		const postsExtracted = posts && posts.edges && posts.edges.length ? extractNodesFromEdges(posts.edges) : [];

		const pathPrefix = `/tag/${slug}`;
		const prevPage = pathPrefix + '/' + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString());
		const nextPage = pathPrefix + '/' + ((currentPage + 1).toString());

		let path = pathPrefix;
		if (currentPage != 1) {
			path += `/${currentPage}`;
		}

		return <Route
			path={path}
			component={TagsPage}
			totalCount={posts ? posts.totalCount : 0}
			tag={tag}
			posts={postsExtracted}
			featured={featured ? extractNodesFromEdges(featured.edges, '') : []}
			pagination={{isLast, isFirst, numPages, prevPage, nextPage, currentPage}}
		/>;
	}
}

export const query = graphql`
	query($tag: String!, $skip: Int!, $limit: Int!) {
		posts: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			limit: $limit,
			skip: $skip,
			filter: {
				fileAbsolutePath: {
					regex: "//static/content/collections/posts//"
				},
				frontmatter: {
					tags: {
						in: [$tag]
					}
				}
			}
		) {
			totalCount
			edges {
				node {
					...postFragment
				}
			}
		}
		
		featured: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			filter: {
				fileAbsolutePath: {
					regex: "//static/content/collections/posts//"
				},
				frontmatter: {
					tags: {
						in: [$tag]
					}, 
					isFeatured: {
						eq: true
					}
				}
			}
		) {
			edges {
				node {
					...postFragment
				}
			}
		}
	}
`;
