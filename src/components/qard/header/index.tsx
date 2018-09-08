import * as React from 'react';

import styled from 'styled-components';

import {CardHeader} from '../../../templates/types';
import theme from '../../../theme';

const Wrapper = styled.header`
	margin-top: 0px;
	margin-bottom: 30px;

	h3 {
		margin-top: 40px;
		margin-bottom: 5px;
	}

	h5 {
		margin-top: 0px;
		margin-bottom: 0px;
		color: ${theme.colors.lightText};
		font-weight: 300;
		font-size: 1.3rem;
	}
`;

export interface Props {
	element: CardHeader;
}

export default class QardHeader extends React.Component<Props, any> {
	public render() {
		const {id, title, subtitle} = this.props.element;

		return <Wrapper>
				{/** Leave this id and classname here because we need it to mark elements in the toc as active **/}
				<div className="h-item" id={`h-item-${id}`} />
				<h3>{title}</h3>
				{subtitle && <h5>{subtitle}</h5>}
			</Wrapper>;
	}
}
