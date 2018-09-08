import * as React from 'react';

import {Wrapper} from "./styles";
import MarkdownRenderer from "../../markdown";
import {CardParagraph} from '../../../templates/types';

export interface Props {
    element: CardParagraph;
}

export default class QardParagraph extends React.Component<Props, any> {
    public render() {
        const {element} = this.props;

        if (!element.text) return "";

        const {text} = element;

        return <Wrapper>
            <MarkdownRenderer md={text.text}/>
        </Wrapper>;
    }
}
