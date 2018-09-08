import * as React from 'react';

import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from 'react-accessible-accordion';

import {CardRevealSet} from '../../../templates/types';
import {Wrapper, ItemsWrapper} from "./styles";
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';

export interface Props {
    element: CardRevealSet;
}


export default class QardRevealSet extends React.Component<Props, any> {
    public render() {
        const {items, order} = this.props.element;

        return (
            <Wrapper>
                <Accordion>
                    <ItemsWrapper>
                        {items.map((item) => {

                            return <AccordionItem key={item.id}>
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
