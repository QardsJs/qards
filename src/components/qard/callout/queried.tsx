import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardCallout, {CardCalloutType} from "./index";

export interface DataProps {
    reveals: {
        edges: {
            node: CardCalloutType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardCalloutQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    reveals: allContentfulCardCallout {
                        edges {
                            node{
                                title
                                icon
                                intent
                                contentful_id
                                message {
                                    message
                                }
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {
                let callout = null;

                for (let i = 0; i < data.reveals.edges.length; i++) {
                    if (data.reveals.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        callout = data.reveals.edges[i].node;
                    }
                }

                return callout ? <QardCallout element={callout} {...props}/> : "";
            }}
        />;
    }
}