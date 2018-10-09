import React from 'react';

import {graphql} from 'gatsby';

import TagsPage from '../../components/pages/tags';
import Route from '../../components/common/route';
import {extractNodesFromEdges} from '../../utils/helpers';
import {PostType} from '../../fragments/post';

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
	};
}

const TagTemplate = (props: Props) => {
	const {data} = props;
	const {tag, slug} = props.pageContext;
	const {featured, posts} = data;

	return <Route
		path={`/tags/${slug}/`}
		component={TagsPage}
		totalCount={posts ? posts.totalCount : 0}
		tag={tag}
		posts={posts && posts.edges && posts.edges.length ? extractNodesFromEdges(posts.edges) : []}
		featured={featured ? extractNodesFromEdges(featured.edges, '') : []}
	/>;
};

export default TagTemplate;

export const pageQuery = graphql`
	query($tag: String) {
		posts: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
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