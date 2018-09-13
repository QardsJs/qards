import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardParagraph, {CardParagraphType} from "./index";

export interface DataProps {
    paragraphs: {
        edges: {
            node: CardParagraphType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardParagraphQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    paragraphs: allContentfulCardParagraph {
                        edges{
                            node{
                                contentful_id
                                text {
                                    text
                                }
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {
                let paragraph = null;

                //  This is kinda dumb to have to loop through all records instead of being
                //  able to filter right inside the query.
                //  @TODO: check the progress of `StaticQuery` and see if they update it to allow passing of variables

                //  Remember to cut the first letter from the id as it's an addition by gatsby
                //  to flag that this entry id is a Contentful one (first letter is `c`)
                for (let i = 0; i < data.paragraphs.edges.length; i++) {
                    if (data.paragraphs.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        paragraph = data.paragraphs.edges[i].node;
                    }
                }

                return paragraph ? <QardParagraph element={paragraph} isMarkdown={true} {...props}/> : "";
            }}
        />;
    }
}