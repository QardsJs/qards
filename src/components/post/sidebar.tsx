import React, {Component} from 'react';

import styled from 'styled-components';

import theme from '../../theme';
import Toc from './toc';
import Tags from './tags';
import Subscribe from '../subscribe';
import SocialShare from '../social-share';
import TitledWrapper from '../common/titled-wrapper';

import {HTMLDivProps} from "@blueprintjs/core";
import {PostType} from "../../fragments/post";

const Wrapper = styled.div`
    color: black;
`;

const TocTitle = styled.h4`
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: 400;
    font-size: 1rem;
    color: ${theme.colors.lightText};
`;

const SubscribeWrapper = styled.div`
	margin-top: 80px;

	.title {
		font-size: 1.2rem !important;
	}

	.subtitle {
		font-size: 0.85rem;
		margin-bottom: 20px;
		color: ${theme.colors.lightText};
	}
`;

const SocialShareWrapper = styled.div`
	margin-top: 40px;
`;

const TagsWrapper = styled.div`
	margin-top: 80px;
	
	.title {
		font-size: 1.2rem !important;
	}
`;

interface Props {
	post: PostType;
	currentUrl: string;
	wrapperProps?: HTMLDivProps;
}

export default class PostSidebar extends Component<Props, any> {


	render() {
		const {post, currentUrl} = this.props;

		return (
			<Wrapper {...this.props.wrapperProps}>
				<TitledWrapper title={<TocTitle>Table of contents</TocTitle>} innerProps={{
					style: {
						padding: 0
					}
				}}>
					<Toc post={post}/>
				</TitledWrapper>

				<SocialShareWrapper>
					<SocialShare url={currentUrl} message={post.frontmatter.title}/>
				</SocialShareWrapper>


				<SubscribeWrapper>
					<Subscribe/>
				</SubscribeWrapper>

				<TagsWrapper>
					<b className="title">Tags</b>
					<Tags post={post}/>
				</TagsWrapper>
			</Wrapper>
		);
	}
}
