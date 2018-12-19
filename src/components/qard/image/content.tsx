import React from 'react';
import {HTMLDivProps} from '@blueprintjs/core';
import TrackVisibility from 'react-on-screen';
import Lightbox from 'react-images';
import Markdown from '../../markdown';

import QardImage, {CardImageType, ContentImageType} from './index';
import styled from 'styled-components';
import theme from '../../../theme';


interface StyledImageProps {
	lightbox?: boolean;
}

const StyledImage = styled.figure`
	img {
		margin: 0;
	}
	
	&.layout {
		 overflow: hidden;
		 
		img {
			cursor: ${(props: StyledImageProps) => props.lightbox ? 'pointer' : 'default'};
		}
		
		&.left-aligned {
			float: left;
			display: inline-block;
			margin: 0 20px 0 0;
			max-width: 60%;
		}
		
		&.break-out {
			margin: 0 -40px;
		}
		
		&.full-width, &.screen-width {
			width: 100%;
		}
		
		figcaption {
			font-size: .9rem;
			color: ${theme.color(['lightText'])};
			padding: 8px 0;
			line-height: 1rem;
			text-align: center;
		}
		
		@media screen and (max-width: ${theme.main.breakpoints.medium}em) {
			&.full-width, &.screen-width, &.break-out {
				width: 100%;
			}
		}
	}
`;

interface State {
	lightboxOpen: boolean;
	currentImage: number;
}

/**
 * This one extends the basic image component and should be used within
 * the actual content where it supports more options (layout, lightbox)
 */
export default class QardImageContent extends React.Component<ContentImageType & HTMLDivProps, State> {
	state = {
		lightboxOpen: false,
		currentImage: 0,
	};

	findImageFromPost(imageSrc: string) {
		const {post} = this.props;

		if (post) {
			for (let i = 0; i < post.fields.images.length; i++) {
				const item = post.fields.images[i];

				if (item.image && imageSrc.indexOf(item.image.fileName) != -1) {
					return item.image.image;
				}
			}
		}
	}

	render() {
		const {caption, lightbox, layout, fluid, fixed, alt, src, href, post, ...rest} = this.props;

		const images = [{
			caption: caption || alt,
			src    : (fluid || fixed) ? (fluid ? fluid.src : (fixed ? fixed.src : src)) : src,
			srcSet : (fluid || fixed) ? (fluid ? fluid.srcSet : (fixed ? fixed.srcSet : null)) : null,
		}];

		if (!images.length || !images[0].src) {
			return <div/>;
		}

		let imgProp: CardImageType = {
			alt: alt,
			src: images[0].src,
		};

		if (fluid) {
			imgProp.fluid = fluid;
		} else {
			if (fixed) {
				imgProp.fixed = fixed;
			}
		}

		//	if we have a post...this image must be pulled from the `images` field (GraphQl)
		if (post && imgProp.src) {
			const postImage = this.findImageFromPost(imgProp.src);

			if (postImage) {
				imgProp = Object.assign(imgProp, postImage);
			}
		}

		const img = <StyledImage
			lightbox={lightbox} {...rest}
			onClick={() => this.setState({lightboxOpen: true})}
			className={`layout ${layout}`}>

			<TrackVisibility once>
				<QardImage {...imgProp}/>
			</TrackVisibility>

			{lightbox && <Lightbox
				images={images}
				isOpen={this.state.lightboxOpen}
				backdropClosesModal={true}
				onClose={() => this.setState({lightboxOpen: false})}
			/>}

			{caption && <div className="alt">
				<Markdown component={'figcaption'} md={caption}/>
			</div>}
		</StyledImage>;

		if (href) {
			return <a href={href} target="_blank">{img}</a>;
		}
		return img;
	}
}
