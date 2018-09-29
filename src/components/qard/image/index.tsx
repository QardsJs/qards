import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image";
import Lightbox from 'react-images';

import Markdown from "../../markdown";
import theme from "../../../theme";
import {QardProps} from "../base";
import {HTMLDivProps} from "@blueprintjs/core";

const StyledImage = styled.figure`
	img {
		margin: 0;
	}
	
	&.layout {
		 overflow: hidden;
		 
		img {
			cursor: pointer;
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
			color: ${theme.colors.lightText};
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

export interface CardImageType extends QardProps {
	alt: string;
	src?: string;
	fluid?: {
		tracedSVG: any;
		aspectRatio: any;
		originalImg: string;
		src: any;
		srcSet: any;
		sizes: any;
	};
	fixed?: {
		width: number;
		height: number;
		tracedSVG: any;
		aspectRatio: any;
		src: any;
		srcSet: any;
	};
}

/**
 * This renders an image. If a `src` param is specified it will render
 * a normal img tag without doing anything special because sometimes
 * we need a plain and simple image rendered (netlify cms). If src is
 * not specified this component expects params that are required by
 * Gatsby's own `Img` component.
 *
 * This component should be used in every place where an image needs
 * to be rendered.
 */
const QardImage = ({alt, src, ...rest}: CardImageType) => {
	return (src && !rest.fluid && !rest.fixed) ? <img src={src} alt={alt} {...rest}/> : <Img {...Object.assign(
		rest, {alt}
	)}/>;
};

export interface ContentImageType extends CardImageType {
	layout?: string;
	caption?: string;
}

interface State {
	lightboxOpen: boolean;
	currentImage: number;
}

/**
 * This one extends the basic image component and should be used within
 * the actual content where it supports more options (layout, lightbox)
 */
export class QardImageContent extends React.Component<ContentImageType & HTMLDivProps, State> {
	state = {
		lightboxOpen: false,
		currentImage: 0
	};

	render() {
		const {caption, layout, fluid, fixed, alt, src, ...rest} = this.props;

		const images = [{
			caption: caption || alt,
			src    : (fluid || fixed) ? (fluid ? fluid.src : (fixed ? fixed.src : src)) : src,
			srcSet : (fluid || fixed) ? (fluid ? fluid.srcSet : (fixed ? fixed.srcSet : null)) : null,

		}];

		const imgProp: CardImageType = {
			alt: alt,
			src: images[0].src
		};

		if (fluid) {
			imgProp.fluid = fluid;
		} else {
			if (fixed) {
				imgProp.fixed = fixed;
			}
		}

		return <StyledImage
			{...rest}
			onClick={() => this.setState({lightboxOpen: true})}
			className={`layout ${layout}`}>

			<QardImage {...imgProp}/>

			<Lightbox
				images={images}
				isOpen={this.state.lightboxOpen}
				backdropClosesModal={true}
				onClose={() => this.setState({lightboxOpen: false})}
			/>

			{caption && <div className="alt">
				   <Markdown component={"figcaption"} md={caption}/>
			   </div>}
		</StyledImage>;
	}
}

export default QardImage;