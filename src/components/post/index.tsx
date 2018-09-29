import React from 'react';

import {Box} from 'grid-styled';

import Hide from '../common/hide';
import Sidebar from './sidebar';
import Author from '../author';
import ScrollProgress from "../scroll-progress";
import {SidebarWrapper, Wrapper} from "./styles";
import PostComponent from "./post";
import {PostType} from "../../fragments/post";
import config from "../../../static/config/settings.json";

export interface Props {
	post: PostType;
	location: {
		href: string;
	};
}

export default class Post extends React.Component<Props, any> {
	public render() {
		const {post, location} = this.props;

		return (
			<Wrapper data-rpi-area>
				<Box width={[1, 1, 1, 3 / 5]} mt={[0, 0, 0, 60]}>
					<PostComponent preview={false} post={post}/>

					<Box mt={[40, 40, 40, 100]}>
						<Author author={post.authors[0]}/>
					</Box>
				</Box>
				<SidebarWrapper width={[0, 0, 0, 2 / 5]} mt={[0, 0, 0, 60]}>
					<Hide medium small xsmall className={'sidebar'}>
						<Sidebar wrapperProps={{style: {marginLeft: 60}}} post={post} currentUrl={location.href}/>
					</Hide>
				</SidebarWrapper>


				{config.posts.post_progress_show && <ScrollProgress identifier={post.id}/>}
			</Wrapper>
		);
	}
}
