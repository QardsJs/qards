import React from 'react';
import {graphql} from 'gatsby';

import PostsRoute from '../components/pages/posts';

import Route from '../components/common/route';
import {PostType} from '../fragments/post';
import {extractNodesFromEdges, getPostsConfig} from '../utils/helpers';

interface Props {
	pageContext: {
		numPages: number;
		currentPage: number;
	}
	data: {
		latest: {
			edges: {
				node: PostType;
			}[];
		};
	}
}

interface State {

}

export default class PostsTemplate extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>, State> {
	render() {
		const {data, pageContext} = this.props;
		const {currentPage, numPages} = pageContext;

		const isFirst = currentPage === 1;
		const isLast = currentPage === numPages;

		const {latest} = data;
		const posts = latest ? extractNodesFromEdges(latest.edges) : [];

		const pathPrefix = getPostsConfig(['pathPrefix']);
		const prevPage = pathPrefix + '/' + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString());
		const nextPage = pathPrefix + '/' + ((currentPage + 1).toString());

		let path = pathPrefix;
		if (currentPage != 1) {
			path += `/${currentPage}`;
		}

		return <Route
			component={PostsRoute}
			posts={posts}
			path={path}
			pagination={{isLast, isFirst, numPages, prevPage, nextPage, currentPage}}
		/>;
	}
}

export const query = graphql`
	query PostsPageQuery($skip: Int!, $limit: Int!) {
		latest: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			limit: $limit,
			skip: $skip,
			filter: {
				fileAbsolutePath: {regex: "//static/content/collections/posts//"},
				frontmatter: {isPage: {ne: true}}
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
