import styled from 'styled-components';

import theme from "../../../theme";

export const Wrapper = styled.div`
	a {
		display: block;
		padding: 10px 14px;
		
		b.title {
			display: block;
		}
		
		span.excerpt {
			display: block;
		}
		
		&:hover {
			text-decoration: none;
			background: ${theme.color(['faded', 'background'])};
		}
	}
	
	&.display-minimal, &.display-compact {
		a {
			border-bottom: 1px solid ${theme.color(['borders'])};
			
			&:first-child {
				border-top: 1px solid ${theme.color(['borders'])};
			}
		}
	}
	
	&.display-minimal {
		a {
			span.excerpt {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	
	&.display-compact {
		a {
			font-size: 1.2rem;
			padding: 8px 12px;
			
			b.title {
				font-weight: 600;
			}
			
			span.excerpt {
				display: none;
			}
		}
	}
`;