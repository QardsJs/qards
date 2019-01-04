import React from 'react';
import styled from 'styled-components';
import {Callout, Intent} from '@blueprintjs/core';
import {HTMLDivProps} from '@blueprintjs/core/src/common/props';

import {QardProps} from '../base';
import MarkdownRenderer from '../../markdown';
import QardBase from '../base';

const Wrapper = styled.div`
    margin-bottom: 20px;
`;

export interface CardCalloutType extends QardProps {
	title?: string;
	message: string;
	intent?: Intent;
}

interface State {

}

export default class QardCallout extends QardBase<CardCalloutType & HTMLDivProps, State> {
	render() {
		const {title, message, intent, ...props} = this.props;

		return (
			<Wrapper {...props}>
				<Callout
					intent={intent || Intent.NONE}
					title={title ? title : undefined}
				>
					<MarkdownRenderer md={message}/>
				</Callout>
			</Wrapper>
		);
	}
}
