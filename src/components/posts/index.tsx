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
	gridConfig?: number[];

	//  if these cards are rendered using a dark theme
	darkTheme?: boolean;
	pagination?: PaginationType;

	//	in coverversion set to true we only show the cover
	coverversion?: boolean;
}

interface State {

}

export default class Posts extends Component<Props, State> {
	static renderAuthor(post: PostType) {
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
		if (post.frontmatter.hero && post.frontmatter.hero.image) {
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
		const {posts, title, pagination, showExcerpt, darkTheme, coverversion, gridConfig} = this.props;
		const performance = getSettingsConfig('performanceMode');

		const result: PostType[] = [];

		for (let i = 0; i < posts.length; i++) {
			result.push(tokenizePost(posts[i]));
		}

		const showHero = (!performance && !coverversion) || coverversion;

		return (
			<Wrapper coverversion={coverversion || false} className={darkTheme ? 'darktheme' : ''}>
				{title && <h3>{title}</h3>}

				<List as="ul" style={{
					margin: '0 -20px',
				}}>
					{result.map((post, key) => {
						return <ListItem
							width={gridConfig || [6 / 6, 3 / 6, 2 / 6]}
							px={'20px'}
							as="li"
							key={key}
							className={`itemli`}
							style={coverversion ? {} : {marginTop: 20}}
						>
							<Article className={'post-card-article'}>
								<StyledCard
									coverversion={coverversion ? 1 : 0}
									to={post.fields.slug}
									className={`post-card unselectable ${performance ? 'performance' : ''} ${coverversion ? 'cover' : ''}`}
								>
									{showHero && Posts.renderHero(post)}

									{coverversion && <h5 className={`cover title ${performance ? 'performance' : ''}`}>
										{post.frontmatter.title}
									</h5>}

									{coverversion && <p className={`cover excerpt ${performance ? 'performance' : ''}`}>
										{post.frontmatter.excerpt}
									</p>}

									{!coverversion &&
									<Content className={'post-card-content'}>
										<span className={`date`}>{post.frontmatter.created_at}</span>
										<h5 className={`title`}>{post.frontmatter.title}</h5>
										{showExcerpt !== false &&
										<p className={`excerpt`}>{post.frontmatter.excerpt}</p>}
									</Content>}

									{!coverversion && Posts.renderAuthor(post)}
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
