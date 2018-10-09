import * as React from 'react';
import {Link} from 'gatsby';
import {Flex, Box, div} from 'grid-styled';
import {limit} from 'stringz';

import QardBase, {QardProps} from '../base';
import {Wrapper} from './styles';
import {PostType} from '../../../fragments/post';
import Img from 'gatsby-image';

export interface CardReferenceType extends QardProps {
	reference: PostType | string;
}

interface State {
}

class LinkWrapper extends React.Component<any, any> {
	render() {
		const {preview, reference, children} = this.props;

		if (preview) {
			return <a onClick={(e) => e.preventDefault()}>{children}</a>;
		}

		return <Link to={reference.fields.slug}>{children}</Link>;
	}
}

export default class QardReference extends QardBase<CardReferenceType, State> {
	get referenceObject() {
		const {reference, post} = this.props;

		if (!post || !post.references) return null;

		for (let i = 0; i < post.references.length; i++) {
			if (post.references[i].frontmatter.title == reference) {
				return post.references[i];
			}
		}

		return null;
	}

	get previewRender() {
		const {reference} = this.props;

		return <React.Fragment>
			<b className={`title`}>{reference}</b>
			<span className="bp3-skeleton">&nbsp;</span>
			<span className="bp3-skeleton">&nbsp;</span>
			<span className="bp3-skeleton">&nbsp;</span>
		</React.Fragment>;
	}

	get referenceRender() {
		if (!this.referenceObject) return '';

		return <React.Fragment>
			<b className={'title'}>{this.referenceObject.frontmatter.title}</b>
			<span className={'excerpt'}>{limit(this.referenceObject.frontmatter.excerpt, 180, '')}</span>
		</React.Fragment>;
	}

	get referenceHero() {
		if (!this.referenceObject) return '';
		return <Img fluid={this.referenceObject.frontmatter.hero.image.thumb.fluid}/>;
	}

	render() {
		const {reference, preview} = this.props;

		if (!reference || (!preview && !this.referenceObject)) return '';

		return <Wrapper>
			<LinkWrapper reference={this.referenceObject} preview={preview}>
				<Flex alignItems={'center'} mb={10}>
					<Box width={[0, 0, 1 / 4]} pl={1}>
						{preview ? <div className="cover-placeholder bp3-skeleton"/> : this.referenceHero}
					</Box>
					<Box width={[1, 1, 3 / 4]} mx={[0, 0, 2]} px={2} py={0}>
						{preview ? this.previewRender : this.referenceRender}
					</Box>
				</Flex>
			</LinkWrapper>
		</Wrapper>;
	}
}
