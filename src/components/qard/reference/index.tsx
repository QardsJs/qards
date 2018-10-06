import * as React from 'react';
import {Link} from "gatsby";
import QardBase, {QardProps} from '../base';
import {Wrapper} from './styles';
import {PostType} from "../../../fragments/post";

interface PreviewPostType {
	post: string;
}

export interface CardReferenceType extends QardProps {
	displayStyle: string;
	posts: PostType[] | PreviewPostType[];
}

interface State {
}

export default class QardReference extends QardBase<CardReferenceType, State> {
	public render() {
		const {posts, preview, displayStyle} = this.props;

		if (!posts || !posts.length) return "";

		return <Wrapper className={`display-${displayStyle || 'default'}`}>{
			// @ts-ignore
			posts.map((post: any, k: number) => {
				if (preview) {
					return <Link to={'#'} key={k}>
						<b className={`title`}>{post.post}</b>
						<span className={'excerpt'}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore
							magna aliqua.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore
							magna aliqua.
						</span>
					</Link>;
				}
				return <Link to={post.fields.slug} key={k}>
					<b className={'title'}>{post.frontmatter.title}</b>
					<span>{post.frontmatter.excerpt}</span>
				</Link>
			})
		}</Wrapper>;
	}
}
