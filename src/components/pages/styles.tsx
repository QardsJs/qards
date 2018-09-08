import styled from "styled-components";
import * as React from "react";
import {Button} from "@blueprintjs/core";

export const Wrapper = styled.div`
	margin: 0;
	padding: 40px 0 0 0;
`;

export const StyledButton = styled(Button)`
	display: block !important;
	margin: 60px auto 0 auto;
	padding: 15px 20px !important;

	&:focus {
		outline: none;
	}
`;
