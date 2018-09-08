import React, {Component} from 'react';

import styled from 'styled-components';

import theme from '../../theme';
import Toc from './toc';
import Tags from './tags';
import Subscribe from '../subscribe';
import SocialShare from '../social-share';
import TitledWrapper from '../common/titled-wrapper';


import {Post as PostProps} from '../../templates/types';
import {HTMLDivProps} from "@blueprintjs/core";

const Wrapper = styled.div`
    color: black;
`;

const TocTitle = styled.h4`
    padding-top: 10px;
    margin: 0 0 10px 0;
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
    post: PostProps;
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
                        padding: 12
                    }
                }}>
                    <Toc cards={post.cards}/>
                </TitledWrapper>

                <SocialShareWrapper>
                    <SocialShare url={currentUrl} message={post.title}/>
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
