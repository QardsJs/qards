import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardReveal, {CardRevealType} from "./index";

export interface DataProps {
    reveals: {
        edges: {
            node: CardRevealType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardRevealQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    reveals: allContentfulCardReveal {
                        edges {
                            node{
                                title
                                contentful_id
                                items {
                                    title
                                    content {
                                        content
                                    }
                                }
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {
                let gallery = null;

                for (let i = 0; i < data.reveals.edges.length; i++) {
                    if (data.reveals.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        gallery = data.reveals.edges[i].node;
                    }
                }

                return gallery ? <QardReveal element={gallery} {...props}/> : "";
            }}
        />;
    }
}