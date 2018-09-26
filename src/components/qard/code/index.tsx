import * as React from 'react';

import styled from 'styled-components';

// @ts-ignore
import Highlight from 'react-highlight';

import {Scrollbars} from 'react-custom-scrollbars';

import QardBase, {QardProps} from "../base";

import "./theme.scss";

const Wrapper = styled.div`
	font-size: 0.85rem;
	margin-bottom: 40px;
	border-top-color: #0C344B;
    border-radius: 6px;
    background: #0C344B;
    color: #fff;
    padding: 0 20px 20px 20px;
    border-top: 40px solid transparent;
    position: relative;
    
    &:before {
        display: block;
        position: absolute;
        content: '';
        top: -20px;
        left: 20px;
        width: .5em;
        height: .5em;
        border-radius: 50%;
        background-color: #F5716B;
        box-shadow: 0 0 0 2px #F5716B, 1.5em 0 0 2px #f4c20d, 3em 0 0 2px #3cba54;
    }
    
    pre, code {
        font-size: .9rem!important;
        line-height: 1.6rem!important;
    }
	
	pre {
        padding: 0!important;
        margin: 0!important;
	    background: #0C344B!important;
	}
	
	code {
        margin: 0!important;
	    background: #0C344B!important;
	}
`;

export interface CardCodeType extends QardProps {
    language: string;
    code: string;
}

export default class QardCodeBlock extends QardBase<CardCodeType, any> {
    public render() {
        const {language, code} = this.props;

        return (
            <Wrapper>
                <Scrollbars
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={800}
                    autoHide
                    universal={true}
                    renderThumbVertical={({...props}) => (
                        <div {...props} style={{backgroundColor: '#A8FF60'}}/>
                    )}
                >
                    <Highlight className={language}>{code}</Highlight>
                </Scrollbars>
            </Wrapper>
        );
    }
}
