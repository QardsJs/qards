import React, {Component} from "react";
import styled from "styled-components";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import theme from "../../../theme";
import {Card, Elevation} from "@blueprintjs/core";

const Wrapper = styled.div`
	padding: 12px;
	border-radius: 8px;
	background-color: ${theme.colors.faded};
	
	h4 {
	
	}
`;

const Title = styled.div`
    text-align: center;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    margin: 0!important;
    padding: 0 0 8px 0!important;
    color: ${theme.colors.lightText};
`;

const InnerCard = styled.div`
	background-color: white;
	border: 1px solid ${theme.colors.borderColor};
	padding: 0!important;
	margin: 0!important;
	border-radius: 6px;
`;

interface Props {
	title?: any;
	titleProps?: HTMLDivProps;
	innerProps?: HTMLDivProps;
	innerElevation?: Elevation;
	children: any
}

interface State {

}

export default class TitledWrapper extends Component<Props & HTMLDivProps, State> {
	render() {
		const {title, children, innerProps, innerElevation, titleProps, ...props} = this.props;

		return (
			<Wrapper {...props}>
				{title && <Title {...titleProps}>{title}</Title>}
				<InnerCard>
					<div {...innerProps}>{children}</div>
				</InnerCard>
			</Wrapper>
		);
	}
}