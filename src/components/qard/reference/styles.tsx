import styled from 'styled-components';

import theme from "../../../theme";

export const Wrapper = styled.div`
	a {
		display: block;
		background: ${theme.color(['faded', 'background'])};
		
		b.title {
			display: block;
			font-size: 1.3rem;
			font-weight: 600;
		}
		
		span.excerpt {
			display: block;
			font-size: 1rem;
			line-height: 1.4rem;
			color: ${theme.color(['lightText'])};
		}
		
		&:hover {
			text-decoration: none;
			background: transparent;
		}
		
		.cover-placeholder {
			background: ${theme.color(['faded', 'background'])};
			width: 100%;
			padding-bottom: 56%;
		}
		
		span.bp3-skeleton {
			display: block;
			height: 12px;
			margin-bottom: 12px;
			
			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}
`;