import React from 'react';
import {graphql, StaticQuery} from 'gatsby';

import IndexRoute from '../components/pages/blog';
import Route from '../components/common/route';
import {PostType} from '../fragments/post';
import {extractNodesFromEdges, getSettingsConfig} from '../utils/helpers';

interface DataProps {
	latest: {
		edges: {
			node: PostType;
		}[];
	};
}

interface IndexPageProps {
}

const Index = (props: IndexPageProps) => {
	return <StaticQuery
		query={graphql`
			query IndexPageQuery {
				latest: allMarkdownRemark(
					sort: {fields: [frontmatter___created_at], order: DESC},
					filter: {
						fileAbsolutePath: {regex: "//collections/posts//"},
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
        `}

		render={(data: DataProps) => {
			return <Route
				component={IndexRoute}
				latest={extractNodesFromEdges(data.latest.edges)}
				path={getSettingsConfig(['blogPagePath'])}
			/>;
		}}
	/>;
};

export default Index;