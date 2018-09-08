import styled from "styled-components";
import tinycolor from "tinycolor2";

import theme from "../../../theme";

export const ItemsWrapper = styled.div`
	border-radius: 8px;
    border: 1px solid ${tinycolor(theme.colors.faded).darken(10).toString()}
`;

export const Wrapper = styled.div`
	.accordion {
	    margin: 20px 0;
	    padding: 10px;
	    border-radius: 8px;
	    border: none;
	    color: ${theme.colors.primary}!important;
	    background: ${tinycolor(theme.colors.faded).lighten(0).toString()}!important;
	    
	    .accordion__item {
	        border: none!important;
	        
            .accordion__title {
                font-size: 1rem;
                font-weight: 500;
                position: relative;
                background: white!important;
                color: ${theme.colors.primary}!important;
                padding: 8px 20px 6px 20px;
                border-bottom: 1px solid ${tinycolor(theme.colors.faded).darken(5).toString()};
                
                .accordion__arrow {
                    right: 20px;
                }
            }
            
            .accordion__title[aria-selected='true']  {
                border-bottom: 1px solid transparent;
            }
            
            .accordion__body {
                background: white;
                line-height: 1.8rem;
                font-size: 1.2rem;
                border-bottom: 1px solid ${tinycolor(theme.colors.faded).darken(5).toString()};
            }
                
            &:first-child {
                .accordion__title {
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                }
            }
                
            &:last-child {
                .accordion__title {
                    border-bottom: none;
                    border-bottom-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                    
                    &[aria-selected='true'] {
                        border-bottom-right-radius: 0px;
                        border-bottom-left-radius: 0px;
                    }
                }
            
                .accordion__body {
                    border-bottom: none;
                    border-bottom-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                }
            }
	    }
	}
`;