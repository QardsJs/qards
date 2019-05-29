import React from 'react';

import {Box, div} from '@rebass/grid';
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
import {graphql, StaticQuery} from 'gatsby';
import {LogoDataProps} from '../logo';

export interface Props {
	post: PostType;
	pinnedPosts?: PostType[];
	location: {
		href: string;
	};
}

export default class Post extends React.Component<Props, any> {
	public render() {
		const {post, pinnedPosts, location} = this.props;

		const showProgress = getPostsConfig('progressShow');
		const performanceMode = getSettingsConfig('performanceMode');
		const disqusEnabled = getPluginsConfig(['disqus', 'enable']);

		const authorOverrideMetabox = getPostsConfig(['authorOverrideMetabox']);

		let authorName = post.authors[0].frontmatter.title;
		let authorExcerpt = post.authors[0].frontmatter.excerpt;
		let authorAvatar = post.authors[0].frontmatter.avatar.image;

		return <StaticQuery
			query={graphql`
					query {
						logo: allFile(limit: 1, filter: {absolutePath: {regex: "/images\/uploads\/logo\\.(jpg|png)/"}}) {
							edges {
								node {
									thumb: childImageSharp {
										fixed(width: 80) {
											width
											height
											tracedSVG
											aspectRatio
											src
											srcSet
										}
									}
								}
							}
						}
					}
				`}
			render={(data: LogoDataProps) => {
				if (authorOverrideMetabox == true) {
					//	Site info instead of author info
					authorName = getSettingsConfig(['title']);
					authorExcerpt = getSettingsConfig(['excerpt']);
					authorAvatar = data.logo.edges[0].node.thumb;
				}

				return (
					<Wrapper data-rpi-area>
						<Box width={[1, 1, 1, 3 / 5]} mt={[0, 0, 0, 60]}>
							<PostComponent preview={false} post={post}/>

							{post.frontmatter.showAuthor != false && <Box mt={[40, 40, 40, 100]}>
								<Author
									name={authorName}
									excerpt={authorExcerpt}
									avatar={authorAvatar}
									roundedAvatar={!authorOverrideMetabox}
								/>
							</Box>}


							{disqusEnabled && typeof window != 'undefined' && <div style={{
								marginTop: 80,
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
								<Sidebar
									wrapperProps={{style: {marginLeft: 60}}}
									post={post}
									pinnedPosts={pinnedPosts}
									currentUrl={location.href}
								/>
							</Hide>
						</SidebarWrapper>

						{(showProgress && !performanceMode) && <ScrollProgress identifier={post.id}/>}
					</Wrapper>
				);
			}}
		/>;
	}
}
