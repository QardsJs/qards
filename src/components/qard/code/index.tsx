import * as React from 'react';

import styled from 'styled-components';

import {Scrollbars} from 'react-custom-scrollbars';
import PrismCode from 'react-prism';

import TitledWrapper from "../../common/titled-wrapper";
import {CardCodeBlock} from '../../../templates/types';

const Wrapper = styled.div`
	font-size: 0.85rem;
	margin-bottom: 40px;
	
	pre {
        padding: 0!important;
        margin: 0!important;
	}
	
	code {
        margin: 0!important;
	    background: transparent!important;
	}
`;

export interface Props {
    element: CardCodeBlock;
}

export default class QardCodeBlock extends React.Component<Props, any> {
    public render() {
        const {language, code} = this.props.element;

        return (
            <Wrapper>
                <TitledWrapper innerProps={{
                    style: {
                        padding: 12,
                    }
                }} titleProps={{
                    style: {
                        fontSize: '.9em',
                        textTransform: "uppercase"
                    }
                }} title={language}>
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
                </TitledWrapper>
            </Wrapper>
        );
    }
}
