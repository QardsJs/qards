import styled from "styled-components";
import * as React from "react";

import theme from "../../theme/index";


export const Title = styled.h1`
	color: ${theme.colors.primary};
	font-size: 3rem;
	text-align: center;
`;

export const SubTitle = styled.h2`
    font-size: 1.3rem;
    font-weight: 400;
    color: ${theme.colors.faded};
`;
