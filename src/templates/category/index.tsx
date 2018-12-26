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
	pageContext: {
		slug: string;
		numPages: number;
		currentPage: number;
	};
}


export default class CategoryTemplate extends React.Component<Props, any> {
	public render() {
		const {data, pageContext} = this.props;
		const {slug} = pageContext;
		const {featured, posts, category} = data;

		const {currentPage, numPages} = pageContext;

		const isFirst = currentPage === 1;
		const isLast = currentPage === numPages;

		const postsExtracted = posts && posts.edges ? extractNodesFromEdges(posts.edges) : [];

		const prevPage = slug + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString());
		const nextPage = slug + ((currentPage + 1).toString());

		let path = slug;
		if (currentPage != 1) {
			path += `${currentPage}`;
		}

		return <Route
			path={path}
			component={CategoriesPage}
			totalCount={posts ? posts.totalCount : 0}
			category={category}
			posts={postsExtracted}
			featured={featured ? extractNodesFromEdges(featured.edges, '') : []}
			pagination={{isLast, isFirst, numPages, prevPage, nextPage, currentPage}}
		/>;
	}
}

export const query = graphql`
	query($slug: String, $skip: Int!, $limit: Int!) {
		posts: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			limit: $limit,
			skip: $skip,
			filter: {
				fileAbsolutePath: {regex: "//static/content/collections/posts//"},
				categories:{
					elemMatch: {
						fields:{slug: {eq: $slug}}
					}
				}
			}
		) {
			totalCount
			edges {
				node {
					...cardPostFragment
				}
			}
		}
		
		featured: allMarkdownRemark(
			sort: {fields: [frontmatter___created_at], order: DESC},
			filter: {
				fileAbsolutePath: {regex: "//static/content/collections/posts//"},
				categories:{
					elemMatch: {
						fields:{slug: {eq: $slug}}
					}
				},
				frontmatter: {isFeatured: {eq: true}}
			}
		) {
			edges {
				node {
					...cardPostFragment
				}
			}
		}
		
		category: markdownRemark(fields: { slug: { eq: $slug } }){
			...categoryFragment
		}
	}
`;
