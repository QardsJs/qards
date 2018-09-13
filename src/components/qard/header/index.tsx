import * as React from 'react';

import styled from 'styled-components';

import theme from '../../../theme';

const Wrapper = styled.header`
	margin-top: 0px;
	margin-bottom: 30px;
`;

const Title = styled.h3`
    margin-top: 20px;
	margin-bottom: 5px;
`;

const SubTitle = styled.h2`
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${theme.colors.lightText};
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 1.6rem;
`;

export interface CardHeaderType {
    id: string;
    title: string;
    subtitle?: string;
    contentful_id?: string;
}

export interface CardHeaderProps {
    element: CardHeaderType;
}

export default class QardHeader extends React.Component<CardHeaderProps, any> {
    public render() {
        const {title, subtitle} = this.props.element;

        return <Wrapper>
            <Title>{title}</Title>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </Wrapper>;
    }
}
