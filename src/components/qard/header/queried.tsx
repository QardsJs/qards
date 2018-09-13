import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardHeader, {CardHeaderType} from "./index";

export interface CardHeaderDataProps {
    headers: {
        edges: {
            node: CardHeaderType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardHeaderQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    headers: allContentfulCardHeader {
                        edges{
                            node{
                                id
                                contentful_id
                                title
                                subtitle
                            }
                        }
                    }
                }
            `}

            render={(data: CardHeaderDataProps) => {
                let header = null;

                for (let i = 0; i < data.headers.edges.length; i++) {
                    if (data.headers.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        header = data.headers.edges[i].node;
                    }
                }

                return header ? <QardHeader element={header} {...props}/> : "";
            }}
        />;
    }
}