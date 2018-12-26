import React from 'react';
import {graphql} from 'gatsby';
import {PostType} from '../../fragments/post';

import PostPage from '../../components/pages/post';
import {extractNodesFromEdges} from '../../utils/helpers';


interface DataProps {
	post: PostType;

	pinned: {
		edges: {
			node: PostType
		}[]
	};

	related: {
		edges: {
			node: PostType
		}[]
	};
}

interface Props {
	pageContext: {
		slug: string;
		next: null | PostType;
		previous: null | PostType;
		tags: string[];
	};

	location: any;

	data: DataProps;
}

const PostTemplate = ({data, location}: Props) => {
	return <PostPage
		location={location}
		post={data.post}
		pinned={data.pinned ? extractNodesFromEdges(data.pinned.edges) : []}
		related={data.related ? extractNodesFromEdges(data.related.edges) : []}
	/>;
};


export default PostTemplate;

export const query = graphql`
	query($slug: String, $tags: [String]) {
		post: markdownRemark(fields: { slug: { eq: $slug } }) {
			...postFragment
		}
		
		pinned: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			limit: 2,
			filter: {
				fileAbsolutePath: {regex: "//collections/posts//"},
				frontmatter: {pinSidebar:{enable: {eq: true}}}
			}
		) {
			edges {
				node {
					...cardPostFragment
				}
			}
		}

		related: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			limit: 6,
			filter: {
				fileAbsolutePath: {regex: "//static/content/collections/posts//"},
				frontmatter: {tags: {in: $tags}},
				fields: {slug: {ne: $slug}}
			}
		) {
			totalCount
			edges {
				node {
					...cardPostFragment
				}
			}
		}
	}
`;
