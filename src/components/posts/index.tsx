import React, {Component} from 'react';
import Img from 'gatsby-image';
import TrackVisibility from 'react-on-screen';
import LazyLoad from 'react-lazyload';

import Pagination from '../pagination';
import {Pagination as PaginationType} from '../rogue-interfaces';
import {PostType} from '../../fragments/post';
import {readingTime, tokenizePost, getSettingsConfig} from '../../utils/helpers';
import {
	Article,
	Author,
	AuthorContent,
	Content,
	Cover,
	Gravatar,
	List,
	ListItem,
	StyledCard,
	Wrapper,
} from './styles';


interface Props {
	posts: PostType[];
	showExcerpt?: boolean;
	title?: string;

	//  if these cards are rendered using a dark theme
	darkTheme?: boolean;
	pagination?: PaginationType;

	//	in coverVersion set to true we only show the cover
	coverVersion?: boolean;
}

interface State {

}

export default class Posts extends Component<Props, State> {
	static renderAuthor(post: PostType) {
		const performance = getSettingsConfig('performanceMode');

		if (post.authors && post.authors.length) {
			return <Author className={'post-card-author'}>
				{post.authors[0].frontmatter.avatar && !performance &&
				<TrackVisibility once>
					<Gravatar>
						<Img fixed={post.authors[0].frontmatter.avatar.image.fixed}/>
					</Gravatar>
				</TrackVisibility>}

				<AuthorContent className={performance ? 'no-avatar' : ''}>
					<div className="name">
						{post.authors[0].frontmatter.title}
					</div>

					<div className="info">
						{Number(readingTime(post).minutes).toFixed(0)} min
						in <b>{post.categories[0].frontmatter.title}</b>
					</div>
				</AuthorContent>
			</Author>;
		}
	}

	static renderHero(post: PostType) {
		const performance = getSettingsConfig('performanceMode');

		if (post.frontmatter.hero && post.frontmatter.hero.image && !performance) {
			return <Cover className={'post-card-cover'}>
				<TrackVisibility once>
					<LazyLoad height={210}>
						<Img
							alt={post.frontmatter.hero.alt}
							fluid={post.frontmatter.hero.image.thumb.fluid}
							style={{height: 210}}
						/>
					</LazyLoad>
				</TrackVisibility>
			</Cover>;
		}
	}

	render() {
		const {posts, title, pagination, showExcerpt, darkTheme, coverVersion} = this.props;
		const performance = getSettingsConfig('performanceMode');

		const result: PostType[] = [];

		for (let i = 0; i < posts.length; i++) {
			result.push(tokenizePost(posts[i]));
		}

		return (
			<Wrapper coverVersion={coverVersion || false} className={darkTheme ? 'darktheme' : ''}>
				{title && <h3>{title}</h3>}

				<List as="ul" style={{
					margin: '0 -20px',
				}}>
					{result.map((post, key) => {
						return <ListItem
							width={[1]}
							px={'20px'}
							as="li"
							key={key}
							className={`itemli`}
						>
							<Article className={'post-card-article'}>
								<StyledCard
									coverVersion={coverVersion || false}
									to={post.fields.slug}
									className={`post-card unselectable ${performance ? 'performance' : ''} ${coverVersion ? 'cover' : ''}`}
								>
									{!performance && Posts.renderHero(post)}

									{coverVersion && <h5 className={`cover title`}>{post.frontmatter.title}</h5>}
									{coverVersion && <p className={`cover excerpt`}>{post.frontmatter.excerpt}</p>}

									{!coverVersion || performance &&
									<Content className={'post-card-content'}>
										<span className={`date`}>{post.frontmatter.created_at}</span>
										<h5 className={`title`}>{post.frontmatter.title}</h5>
										{showExcerpt !== false &&
										<p className={`excerpt`}>{post.frontmatter.excerpt}</p>}
									</Content>}

									{!coverVersion && !performance && Posts.renderAuthor(post)}
								</StyledCard>
							</Article>
						</ListItem>;
					})}

				</List>

				{pagination && <Pagination {...pagination}/>}
			</Wrapper>
		);
	}
}
