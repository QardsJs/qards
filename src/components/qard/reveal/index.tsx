import * as React from 'react';

import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from 'react-accessible-accordion';

import {Wrapper, ItemsWrapper} from "./styles";
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';


export interface RevealType {
    title: string;
    content: {
        content: string;
    };
}

export interface CardRevealType {
    title: string;
    contentful_id: string;
    items: RevealType[];
}

export interface Props {
    element: CardRevealType;
}


export default class QardReveal extends React.Component<Props, any> {
    public render() {
        const {items} = this.props.element;

        return (
            <Wrapper>
                <Accordion>
                    <ItemsWrapper>
                        {items.map((item: RevealType, key: number) => {
                            return <AccordionItem key={key}>
                                <AccordionItemTitle className={"accordion__title unselectable"}>
                                    <div>
                                        {item.title}
                                        <div className="accordion__arrow"/>
                                    </div>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <p>{item.content.content}</p>
                                </AccordionItemBody>
                            </AccordionItem>
                        })}
                    </ItemsWrapper>
                </Accordion>
            </Wrapper>
        );
    }
}
