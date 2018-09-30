import React from 'react';

import TrackVisibility from 'react-on-screen';

import {Article, Date, Excerpt, Hero, Title} from './styles';
import MarkdownRender from '../markdown';
import {cPattern, lineRepresentsEncodedComponent} from '../../utils/helpers';
import {decodeWidgetDataObject} from '../../cms/utils';

import QardReveal from '../qard/reveal';
import QardCallout from '../qard/callout';
import QardVideo from '../qard/video';
import QardAudio from '../qard/audio';
import QardDivider from '../qard/divider';
import QardHeader from '../qard/header';
import QardGallery from '../qard/gallery';
import QardCode from '../qard/code';
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
	renderComponent(line: string) {
		const {preview, post} = this.props;

		const params = line.match(cPattern);
		if (!params || params.length < 3) return;

		const widget = params[1];
		const config = decodeWidgetDataObject(params[2]);

		const cards: {[s: string]: any;} = {
			'image'                : QardImageContent,
			'qards-code'           : QardCode,
			'qards-reveal'         : QardReveal,
			'qards-callout'        : QardCallout,
			'qards-audio'          : QardAudio,
			'qards-video'          : QardVideo,
			'qards-divider'        : QardDivider,
			'qards-gallery'        : QardGallery,
			'qards-section-heading': QardHeader,
		};

		let Component: any = cards[widget];

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
		const heroImage = post ? {
			alt: post.frontmatter.hero.alt,
			...post.frontmatter.hero.image.sharp,
		} : (previewData && previewData.heroImage.image ? {
			src: previewData.heroImage.image,
			alt: previewData.heroImage.alt,
		} : '');
		const md = post ? post.md : (previewData ? previewData.md : '');

		return (
			<Article>
				{title && <Title>{title}</Title>}
				{created_at && <Date>{created_at.toString()}</Date>}
				{heroImage && <Hero><QardImageContent {...heroImage}/></Hero>}
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				{this.renderBody(md)}
			</Article>
		);
	}
}
