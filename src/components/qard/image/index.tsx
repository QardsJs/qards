import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image";

import Markdown from "../../markdown";
import theme from "../../../theme";
import {QardProps} from "../base";

const StyledImage = styled.figure`
    img {
        margin: 0;
    }
    
    &.layout {
        img {
            cursor: pointer;
        }
        
        &.left-aligned {
            float: left;
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
    }
`;

export interface CardImageType extends QardProps {
	alt: string;
	src?: string;
	fluid?: {
		tracedSVG: any;
		aspectRatio: any;
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

export interface ContentImageType extends CardImageType {
	layout?: string;
	caption?: string;
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
	return src ? <img src={src} alt={alt} {...rest}/> : <Img {...rest}/>;
};

/**
 * This one extends the basic image component and should be used within
 * the actual content where it supports more options (layout, lightbox)
 */
export const QardContentImage = ({alt, src, caption, layout, ...rest}: ContentImageType) => {
	return <StyledImage className={`layout ${layout}`}>
		{src ? <img src={src} alt={alt} {...rest}/> : <Img {...rest}/>}
		{caption && <div className="alt">
			  <Markdown component={"figcaption"} md={caption}/>
		  </div>}
	</StyledImage>;
};

export default QardImage;