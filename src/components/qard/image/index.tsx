import React from 'react';
import Img from 'gatsby-image';
import {QardProps} from '../base';


export interface CardImageType extends QardProps {
	alt: string;
	src?: string;
	style?: React.CSSProperties;

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
const QardImage = ({alt, src, fluid, fixed, style, ...rest}: CardImageType) => {
	return (src && !fluid && !fixed) ? <img src={src} alt={alt} style={style}/> :
		<Img fluid={fluid} fixed={fixed} alt={alt} style={style} {...rest}/>;
};

export interface ContentImageType extends CardImageType {
	layout?: string;
	caption?: string;

	//	When false, we won't be rendering a lightbox to open the image
	lightbox?: boolean;

	//	If we want the image to be contained within a link
	href?: string;
}

export default QardImage;
