import React, {Component} from "react";
import styled from "styled-components";
import {Callout, Intent} from "@blueprintjs/core";
import {IconName} from "@blueprintjs/icons";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import MarkdownRenderer from "../../markdown";

const Wrapper = styled.div`
    margin-bottom: 20px;
`;

export interface CardCalloutType {
    contentful_id: string;
    title?: string;
    icon?: IconName;
    message: {
        message: string;
    };
    intent?: Intent;
}

interface Props {
    element: CardCalloutType;
}

interface State {

}

export default class QardVideo extends Component<Props & HTMLDivProps, State> {
    render() {
        const {element, ...props} = this.props;

        return (
            <Wrapper {...props}>
                <Callout
                    icon={element.icon || undefined}
                    intent={element.intent || Intent.NONE}
                    title={element.title ? element.title : undefined}
                >
                    <MarkdownRenderer md={element.message.message}/>
                </Callout>
            </Wrapper>
        );
    }
}