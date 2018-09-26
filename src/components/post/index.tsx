import React from 'react';

import {Box} from 'grid-styled';

import Hide from '../common/hide';
import Sidebar from './sidebar';
import Author from '../author';
import ScrollProgress from "../scroll-progress";
import {SidebarWrapper, Wrapper} from "./styles";
import PostComponent from "./post";
import {CardImageType} from "../qard/image";

export interface PostMetaDescriptionType {
	keywords: string;
	description: string;
}

export interface PostType {
	id: string;
	md: string;

	frontmatter: {
		title: string;
		excerpt: string;
		created_at: string;
		tags: string[];

		hero: {
			alt: string;
		}

		meta: PostMetaDescriptionType;
	}

	fields: {
		slug: string;

		authors: {
			frontmatter: {
				title: string;
				excerpt: string;
			}
		}
	}

	authorAvatarImage: {
		image: CardImageType;
	}

	audioPosterImages: {
		image: CardImageType;
	}

	galleryImages: {
		image: CardImageType;
	}[]

	heroImage: {
		image: CardImageType;
	}
}

export interface Props {
	post: PostType;
	location: {
		href: string;
	};
}

export default class Post extends React.Component<Props, any> {

	public render() {
		const {post, location} = this.props;

		return (
			<Wrapper data-rpi-area>
				<Box width={[1, 1, 1, 3 / 5]} mt={[0, 0, 0, 60]}>
					<PostComponent preview={false} post={post}/>

					{/*<Author author={post.author} style={{*/}
					{/*marginTop: 40*/}
					{/*}}/>*/}
				</Box>
				<SidebarWrapper width={[0, 0, 0, 2 / 5]} mt={[0, 0, 0, 60]}>
					<Hide medium small xsmall className={'sidebar'}>
						<Sidebar wrapperProps={{style: {marginLeft: 60}}} post={post} currentUrl={location.href}/>
					</Hide>
				</SidebarWrapper>


				<ScrollProgress identifier={post.id}/>
			</Wrapper>
		);
	}
}
