import React, {Component} from "react";
import styled from "styled-components";
import {Callout, Intent} from "@blueprintjs/core";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import MarkdownRenderer from "../../markdown";
import {CardCallout as CardCalloutProps} from "../../../templates/types"

const Wrapper = styled.div`
    margin-bottom: 20px;
`;

interface Props {
    element: CardCalloutProps;
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