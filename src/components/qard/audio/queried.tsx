import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardAudio, {CardAudioType} from "./index";

export interface DataProps {
    reveals: {
        edges: {
            node: CardAudioType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardAudioQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    reveals: allContentfulCardAudio {
                        edges {
                            node{
                                title
                                contentful_id

                                playlist {
                                    id
                                    url
                                    title
                                    subtitle
                                    poster {
                                        resize(width: 120) {
                                            src
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {
                let audio = null;

                for (let i = 0; i < data.reveals.edges.length; i++) {
                    if (data.reveals.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        audio = data.reveals.edges[i].node;
                    }
                }

                return audio ? <QardAudio element={audio} {...props}/> : "";
            }}
        />;
    }
}