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
import {
	tokenizePost,
	prependBaseUrl,
	getPluginsConfig,
	getSettingsConfig,
	getPostsConfig,
	mdWithoutEncodedComponents,
} from '../../../utils/helpers';
import config from '../../../../static/config/settings.json';

interface PostPageProps {
	post: PostType;
	related: PostType[];
	pinned?: PostType[];
	location: any;
}

class PostPage extends React.Component<PostPageProps, any> {
	get hasHeroImg() {
		const {post} = this.props;
		return post.frontmatter.hero &&
			post.frontmatter.hero.image &&
			post.frontmatter.hero.image.sharp &&
			post.frontmatter.hero.image.sharp.fixed;
	}

	get ogImage() {
		const {post} = this.props;

		if (this.hasHeroImg) {
			// @ts-ignore
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

	get ogImageDimensions(): {
		width: number;
		height: number;
	} {
		const {post} = this.props;

		if (this.hasHeroImg) {
			return {
				// @ts-ignore
				width : post.frontmatter.hero.image.sharp.fixed.width,
				// @ts-ignore
				height: post.frontmatter.hero.image.sharp.fixed.height,
			};
		} else {
			return {
				width : 550,
				height: 250,
			};
		}
	}

	get postUrl(): string {
		return prependBaseUrl(this.props.location.pathname);
	}

	get postTitle(): string {
		const tokenizedPost = tokenizePost(this.props.post);
		return tokenizedPost.frontmatter.title;
	}

	get postExcerpt(): string {
		const tokenizedPost = tokenizePost(this.props.post);
		return tokenizedPost.frontmatter.excerpt;
	}

	get postTags(): string {
		const tokenizedPost = tokenizePost(this.props.post);
		return (tokenizedPost.frontmatter.tags || []).join(', ');
	}

	get postImage(): string {
		return prependBaseUrl(this.ogImage);
	}

	get blogTitle(): string {
		return getSettingsConfig(['title']);
	}

	get authorName(): string {
		const overrideAuthor = getPostsConfig(['authorOverrideMetabox']) || false;
		if (overrideAuthor) {
			const {post} = this.props;
			return post.authors[0].frontmatter.title;
		}
		return this.blogTitle;
	}

	get schemaAuthorType(): string {
		const overrideAuthor = getPostsConfig(['authorOverrideMetabox']) || false;
		if (overrideAuthor) {
			return 'Organization';
		}
		return 'Person';
	}

	get schemaOrg(): any {
		const {post} = this.props;

		return {
			'@context'      : 'http://schema.org',
			'@type'         : 'BlogPosting',
			headline        : this.postTitle,
			genre           : post.categories[0].frontmatter.title,
			keywords        : this.postTags,
			url             : this.postUrl,
			datePublished   : post.frontmatter.created_at.toString(),
			image           : {
				'@type'   : 'imageObject',
				url       : getSettingsConfig(['baseUrl']),
				contentUrl: this.postImage,
				height    : this.ogImageDimensions.height.toString(),
				width     : this.ogImageDimensions.width.toString(),
			},
			author          : {
				'@type': this.schemaAuthorType,
				name   : this.authorName,
			},
			publisher       : {
				'@type': 'Organization',
				name   : this.blogTitle,
				logo   : {
					'@type'   : 'imageObject',
					contentUrl: prependBaseUrl(getSettingsConfig(['logo'])),
					url       : getSettingsConfig(['baseUrl']),
				},
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id'  : this.postUrl,
			},
			articleBody     : post.html,
		};
	}

	render() {
		const {post, related, pinned, location} = this.props;

		const tokenizedPost = tokenizePost(post);

		return <Layout>
			<Helmet title={tokenizedPost.frontmatter.title}>
				<html lang="en"/>
				<meta name="description" content={this.postExcerpt}/>
				<meta name="image" content={this.postImage}/>

				<script type="application/ld+json">
					{JSON.stringify(this.schemaOrg)}
				</script>

				<link rel="canonical" href={this.postUrl}/>

				<meta property="og:locale" content="en_US"/>
				<meta property="og:type" content="article"/>
				<meta property="og:title" content={this.postTitle}/>
				<meta property="og:description" content={this.postExcerpt}/>
				<meta property="og:url" content={this.postUrl}/>
				<meta property="og:site_name" content={config.name}/>

				<meta property="article:tag" content={this.postTags}/>
				<meta property="article:section"
					  content={tokenizedPost.categories ? tokenizedPost.categories[0].frontmatter.title : 'Uncategorized'}/>
				<meta property="article:published_time" content={tokenizedPost.frontmatter.created_at.toString()}/>
				<meta property="article:modified_time" content={tokenizedPost.frontmatter.created_at.toString()}/>

				<meta property="og:updated_time" content={tokenizedPost.frontmatter.created_at.toString()}/>
				<meta property="og:image" content={this.postImage}/>
				<meta property="og:image:secure_url" content={this.postImage}/>
				<meta property="og:image:width" content={this.ogImageDimensions.width.toString()}/>
				<meta property="og:image:height" content={this.ogImageDimensions.height.toString()}/>
				<meta property="og:image:alt" content={this.ogImageAlt}/>

				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:description" content={this.postExcerpt}/>
				<meta name="twitter:title" content={this.postTitle}/>
				<meta name="twitter:image" content={this.postImage}/>
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
