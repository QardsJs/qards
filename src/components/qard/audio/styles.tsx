import styled from 'styled-components';
import theme from '../../../theme';
import tinycolor from 'tinycolor2';
import {omit} from 'lodash';
import {Button, IButtonProps} from '@blueprintjs/core';
import * as React from 'react';

export const Wrapper = styled.div`

`;

export const Playlist = styled.ul`
    margin: 0!important;
    padding: 0!important;
    list-style-type: none;
`;

export const Item = styled.li`
    display: flex;
    padding: 10px 0 8px 10px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    cursor: pointer;
    margin: 0;
    opacity: 1;
    border-top: 1px solid ${theme.color(['borders'])};
    
    &.active {
        color: ${theme.color(['accent', 'background'])};
    }
    
    &:last-child {
    		&:hover {
    			border-bottom-right-radius: 6px;
        		border-bottom-left-radius: 6px;
    		}
    }
    
    &:hover {
        color: ${tinycolor(theme.color(['faded', 'text'])).lighten(2).toString()};
        background-color: ${tinycolor(theme.color(['faded', 'background'])).lighten(2).toString()};
        
        &.active {
            color: ${tinycolor(theme.color(['accent', 'background'])).lighten(15).toString()};
        }
    }
`;

export const Main = styled.div`
    display: flex;
    
    margin-bottom: 20px;
    padding: 20px 20px 0 20px;
    
    .details {
        display: flex;
        flex: 1;
        flex-direction: column;
        
        .content {
            flex: 1;
            
            .title {
                line-height: 1.5rem;
                display: block;
                font-size: 1.1rem;
            }
            
            .subtitle {
                display: block;
                line-height: 1.4rem;
                font-size: .9rem;
            }
        }
        
        .controls {
            display: flex;
            align-items: center;
            font-size: 3em;
            margin-top: 10px;
            
            .duration {
                flex: 1;
                text-align: left;
                font-size: .3em;
            }
        } 
    }
    
    img {
        width: 110px;
        height: 110px;
        margin-left: 10px;
        border-top-right-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        img {
            display: none;
        }
    }
`;

interface InterfaceBtnProps {
	isPlaying?: boolean;
}

/**
 * In case you're wondering why this cryptic code inside the
 * styled component is because `styled` is passing down props
 * that it receives from us to the wrapped component(`Button`)
 * and it doesn't get accepted there so we're filtering out
 * our custom props before extending that component
 */
export const InterfaceBtn = styled((props: InterfaceBtnProps & IButtonProps) =>
	<Button {...omit(props, ['isPlaying'])} />)`
margin-right: 10px;
opacity: .8;

.bp3-icon {
    color: ${(props: InterfaceBtnProps) => {
	return props.isPlaying ?
		tinycolor(theme.color(['accent', 'background'])).lighten(15).toString() :
		theme.color(['primary', 'background']);
}}!important;
}

&:hover {
    opacity: 1;
}
`;