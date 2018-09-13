import * as React from 'react';

import styled from 'styled-components';

import {Scrollbars} from 'react-custom-scrollbars';
import PrismCode from 'react-prism';

const Wrapper = styled.div`
	font-size: 0.85rem;
	margin-bottom: 40px;
	border-top-color: #0C344B;
    border-radius: 6px;
    background: #0C344B;
    color: #fff;
    padding: 20px;
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

export interface CardCodeType {
    title: string;
    language: string;
    contentful_id: string;
    code: {
        code: string;
    };
}

export interface Props {
    element: CardCodeType;
}

export default class QardCodeBlock extends React.Component<Props, any> {
    public render() {
        const {language, code} = this.props.element;

        return (
            <Wrapper>
                <pre className={`language-${language}`}>
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
                            <PrismCode className={`language-${language}`}>
                                {code.code}
                            </PrismCode>
                        </Scrollbars>
                    </pre>
            </Wrapper>
        );
    }
}
