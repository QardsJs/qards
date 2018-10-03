import styled from 'styled-components';

import theme from '../../../theme';
import {Tag} from '@blueprintjs/core';

export const Wrapper = styled.div`
	.header {
		min-height: 90px;
	}
`;

export const Title = styled.div`
	font-size: 1.5rem;
	margin-bottom: 10px;
	vertical-align: middle;
`;

export const Counter = styled.pre`
	margin: 0;
	font-weight: 400;
	text-align: center;
	font-size: 90px;
	height: 90px;
	line-height: 90px;
	font-family: "Courier New", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", 
"Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", 
"Liberation Mono", "Nimbus Mono L", Monaco, Courier, monospace;
`;

export const Subtitle = styled.div`
	color: ${theme.color(['lightText'])};
	text-transform: uppercase;
	font-size: .9rem;
	line-height: 1.1rem;
	padding-bottom: 10px;
`;

export const Indicator = styled.div`
	color: ${theme.color(['lightText'])};
	text-align: center;
	text-transform: uppercase;
`;

export const EndedTag = styled(Tag)`
	float: left;
	text-transform: uppercase;
	margin-top: 2px;
	margin-right: 4px;
`;