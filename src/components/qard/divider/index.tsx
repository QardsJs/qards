import * as React from 'react';

import styled from 'styled-components';

import theme from '../../../theme';
import QardBase, {QardProps} from '../base';
import {getThemeConfig} from '../../../utils/helpers';

const Divider = styled.hr`
    margin: 50px 0 40px 0;
    text-align: center;
    
	&.bullets {
	    border: 0;
	    background: transparent;
	    
	    &::before {
            content: '...';
            display: inline-block;
            color: ${theme.color(['lightText'])};
            font-weight: 400;
            font-style: italic;
            font-size: 30px;
            letter-spacing: .6em;
            position: relative;
            top: -28px;
        }
	}
	
	&.line {
	    background: ${theme.color(['borders'])};
	}
`;

export interface CardDividerType extends QardProps {
	//  `bullets` places subtle bullets (medium style)
	//  `line` places a horizontal line
	type?: string;
}

export default class QardDivider extends QardBase<CardDividerType, any> {

	renderStaticBody(): React.ReactNode {
		return this.render();
	}

	public render() {
		return <Divider className={this.props.type || 'bullets'}/>;
	}
}
