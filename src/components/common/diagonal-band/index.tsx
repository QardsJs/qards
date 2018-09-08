import * as React from 'react';
import styled from 'styled-components';

import theme from '../../../theme';


const DiagonalWrapper = styled.div`
	z-index: -1;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	overflow: hidden;
	background: none;
	min-height: 2000px;

	.diagonal {
		z-index: -1;
		position: absolute;
		top: -660px;
		bottom: auto;
		left: 50%;
		width: 6000px;
		height: 2900px;
		transform-origin: 0px center 0px;
		transform: translate(-${(props: DiagonalBandProps) => props.translate || 40.5}%)
			skewY(-${(props: DiagonalBandProps) => props.skew || 35}deg);
		background: ${(props: DiagonalBandProps) => props.background || theme.colors.faded};
	}
`;

export interface DiagonalBandProps {
    skew?: number;
    translate?: number;
    background?: string;
}

export default class DiagonalBand extends React.Component<DiagonalBandProps, any> {
    public render() {
        return <DiagonalWrapper skew={this.props.skew} translate={this.props.translate}>
            <div className="diagonal"/>
        </DiagonalWrapper>;
    }
}
