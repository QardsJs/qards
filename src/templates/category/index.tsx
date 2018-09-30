import React from 'react';
import {graphql} from 'gatsby';

import Route from '../../components/common/route';
import {PostType} from '../../fragments/post';

import CategoriesPage from '../../components/pages/categories';
import {extractNodesFromEdges} from '../../utils/helpers';


export interface CategoryType {
	id: string;

	fields: {
		slug: string;
	}

	frontmatter: {
		title: string;
		excerpt: string;
	}
}

interface Props {
	data: {
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
		category: CategoryType
	};
}


class CategoryTemplate extends React.Component<Props, any> {
	public render() {
		const {data} = this.props;

		const {featured, category} = data;
		const {edges} = data.posts;

		return <Route
			path={category.fields.slug}
			component={CategoriesPage}
			totalCount={data.posts.totalCount}
			posts={extractNodesFromEdges(edges)}
			category={category}
			featured={featured ? extractNodesFromEdges(featured.edges, '') : []}
		/>;
	}
}

export default CategoryTemplate;

export const pageQuery = graphql`
	query($slug: String) {
		posts: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			filter: {
				fileAbsolutePath: {regex: "//collections/posts//"},
				categories: {fields: {slug: {eq: $slug}}}
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
				fileAbsolutePath: {regex: "//collections/posts//"},
				categories: {fields: {slug: {eq: $slug}}},
				frontmatter: {isFeatured: {eq: true}}
			}
		) {
			edges {
				node {
					...postFragment
				}
			}
		}
		
		category: markdownRemark(fields: { slug: { eq: $slug } }){
			...categoryFragment
		}
	}
`;