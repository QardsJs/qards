import styled from 'styled-components';
import {Box, Flex} from '@rebass/grid';
import theme from '../../theme';
import tinycolor2 from 'tinycolor2';


export const Wrapper = styled(Flex)`
    img.emojione {
    	margin: 0;
    	height: 1.4rem;
    	width: 1.4rem;
    	vertical-align: text-top;
    }
`;

export const Title = styled.h1`
	margin-top: 0;
	font-size: 2.1rem;
	line-height: 2.4rem;
`;

export const Excerpt = styled.p`
	font-weight: 300;
	font-size: 1.4rem;
	line-height: 2.2rem;
	color: ${theme.color(['lightText'])};
`;

export const Hero = styled.div`
	margin: 20px 0;

	img {
		width: 100%;
		border-radius: 8px;
	}
`;

export const Date = styled.span`
	font-size: 1.1rem;
	font-weight: 200;
	color: ${theme.color(['lightText'])};
	text-transform: uppercase;
	margin: 0;
`;

export const Article = styled.article`
	font-size: 1.4rem;
	line-height: 2.2rem;
	font-weight: 300;

	b, strong {
		font-weight: 400;
	}

	ul {
		margin-left: 1.5rem;
	}

	@media screen and (min-width: ${theme.main.breakpoints.xsmall}em) {
		div.paragraphs{
			text-align: justify;
			text-justify: inter-word;
		}
	}
	
	blockquote {
		font-style: italic;
		color: ${theme.color(['lightText'])};
		margin: 40px 0;
		padding-left: 30px;
		border-left: 4px solid ${theme.color(['borders'])};
	}
	
	.paragraphs {
		color: ${tinycolor2(theme.color(['text'])).lighten(25).toString()};

		pre, code {
			font-size: 1rem;
			padding: 0 4px;
			border-radius: 4px;
			color: ${tinycolor2(theme.color(['intents', 'danger', 'text'])).darken(20).toString()};
			background: ${tinycolor2(theme.color(['intents', 'danger', 'background'])).lighten(10).toString()};
		}
		
		p {
			margin-bottom: 20px;
		}
		
		strong, b {
			font-weight: 400;
		}
		
		ul {
			li {
				padding: 0;
				font-size: .9em;
				color: ${tinycolor2(theme.color(['lightText'])).darken(20).toString()};
			}
		}
		
		a {
			color: ${theme.color(['text'])};
			font-weight: 400;
			border-bottom: 1px solid ${theme.color(['text'])};
			
			&:hover {
				text-decoration: none;
			}
		}
	}
`;

export const SidebarWrapper = styled(Box)`
	.sidebar {
		position: -webkit-sticky;
		position: sticky;
		top: 60px;
	}
`;
