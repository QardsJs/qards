import React from 'react';
import {graphql, StaticQuery} from "gatsby";

import Route from "../components/common/route";
import BlogIndex from "../components/pages/blog";

import {div} from "grid-styled";

interface DataProps {
    site: {
        siteMetadata: {
            name: string;
            title: string;
            siteUrl: string;
            description: string;
        }
    }

    featuredPost: {
        edges: {
            node: PostProps;
        }[];
    };

    latest: {
        edges: {
            node: PostProps;
        }[];
    };
}

interface IndexPageProps {

}

const Index = (props: IndexPageProps) => {
    // return <StaticQuery
    //     query={graphql`
    //         query BlogPageQuery {
    //             site {
    //                 siteMetadata {
    //                     name
    //                     title
    //                     description
    //                     siteUrl
    //                 }
    //             }
    //
    //             featuredPost: allContentfulPost(
    //                 filter: {featured: {eq: true}}
    //                 sort: {fields: [createdAt], order: DESC}
    //                 limit: 1
    //             ) {
    //                 edges {
    //                     node {
    //                         ...postFragment
    //                     }
    //                 }
    //             }
    //
    //             latest: allContentfulPost(
    //                 sort: {fields: [createdAt], order: DESC}
    //             ) {
    //                 edges {
    //                     node {
    //                         ...postFragment
    //                     }
    //                 }
    //             }
    //         }
    //     `}
    //
    //     render={(data: DataProps) => {
    //         const latest: PostProps[] = [];
    //
    //         for (let i = 0; i < data.latest.edges.length; i++) {
    //             latest.push(data.latest.edges[i].node);
    //         }
    //
    //         return <Route
    //             component={BlogIndex}
    //             path="/blog"
    //             latest={latest}
    //             metadata={data.site.siteMetadata}
    //             featured={data.featuredPost.edges[0].node}
    //         />
    //     }}
    // />

	return <div>blog</div>
};

export default Index;