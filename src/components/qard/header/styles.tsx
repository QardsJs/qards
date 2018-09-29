import styled from 'styled-components';
import theme from '../../../theme';

export const Wrapper = styled.header`
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
	overflow: hidden;
	display: block;
`;

export const PrimaryTitle = styled.h2`
	margin-top: 0;
	margin-bottom: 5px;
`;

export const SecondaryTitle = styled.h3`
	margin-top: 50px;
	margin-bottom: 15px;
`;

export const SubTitle = styled.span`
	margin-top: 0px;
	margin-bottom: 0px;
	color: ${theme.color(['lightText'])};
	font-weight: 300;
	font-size: 1.3rem;
	line-height: 1.6rem;
`;