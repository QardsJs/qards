import React from 'react';

import Loadable from 'react-loadable';
import TrackVisibility from 'react-on-screen';

import {Article, Date, Excerpt, Hero, Title} from './styles';
import MarkdownRender from '../markdown';
import {cPattern, lineRepresentsEncodedComponent} from '../../utils/helpers';
import {decodeWidgetDataObject} from '../../cms/utils';

import QardImageContent from '../qard/image/content';
import {PostType} from '../../fragments/post';
import {HTMLDivProps} from '@blueprintjs/core';
import {div} from '@rebass/grid';

// const LoadableQardHeader = Loadable({
// 	loader : () => import('../qard/header'),
// 	loading: Loading,
// });

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

interface bodyLine {
	line: string;
	rendered: any;
	isWidget: boolean;
}

interface State {
	bodyLines: bodyLine[];
}

export default class Post extends React.Component<Props, State> {
	state = {bodyLines: []};

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
		if (!params || params.length < 3) return <React.Fragment/>;

		const widget = params[1];
		const config = decodeWidgetDataObject(params[2]);

		let Component = null;

		switch (widget) {
			case 'image':
				Component = require('../qard/image/content').default;
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
				Component = require('../qard/header/').default;
				break;
			default:
				Component = null;
		}

		if (Component) {
			return <TrackVisibility once>
				<Component post={post} preview={preview} {...config}/>
			</TrackVisibility>;
		}
	}


	componentDidMount() {
		const {post, previewData} = this.props;

		let md: string = post ? post.md : (previewData ? previewData.md : '');

		let bodyLines: bodyLine[] = [];

		//	first identify the qard components that need to be resolved
		//	so we can then iterate and replace all of them in one go
		const lines = md.split('\n');
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (lineRepresentsEncodedComponent(line)) {
				const rendered = this.renderComponent(line);

				bodyLines.push({
					line, rendered, isWidget: true,
				});
			} else {
				bodyLines.push({
					line, rendered: line, isWidget: false,
				});
			}
		}

		this.setState({bodyLines});
	}


	renderBody() {
		if (!this.state.bodyLines.length) return <React.Fragment/>;

		let accumulator: string[] = [];

		return <React.Fragment>
			{this.state.bodyLines.map((line: bodyLine, k) => {
				if (line.isWidget) {
					//	render everything that is collected inside
					//	our accumulator and then render the component
					//	also resets the accumulator
					const acc = accumulator.join('\n');
					accumulator = [];

					return <React.Fragment key={k}>
						<div className="paragraphs">
							<MarkdownRender md={acc}/>
						</div>
						{line.rendered}
					</React.Fragment>;
				} else {
					//	non-component, add it to our acc
					accumulator.push(line.rendered);
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

				{this.renderBody()}
			</Article>
		);
	}
}
