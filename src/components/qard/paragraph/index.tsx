import * as React from 'react';

import {Wrapper} from "./styles";
import MarkdownRenderer from "../../markdown";

export interface CardParagraphType {
    //  needed so we can run the queried variant" ./queried.ts
    contentful_id?: string;
    text: {
        text: string
    };
}

export interface Props {
    element: CardParagraphType;
    isMarkdown?: boolean;
}

export default class QardParagraph extends React.Component<Props, any> {
    public render() {
        const {element, isMarkdown} = this.props;

        if (!element.text) return "";

        return <Wrapper>
            {isMarkdown ? <MarkdownRenderer md={element.text.text}/> : <p>{element.text.text}</p>}
        </Wrapper>;
    }
}
