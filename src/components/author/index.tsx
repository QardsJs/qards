import React, {Component} from 'react';
import {Box, Flex} from '@rebass/grid';
import Img from 'gatsby-image';

import {HTMLDivProps} from '@blueprintjs/core/src/common/props';

import Markdown from '../markdown';
import {CardImageType} from '../qard/image';
import {Wrapper, Avatar} from './styles';

interface Props {
	name: string;
	avatar: CardImageType;
	excerpt: string;
	roundedAvatar?: boolean;
}

export default class PostAuthor extends Component<Props & HTMLDivProps> {
	render() {
		const {name, avatar, excerpt, roundedAvatar, ...rest} = this.props;

		return (
			<Wrapper {...rest}>
				<Flex>
					<Box width={100}>
						<Avatar className={roundedAvatar ? 'rounded' : ''}>
							<Img {...avatar}/>
						</Avatar>
					</Box>
					<Box flex={'1 1 auto'} pt={1} pb={2}>
						<b className={'name'}>{name}</b>
						<div className="bio">
							<Markdown md={excerpt}/>
						</div>
					</Box>
				</Flex>
			</Wrapper>
		);
	}
}
