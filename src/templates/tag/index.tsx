import React from "react"

import {graphql} from "gatsby"
import {Post as PostProps, Tag as TagProps} from "../types";
import TagsPage from "../../components/pages/tags";
import Route from "../../components/common/route";
import {extractNodesFromEdges} from "../../utils/helpers";

interface DataProps {
    posts: {
        totalCount: number;
        edges: {
            node: PostProps;
        }[];
    };

    tag: TagProps;

    featured: {
        edges: {
            node: PostProps
        }[];
    };
}

interface Props {
    data: DataProps;
    pageContext: {
        tag: string;
    };
}

const TagTemplate = (props: Props) => {
    const {data} = props;
    const {featured, tag} = data;
    const {edges, totalCount} = data.posts;

    const posts: PostProps[] = [];
    for (let i = 0; i < edges.length; i++) {
        posts.push(edges[i].node);
    }

    return <Route
        path={`/tags/${tag.slug}/`}
        component={TagsPage}
        totalCount={totalCount}
        tag={tag}
        posts={posts}
        featured={featured ? extractNodesFromEdges(featured.edges, "") : []}
    />;
};

export default TagTemplate;

//  page queries do not work with StaticQuery yet (params not received)
export const pageQuery = graphql`
    query($slug: String) {
        tag: contentfulTag(slug: { eq: $slug }){
            id
            slug
            title
        }

        featured: allContentfulPost(
            filter: {featured: {eq: true}, tags: { slug: {eq: $slug}} }
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
            filter: { tags: { slug: {eq: $slug}} }
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