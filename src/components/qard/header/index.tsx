import * as React from 'react';

import styled from 'styled-components';

import theme from '../../../theme';
import QardsDivider from "../divider";
import QardBase, {QardProps} from "../base";
import {slugify} from "../../../utils/helpers";

const Wrapper = styled.header`
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
	overflow: hidden;
	display: block;
`;

const PrimaryTitle = styled.h2`
	margin-top: 0;
	margin-bottom: 5px;
`;

const SecondaryTitle = styled.h3`
	margin-top: 50px;
	margin-bottom: 15px;
`;

const SubTitle = styled.span`
	margin-top: 0px;
	margin-bottom: 0px;
	color: ${theme.colors.lightText};
	font-weight: 300;
	font-size: 1.3rem;
	line-height: 1.6rem;
`;

export interface CardHeaderType extends QardProps {
	title: string;
	subtitle?: string;
	// `primary` generates a h2 and it also creates a divider on top
	//  `secondary` generates a h3 and has no divider on top
	type?: string;
}

export default class QardHeader extends QardBase<CardHeaderType, any> {
	public render() {
		const {title, subtitle, type} = this.props;

		let Title = PrimaryTitle;
		if (type == 'secondary') {
			Title = SecondaryTitle;
		}

		return <Wrapper className="h-item" id={`h-item-${slugify(title)}`}>
			{!type || type === 'primary' && <QardsDivider type={'line'}/>}
			<Title>{title}</Title>
			{subtitle && <SubTitle>{subtitle}</SubTitle>}
		</Wrapper>;
	}
}
