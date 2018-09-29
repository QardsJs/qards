import styled from "styled-components";
import tinycolor2 from "tinycolor2";

import theme from "../../../theme";
import {getThemeConfig} from '../../../utils/helpers';

export const Wrapper = styled.div`
	margin-bottom: 45px;
	font-size: 1.3rem;

	
	@media screen and (min-width: ${theme.main.breakpoints.large}em) {
        text-align: justify;
        text-justify: inter-word;
    }
    
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
	    color: ${tinycolor2(theme.color(['accent', 'text'])).darken(5).toString()};
	    font-weight: 500;
	    border-bottom: 1px solid ${theme.color(['accent', 'text'])};
	    
	    &:hover {
	        text-decoration: none;
	        color: ${tinycolor2(theme.color(['accent', 'text'])).darken(5).toString()};
	    }
	}
`;