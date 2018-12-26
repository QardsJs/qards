import React, {Component} from 'react';

import styled from 'styled-components';

import theme from '../../theme';
import Toc from './toc';
import Tags from './tags';
import Subscribe from '../subscribe';
import SocialShare from '../social-share';

import {HTMLDivProps} from '@blueprintjs/core';
import {PostType} from '../../fragments/post';
import {getPostsConfig, getPluginsConfig} from '../../utils/helpers';
import Posts from '../posts';

const Wrapper = styled.div`
    color: black;
`;

export const SidebarItem = styled.div`
	margin-bottom: 60px;
`;

const SubscribeWrapper = styled.div`
	.title {
		font-size: 1.2rem !important;
	}

	.subtitle {
		font-size: 0.85rem;
		margin-bottom: 20px;
		color: ${theme.color(['lightText'])};
	}
`;

const SocialShareWrapper = styled.div`

`;

const TagsWrapper = styled.div`
	.title {
		font-size: 1.2rem !important;
	}
`;

interface Props {
	post: PostType;
	pinnedPosts?: PostType[];
	currentUrl: string;
	wrapperProps?: HTMLDivProps;
}

export default class PostSidebar extends Component<Props, any> {
	render() {
		const {post, currentUrl, pinnedPosts} = this.props;

		return (
			<Wrapper {...this.props.wrapperProps}>
				{getPostsConfig('tocShow') && <Toc post={post}/>}

				{getPostsConfig('socialShow') && <SidebarItem>
					<SocialShareWrapper>
						<SocialShare url={currentUrl} message={post.frontmatter.title}/>
					</SocialShareWrapper>
				</SidebarItem>}

				{pinnedPosts && pinnedPosts.length > 0 && <SidebarItem>
					<Posts showExcerpt={false} posts={pinnedPosts} coverversion={true} gridConfig={[1]}/>
				</SidebarItem>}

				{(getPostsConfig('subscribeShow') && getPluginsConfig(['emailSubscribers', 'enable'])) &&
				<SidebarItem>
					<SubscribeWrapper>
						<Subscribe/>
					</SubscribeWrapper>
				</SidebarItem>}

				<TagsWrapper>
					<b className="title">Tags</b>
					<Tags post={post}/>
				</TagsWrapper>
			</Wrapper>
		);
	}
}
