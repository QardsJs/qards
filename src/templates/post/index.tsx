import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';
import {Post as PostProps} from '../types';

import PostPage from "../../components/pages/post";


interface DataProps {
    post: PostProps;

    related: {
        edges: {
            node: PostProps
        }[]
    };
}

interface Props {
    pageContext: {
        slug: string;
        next: null | PostProps;
        previous: null | PostProps;
    };

    location: any;

    data: DataProps;
}

const PostTemplate = ({data, location}: Props) => {
    const related: PostProps[] = [];

    for (let i = 0; i < data.related.edges.length; i++) {
        const post: PostProps = data.related.edges[i].node;
        const hasSimilarTags = _.intersection(
            post.tags.map(a => a.id),
            data.post.tags.map(a => a.id)).length;
        const hasSimilarCategories = _.intersection(
            post.categories.map(a => a.id),
            data.post.categories.map(a => a.id)).length;

        if (post.id == data.post.id) continue;
        if (!hasSimilarTags && !hasSimilarCategories) continue;

        related.push(post);
    }

    return <PostPage
        location={location}
        post={data.post}
        related={related}
    />
};


export default PostTemplate;

//  page queries do not work with StaticQuery yet (params not received)
export const pageQuery = graphql`
    query($slug: String) {
        post: contentfulPost(slug: {eq: $slug}) {
            ...postFragment
        }

        related: allContentfulPost(
            sort: {fields: [createdAt], order: DESC}
        ) {
            edges {
                node {
                    ...postFragment
                }
            }
        }

        latest: allContentfulPost(
            sort: {fields: [createdAt], order: DESC}
        ) {
            edges {
                node {
                    ...postFragment
                }
            }
        }
    }
`;