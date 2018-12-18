import React from 'react';

import TrackVisibility from 'react-on-screen';

import {Article, Date, Excerpt, Hero, Title} from './styles';
import MarkdownRender from '../markdown';
import {cPattern, lineRepresentsEncodedComponent} from '../../utils/helpers';
import {decodeWidgetDataObject} from '../../cms/utils';

import {QardImageContent} from '../qard/image';

import {PostType} from '../../fragments/post';

export interface Props {
	post?: PostType;
	//  if it's an admin preview (netlify cms) certain features will behave differently
	preview?: boolean;
	previewData?: {
		md: string;
		title: string;
		excerpt: string;
		created_at: string;
		heroImage: {
			alt: string;
			image: string;
		}
	}
}

export default class Post extends React.Component<Props, any> {
	/**
	 * I can't stress this enough but we should import only what
	 * is required by the post. We will have huge pages otherwise
	 * and our speed will have to suffer.
	 *
	 * Currently not working and the template seems to load all
	 * of the following require statements regardless of the post's
	 * own requirements in terms of qards components so...consider
	 * this a work in progress.
	 */
	renderComponent(line: string) {
		const {preview, post} = this.props;

		const params = line.match(cPattern);
		if (!params || params.length < 3) return;

		const widget = params[1];
		const config = decodeWidgetDataObject(params[2]);

		let Component;

		switch (widget) {
			case 'image':
				Component = QardImageContent;
				break;
			case 'qards-code':
				Component = require('../qard/code').default;
				break;
			case 'qards-reveal':
				Component = require('../qard/reveal').default;
				break;
			case 'qards-callout':
				Component = require('../qard/callout').default;
				break;
			case 'qards-audio':
				Component = require('../qard/audio').default;
				break;
			case 'qards-video':
				Component = require('../qard/video').default;
				break;
			case 'qards-divider':
				Component = require('../qard/divider').default;
				break;
			case 'qards-gallery':
				Component = require('../qard/gallery').default;
				break;
			case 'qards-countdown':
				Component = require('../qard/countdown').default;
				break;
			case 'qards-reference':
				Component = require('../qard/reference').default;
				break;
			case 'qards-section-heading':
				Component = require('../qard/header').default;
				break;
		}

		return Component ? <TrackVisibility once>
				<Component post={post} preview={preview} {...config}/>
			</TrackVisibility> :
			<p style={{color: 'red', display: 'block'}}>Unknown widget: <b>{widget}</b></p>;
	}

	renderBody(body: string) {
		if (!body) return '';

		//	Create an accumulator for non-component lines
		let accumulator: string[] = [];

		return <React.Fragment>
			{body.split('\n').map((line, k) => {
				if (lineRepresentsEncodedComponent(line)) {
					//	render everything that is collected inside
					//	our accumulator and then render the component
					//	also resets the accumulator
					const acc = accumulator.join('\n');
					accumulator = [];

					return <React.Fragment key={k}>
						<div className="paragraphs">
							<MarkdownRender md={acc}/>
						</div>
						{this.renderComponent(line)}
					</React.Fragment>;
				} else {
					//	non-component, add it to our acc
					accumulator.push(line);
				}
			})}

			{(accumulator.length > 0) && <div className="paragraphs">
				<MarkdownRender md={accumulator.join('\n')}/>
			</div>}
		</React.Fragment>;
	}

	render() {
		const {post, previewData} = this.props;

		//	Normalize some items by being prepared for preview (netlify cms) and production
		const title = post ? post.frontmatter.title : (previewData ? previewData.title : '');
		const created_at = post ? post.frontmatter.created_at : (previewData ? previewData.created_at : '');
		const excerpt = post ? post.frontmatter.excerpt : (previewData ? previewData.excerpt : '');

		let hero;
		if (post && post.frontmatter.hero && post.frontmatter.hero.image) {
			hero = {
				alt: post.frontmatter.hero.alt || '',
				...post.frontmatter.hero.image.sharp,
			};
		} else if (previewData && previewData.heroImage.image) {
			hero = {
				src: previewData.heroImage.image,
				alt: previewData.heroImage.alt || '',
			};
		}
		const md = post ? post.md : (previewData ? previewData.md : '');

		return (
			<Article>
				{title && <Title className={'qards-post-title'}>{title}</Title>}
				{created_at && <Date className={'qards-post-date'}>{created_at.toString()}</Date>}
				{hero && <Hero className={'qards-post-hero'}><QardImageContent {...hero}/></Hero>}
				{excerpt && <Excerpt className={'qards-post-excerpt'}>{excerpt}</Excerpt>}

				{this.renderBody(md)}
			</Article>
		);
	}
}
