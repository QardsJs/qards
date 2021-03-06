import React from 'react';

import TrackVisibility from 'react-on-screen';

import MarkdownRender from '../markdown';
import {Article, Date, Excerpt, Hero, Title} from './styles';
import {cPattern, lineRepresentsEncodedComponent} from '../../utils/helpers';
import {decodeWidgetDataObject} from '../../cms/utils';

import QardHeader from '../qard/header';
import QardImageContent from '../qard/image/content';
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

interface bodyLine {
	line: string;
	computed: any;
	isWidget: boolean;
}

interface State {
	bodyLines: bodyLine[];
}

export default class Post extends React.Component<Props, State> {
	state = {bodyLines: []};

	//	do not add widgets here if they are not imported above
	staticWidgets = ['image', 'qards-section-heading'];

	/**
	 * I can't stress this enough but we should import only what
	 * is required by the post. We will have huge pages otherwise
	 * and our responsiveness will suffer.
	 *
	 * The only exception here is the QardHeader module which I
	 * consider to be required in order to output a SEO friendly
	 * post page that renders headings and paragraphs before anything
	 * else that gets resolved meanwhile.
	 */
	async renderComponent(line: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const {preview, post} = this.props;

			const params = line.match(cPattern);
			if (!params || params.length < 3) return;

			const widget = params[1];
			const config = decodeWidgetDataObject(params[2]);

			let module: string | null;

			//	image and header are loaded for all posts immediately
			switch (widget) {
				case 'image':
					module = 'image/content';
					break;
				case 'qards-code':
					module = 'code';
					break;
				case 'qards-reveal':
					module = 'reveal';
					break;
				case 'qards-callout':
					module = 'callout';
					break;
				case 'qards-audio':
					module = 'audio';
					break;
				case 'qards-video':
					module = 'video';
					break;
				case 'qards-divider':
					module = 'divider';
					break;
				case 'qards-gallery':
					module = 'gallery';
					break;
				case 'qards-countdown':
					module = 'countdown';
					break;
				case 'qards-reference':
					module = 'reference';
					break;
				case 'qards-section-heading':
					module = 'header/';
					break;
				default:
					module = null;
			}

			if (module) {
				//	There needs to be a single import
				return import(/* webpackPrefetch: true */`../qard/${module}`).then(({default: Component}) => {
					resolve(<TrackVisibility once>
						<Component post={post} preview={preview} {...config}/>
					</TrackVisibility>);
				});
			} else {
				reject(`Unknown widget: ${widget}`);
			}
		});
	}

	renderImage(config: any) {
		const {preview, post} = this.props;
		return <QardImageContent post={post} preview={preview} {...config}/>;
	}

	renderHeading(config: any) {
		return <QardHeader {...config}/>;
	}

	//	`QardHeader` and `QardImageContent` are the only cards being loaded
	//	here by default so they can be inserted into a static render in order
	//	to mitigate the loss of content for cralwers that lack a javascript
	//	interpreter
	renderStaticWidget(line: string) {
		const params = line.match(cPattern);

		if (!params || params.length < 3) return;

		const widget = params[1];
		const config = decodeWidgetDataObject(params[2]);

		switch (widget) {
			case 'image':
				return this.renderImage(config);
			default:
				return this.renderHeading(config);
		}
	}

	bodyMd(props?: Props): string {
		const {post, previewData} = props ? props : this.props;
		return (post ? post.html : (previewData ? previewData.md : '')) || '';
	}

	get mdLines(): string[] {
		return this.bodyMd(this.props).split('\n');
	}

	isAsyncWidget(widget: string | null): boolean {
		return !this.staticWidgets.includes(widget || '');
	}

	widgetFromLine(line: string): string {
		const params = line.match(cPattern);
		if (!params || params.length < 3) throw new Error('bad widget detected');
		return params[1];
	}

	async setBodyLines() {
		const lines = this.mdLines;

		let bodyLines: bodyLine[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (!line.trim().length) continue;

			if (lineRepresentsEncodedComponent(line)) {
				const computed = await this.renderComponent(line);

				bodyLines.push({
					line, computed, isWidget: true,
				});
			} else {
				bodyLines.push({
					line, computed: line, isWidget: false,
				});
			}
		}

		this.setState({bodyLines});
	}

	async componentDidMount(): Promise<void> {
		return this.setBodyLines();
	}

	async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): Promise<void> {
		//	when using the CMS we need to update the state each time we update the body
		//	but make sure we're not doing an endless loop here so we just do a match on the
		//	body to detect changes and propagate our lines into state
		if (this.bodyMd(prevProps) !== this.bodyMd()) {
			return this.setBodyLines();
		}
	}

	renderSection(part: string) {
		//	If we're in preview mode we need to load the markdown ourselves
		//	In normal mode, we use the HTML from our props
		const {preview, post} = this.props;

		return preview ? <div className="paragraphs">
			<MarkdownRender md={part}/>
		</div> : <div className="paragraphs" dangerouslySetInnerHTML={{
			__html: part,
		}}/>;
	}

	renderStaticBody() {
		//	Since we're code splitting the qard modules and lazy loading them
		//	we're losing SEO. This method returns the markdown without the qard
		//	modules so we can push the text content out right away until the
		//	modules get loaded
		let accumulator: string[] = [];

		return <React.Fragment>
			{this.mdLines.map((line: string, k) => {
				if (lineRepresentsEncodedComponent(line)) {
					if (!this.isAsyncWidget(this.widgetFromLine(line))) {
						//	render everything that is collected inside
						//	our accumulator and then render the component
						//	also resets the accumulator
						const acc = accumulator.join('\n');
						accumulator = [];

						return <React.Fragment key={k}>
							{this.renderSection(acc)}
							{this.renderStaticWidget(line)}
						</React.Fragment>;
					}
				} else {
					//	non-component, add it to our acc
					accumulator.push(line);
				}
			})}

			{(accumulator.length > 0) && this.renderSection(accumulator.join('\n\n'))}
		</React.Fragment>;
	}

	renderBody() {
		if (this.state.bodyLines.length == 0) return this.renderStaticBody();

		let accumulator: string[] = [];

		return <React.Fragment>
			{this.state.bodyLines.map((line: bodyLine, k) => {
				if (line.isWidget) {
					//	Render everything that is collected inside
					//	our accumulator and then render the component.
					//	Also resets the accumulator.
					//	Make sure you join with double new lines otherwise the
					//	computed markdown might render invalid by joining several
					//	lines that don't belong together
					const acc = accumulator.join('\n\n');

					accumulator = [];

					return <React.Fragment key={k}>
						{this.renderSection(acc)}
						{line.computed}
					</React.Fragment>;
				} else {
					//	non-component, add it to our acc
					accumulator.push(line.computed);
				}
			})}

			{/* Render the last bits that entered the accumulator */}
			{accumulator.length > 0 && this.renderSection(accumulator.join('\n\n'))}
		</React.Fragment>;
	}

	render() {
		const {post, previewData} = this.props;

		//	Normalize some items by being prepared for preview (netlify cms) and production
		const title = post ? post.frontmatter.title : (previewData ? previewData.title : '');
		const created_at = post ? post.frontmatter.created_at : (previewData ? previewData.created_at : '');
		const updated_at = post ? post.parent.modifiedTime : '';
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

		let created = `Created: ${created_at.toString()}`;
		if (updated_at && updated_at != '' && updated_at != created_at) {
			created = `Updated: ${updated_at.toString()}`;
		}

		return (
			<Article>
				{title && <Title className={'qards-post-title'}>{title}</Title>}
				<Date className={'qards-post-date'}>{created}</Date>
				{hero && <Hero className={'qards-post-hero'}><QardImageContent lightbox={true} {...hero}/></Hero>}
				{excerpt && <Excerpt className={'qards-post-excerpt'}>{excerpt}</Excerpt>}

				{this.renderBody()}
			</Article>
		);
	}
}
