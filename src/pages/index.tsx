import React from 'react';
import {graphql, StaticQuery} from "gatsby";

import IndexRoute from "../components/pages/index";
import Route from "../components/common/route";
import {PostType} from "../fragments/post";

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
			const latest: PostType[] = [];

			for (let i = 0; i < data.latest.edges.length; i++) {
				latest.push(data.latest.edges[i].node);
			}

			return <Route component={IndexRoute} latest={latest} path="/"/>
		}}
	/>
};

export default Index;