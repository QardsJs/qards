import React from "react";
import {graphql} from "gatsby";

import Route from "../../components/common/route";
import {PostType} from '../../components/post';

import CategoriesPage from "../../components/pages/categories";
import {extractNodesFromEdges} from "../../utils/helpers";
import {Image} from "../types";

export interface CategoryType {
    id: string;
    slug: string;
    title: string;
    cover: Image;
    description: string;
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
        category: string;
    };
}


class CategoryTemplate extends React.Component<Props, any> {
    public render() {
        const {data} = this.props;
        const {featured, category} = data;
        const {edges, totalCount} = data.posts;

        const posts: PostType[] = [];
        for (let i = 0; i < edges.length; i++) {
            posts.push(edges[i].node);
        }

        return <Route
            path={`/categories/${category.slug}/`}
            component={CategoriesPage}
            totalCount={totalCount}
            posts={posts}
            category={category}
            featured={featured ? extractNodesFromEdges(featured.edges, "") : []}
        />
    }
}

export default CategoryTemplate;

//  page queries do not work with StaticQuery yet (params not received)
export const pageQuery = graphql`
    query($slug: String) {
        category: contentfulCategory(slug: { eq: $slug }){
            ...categoryFragment
        }
    
        featured: allContentfulPost(
            filter: {featured: {eq: true}, categories: { slug: { eq: $slug }}}
            sort: {fields: [createdAt], order: DESC}
            limit: 1
        ) {
            edges {
                node {
                    ...postFragment
                }
            }
        }

        posts: allContentfulPost(
            sort: { fields: [createdAt], order: DESC }
            filter: { categories: { slug: { eq: $slug }} }
        ) {
            totalCount
            edges {
                node {
                    ...postFragment
                }
            }
        }
    }
`;