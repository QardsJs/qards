import styled from "styled-components";
import * as React from "react";

import theme from "../../theme/index";
import {getThemeConfig} from '../../utils/helpers';


export const Title = styled.h1`
	color: ${theme.color(['text'])};
	font-size: 3rem;
	text-align: center;
	font-weight: 400;
`;

export const SubTitle = styled.h2`
	font-size: 1.3rem;
	font-weight: 400;
	color: ${theme.color(['faded', 'text'])};
`;
