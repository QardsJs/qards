import React from 'react';
import {graphql, StaticQuery} from "gatsby";

import IndexRoute from "../components/pages/index";
import Route from "../components/common/route";
import {Post as PostProps} from "../templates/types";

interface DataProps {
    site: {
        siteMetadata: {
            name: string;
            title: string;
            siteUrl: string;
            description: string;
        }
    }

    latest: {
        edges: {
            node: PostProps;
        }[];
    };
}

interface IndexPageProps {
}

const Index = (props: IndexPageProps) => {
    return <StaticQuery
        query={graphql`
            query IndexPageQuery {
                site {
                    siteMetadata {
                        name
                        title
                        description
                        siteUrl
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
        `}

        render={(data: DataProps) => {
            const latest: PostProps[] = [];

            for (let i = 0; i < data.latest.edges.length; i++) {
                latest.push(data.latest.edges[i].node);
            }

            return <Route component={IndexRoute} latest={latest} path="/"/>
        }}
    />
};

export default Index;