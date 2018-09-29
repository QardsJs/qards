import {Link} from 'gatsby';
import styled from 'styled-components';
import {Tag} from '@blueprintjs/core';

import theme from '../../theme/index';
import {getThemeConfig} from '../../utils/helpers';

export const Wrapper = styled(Link)`
	color: ${theme.color(['primary', 'background'])};
	display: block;
	transition: all 0.1s ease-in-out;
	text-decoration: none;

	&:hover {
		text-decoration: none;
	}
`;

export const Date = styled.span`
	font-size: 1.1rem;
    font-weight: 200;
    color: ${theme.color(['lightText'])};
    text-transform: uppercase;
    margin: 0px;
`;

export const FeaturedTag = styled(Tag)`
	float: right;
	text-transform: uppercase;
`;

export const Image = styled.div`
	flex-basis: auto;
	flex-shrink: 0;
	-webkit-box-flex: 1;
	flex-grow: 1;
	border-radius: 8px;
	overflow: hidden;
	-webkit-box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};
	-moz-box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};
	box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};
	max-height: 200px;
`;

export const Text = styled.div`
	h3 {
		font-size: 1.8rem;
		padding: 0;
		margin: 10px 0 0 0;
	}

	p {
		padding-top: 0;
		font-size: 1.2rem;
		line-height: 1.6;
		margin-top: 20px;
	}
`;