import React from "react";
import styled from "styled-components";
import theme from "../../theme";

export const Wrapper = styled.div`
	.name {
		display: block;
		font-size: 1.2rem;
	}
	
	.name {
		margin-bottom: 10px;
	}
	
	.bio {
		text-align: left;
		line-height: 1.5rem;
		color: ${theme.colors.lightText};
	}
`;

export const Avatar = styled.div`
	margin-right: 20px;
	line-height: 0;
	max-width: 80px;
    
	div.gatsby-image-wrapper {
		width: 80px!important;
		height: 80px!important;
	}
    
	img {
		height: 80px;
		width: 80px;
		border-radius: 40px;
	}
`;