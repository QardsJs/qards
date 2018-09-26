import styled from "styled-components";
import {Box, Flex} from "grid-styled";
import theme from "../../theme";


export const Wrapper = styled(Flex)`
    
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
	color: ${theme.colors.lightText};
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
	color: ${theme.colors.lightText};
	text-transform: uppercase;
	margin: 0px;
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
`;

export const SidebarWrapper = styled(Box)`
	.sidebar {
		position: -webkit-sticky;
		position: sticky;
		top: 60px;
	}
`;

export const CardWrapper = styled.div`
    margin-top: 30px;
    padding-top: 30px;
	border-top: 1px solid ${theme.colors.borderColor};
`;