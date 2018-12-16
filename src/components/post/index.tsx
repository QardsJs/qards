import React from 'react';

import {Box, div} from 'grid-styled';
// @ts-ignore

import Hide from '../common/hide';
import Sidebar from './sidebar';
import Author from '../author';
import ScrollProgress from '../scroll-progress';
import {SidebarWrapper, Wrapper} from './styles';
import PostComponent from './post';
import {PostType} from '../../fragments/post';
import {getPostsConfig, getSettingsConfig, getPluginsConfig} from '../../utils/helpers';
import Disqus from '../disqus';

export interface Props {
	post: PostType;
	location: {
		href: string;
	};
}

export default class Post extends React.Component<Props, any> {
	public render() {
		const {post, location} = this.props;

		const showProgress = getPostsConfig('progressShow');
		const performanceMode = getSettingsConfig('performanceMode');
		const disqusEnabled = getPluginsConfig(['disqus', 'enable']);

		return (
			<Wrapper data-rpi-area>
				<Box width={[1, 1, 1, 3 / 5]} mt={[0, 0, 0, 60]}>
					<PostComponent preview={false} post={post}/>

					{post.frontmatter.showAuthor != false && <Box mt={[40, 40, 40, 100]}>
						<Author author={post.authors[0]}/>
					</Box>}


					{disqusEnabled && <div style={{
						marginTop: 80
					}}>
						<Disqus
							url={window.location.href}
							identifier={post.id}
							title={post.frontmatter.title}
						/>
					</div>}
				</Box>
				<SidebarWrapper width={[0, 0, 0, 2 / 5]} mt={[0, 0, 0, 60]}>
					<Hide medium small xsmall className={'sidebar'}>
						<Sidebar wrapperProps={{style: {marginLeft: 60}}} post={post} currentUrl={location.href}/>
					</Hide>
				</SidebarWrapper>

				{(showProgress && !performanceMode) && <ScrollProgress identifier={post.id}/>}
			</Wrapper>
		);
	}
}
