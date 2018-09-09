import React, {Component} from 'react';
import Img from "gatsby-image";
import Slider from 'react-slick';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import TrackVisibility from 'react-on-screen';
import {Button} from '@blueprintjs/core';

import theme from '../../../theme';
import TitledWrapper from "../../common/titled-wrapper";
import {CardGallery as CardGalleryProps} from '../../../templates/types';

const Wrapper = styled.div`
	position: relative;
	margin: 40px 0 40px 0;
`;

const Title = styled.div`
	text-align: center;
	font-size: 14px;
	line-height: 16px;
	padding: 40px 80px 20px 80px;
	color: ${theme.colors.lightText};
`;

const PrevNextButton = styled(Button)`
	position: absolute;
	bottom: 14px;
	z-index: 2;
	font-weight: 400;
	text-transform: uppercase;
	color: ${theme.colors.lightText}!important;

	&:hover {
		color: ${tinycolor(theme.colors.lightText).darken(20).toString()}!important;
	}

	&:focus {
		outline: none;
	}
`;

const NextButton = styled(PrevNextButton)`
	right: 0;
`;

const PrevButton = styled(PrevNextButton)`
	left: 0;
`;

interface IconProps {
    onClick?: () => void;
}

class NextArrow extends React.Component<IconProps, any> {
    render() {
        const {onClick} = this.props;
        return (
            <NextButton minimal active text="Next" rightIcon="arrow-right" onClick={onClick}/>
        );
    }
}

class PrevArrow extends React.Component<IconProps, any> {
    render() {
        const {onClick} = this.props;
        return <PrevButton minimal active text="Prev" icon="arrow-left" onClick={onClick}/>;
    }
}

interface Props {
    element: CardGalleryProps;
}

class QardGallery extends Component<Props, any> {
    render() {
        const {element} = this.props;

        const settings = {
            dots: true,
            fade: true,
            lazyLoad: true,
            infinite: true,
            adaptiveHeight: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
        };

        if(!element.entries) return "";

        if (element.entries.length == 1 && element.entries[0].image) {
            return <Wrapper>
                <TitledWrapper title={element.entries[0].title}>
                    <Img fluid={element.entries[0].image.fluid}/>
                </TitledWrapper>
            </Wrapper>;
        }

        return (
            <TrackVisibility>
                <Wrapper>
                    <Slider {...settings}>
                        {element.entries.map(image => {
                            if (!image.image) return;

                            return (
                                <div key={image.id}>
                                    <Img fluid={image.image.fluid}/>
                                    <Title>{image.title}</Title>
                                </div>
                            );
                        })}
                    </Slider>
                </Wrapper>
            </TrackVisibility>
        );
    }
}

export default QardGallery;
