import * as React from 'react';

import MarkdownRenderer from '../../markdown';
import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from 'react-accessible-accordion';

import QardBase, {QardProps} from '../base';
import {Wrapper, ItemsWrapper} from './styles';

import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';


export interface RevealType {
	title: string;
	content: string;
}

export interface CardRevealType extends QardProps {
	items: RevealType[];
}


export default class QardReveal extends QardBase<CardRevealType, any> {
	public render() {
		const {items} = this.props;

		if (!items || !items.length) return '';

		return (
			<Wrapper>
				<Accordion>
					<ItemsWrapper>
						{items.map((item: RevealType, key: number) => {
							if (!item.title || !item.content) return 'huh';

							return <AccordionItem key={key}>
								<AccordionItemTitle className={'accordion__title unselectable'}>
									<div>
										{item.title}
										<div className="accordion__arrow"/>
									</div>
								</AccordionItemTitle>
								<AccordionItemBody>
									<MarkdownRenderer md={item.content}/>
								</AccordionItemBody>
							</AccordionItem>;
						})}
					</ItemsWrapper>
				</Accordion>
			</Wrapper>
		);
	}
}
