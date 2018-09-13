import React, {Component} from "react";
import {graphql, StaticQuery} from "gatsby";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import {deGatsbyFyContentfulId} from "../../../utils/helpers";

import QardGallery, {CardGalleryType} from "./index";

export interface DataProps {
    galleries: {
        edges: {
            node: CardGalleryType
        }[]
    }
}

interface Props {
    contentful_id: string;
}

interface State {

}

export default class QardGalleryQueried extends Component<Props & HTMLDivProps, State> {
    render() {
        const {contentful_id, ...props} = this.props;

        return <StaticQuery
            query={graphql`
                query {
                    galleries: allContentfulCardGallery {
                        edges {
                            node{
                                id
                                title
                                contentful_id
                                entries {
                                    ...galleryEntryFragment
                                }
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {
                let gallery = null;

                for (let i = 0; i < data.galleries.edges.length; i++) {
                    if (data.galleries.edges[i].node.contentful_id == deGatsbyFyContentfulId(contentful_id)) {
                        gallery = data.galleries.edges[i].node;
                    }
                }

                return gallery ? <QardGallery element={gallery} {...props}/> : "";
            }}
        />;
    }
}