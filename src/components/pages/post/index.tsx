import React from 'react';
import Helmet from 'react-helmet';
import {Box} from '@rebass/grid';

import {Wrapper} from '../styles';
import {PostType} from '../../../fragments/post';
import Layout from '../../layout';
import Content from '../../layout/content';
import Post from '../../post';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import {tokenizePost, prependBaseUrl, getPluginsConfig} from '../../../utils/helpers';
import config from '../../../../static/config/settings.json';

interface PostPageProps {
	post: PostType;
	related: PostType[];
	pinned?: PostType[];
	location: any;
}

class PostPage extends React.Component<PostPageProps, any> {

	get ogImage() {
		const {post} = this.props;

		if (post.frontmatter.hero && post.frontmatter.hero.image.sharp.fixed) {
			return post.frontmatter.hero.image.sharp.fixed.src;
		} else {
			return config.socialShareImg ? config.socialShareImg : '';
		}
	}

	get ogImageAlt() {
		const {post} = this.props;

		if (post.frontmatter.hero && post.frontmatter.hero.image) {
			return post.frontmatter.hero.image.sharp.alt;
		} else {
			return config.title;
		}
	}

	get ogImageDimensions() {
		const {post} = this.props;

		if (post.frontmatter.hero && post.frontmatter.hero.image.sharp.fixed) {
			return {
				width : post.frontmatter.hero.image.sharp.fixed.width,
				height: post.frontmatter.hero.image.sharp.fixed.height,
			};
		} else {
			return config.title;
		}
	}


	render() {
		const {post, related, pinned, location} = this.props;

		const tokenizedPost = tokenizePost(post);

		return <Layout>
			<Helmet title={tokenizedPost.frontmatter.title}>
				<html lang="en"/>
				<meta name="description" content={tokenizedPost.frontmatter.excerpt}/>

				<link rel="canonical" href={prependBaseUrl(location.pathname)}/>

				<meta property="og:locale" content="en_US"/>
				<meta property="og:type" content="article"/>
				<meta property="og:title" content={tokenizedPost.frontmatter.title}/>
				<meta property="og:description" content={tokenizedPost.frontmatter.excerpt}/>
				<meta property="og:url" content={prependBaseUrl(location.pathname)}/>
				<meta property="og:site_name" content={config.name}/>

				<meta property="article:tag" content={tokenizedPost.frontmatter.tags.join(', ')}/>
				<meta property="article:section"
					  content={tokenizedPost.categories ? tokenizedPost.categories[0].frontmatter.title : 'Uncategorized'}/>
				<meta property="article:published_time" content={tokenizedPost.frontmatter.created_at.toString()}/>
				<meta property="article:modified_time" content={tokenizedPost.frontmatter.created_at.toString()}/>

				<meta property="og:updated_time" content={tokenizedPost.frontmatter.created_at.toString()}/>
				<meta property="og:image" content={prependBaseUrl(this.ogImage)}/>
				<meta property="og:image:secure_url" content={prependBaseUrl(this.ogImage)}/>
				<meta property="og:image:width" content={this.ogImageDimensions.width}/>
				<meta property="og:image:height" content={this.ogImageDimensions.height}/>
				<meta property="og:image:alt" content={this.ogImageAlt}/>

				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:description" content={tokenizedPost.frontmatter.excerpt}/>
				<meta name="twitter:title" content={tokenizedPost.frontmatter.title}/>
				<meta name="twitter:image" content={prependBaseUrl(this.ogImage)}/>
			</Helmet>

			<Wrapper>
				<Content style={{
					marginBottom: 40,
				}}>
					<Post post={tokenizedPost} location={location} pinnedPosts={pinned}/>
				</Content>

				{related.length > 0 && <Box mt={[80, 80, 80, 120]}>
					<Content darkTheme={true}>
						<Posts darkTheme={true} showExcerpt={true} posts={related} title={`More like this`}/>
					</Content>
				</Box>}

				{getPluginsConfig(['emailSubscribers', 'enable']) && <Content>
					<Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
						<Subscribe/>
					</Box>
				</Content>}
			</Wrapper>
		</Layout>;
	}
}

export default PostPage;
