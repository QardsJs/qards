import styled from 'styled-components';
import {Box} from 'grid-styled';
import tinycolor2 from 'tinycolor2';

import theme from '../../theme';
import {getThemeConfig} from '../../utils/helpers';

export const FooterWrapper = styled.div`
	background-color: ${theme.color(['faded', 'background'])};
	position: relative;
	height: 90px;

    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        height: auto;
    }
`;

export const FooterContainer = styled.div`
	max-width: 1200px;
	padding: 20px 40px;
	margin: 0 auto;
`;

export const CreditsContainer = styled.div`
	padding: 20px 0 0 0;
	font-size: 0.85rem;
	opacity: .6;
	
	a {
	    text-decoration: underline;
	}
`;

export const PageWrapper = styled(Box)`
    a {
        width: 100%;
        display: block;
        text-align: center;
        padding: 10px 20px;
        
        &:hover {
            text-decoration: none;
            background: ${tinycolor2(theme.color(['faded', 'background'])).darken(5).toString()};
        }
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.small}em) {
        width: 100%;
    }
    
    @media screen and (min-width: ${theme.main.breakpoints.small}em) and (max-width: ${theme.main.breakpoints.xsmall}em) {
        width: 50%;
    }
`;