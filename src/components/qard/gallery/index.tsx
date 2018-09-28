import React from 'react';
import Gallery from './Grid';
import Lightbox from 'react-images';
import Img from "gatsby-image";
import styled from 'styled-components';
// @ts-ignore
import browserImageSize from "browser-image-size";

import {CardImageType} from "../image";
import QardBase, {QardProps} from "../base";
import {div} from "grid-styled";

//  -2px is the margin set by the gallery for each image
//	so we're substracting that from left/right edges
const Wrapper = styled.div`
	position: relative;
	margin: 40px -2px 40px -2px;
`;

export interface CardGalleryType extends QardProps {
	items: CardImageType[];
}

interface StateImages {
	width: number;
	height: number;
	image: CardImageType;
}

interface State {
	lightboxIsOpen: boolean;
	currentImage: number;
	images: StateImages[];
}

const ImageComponent = ({photo, onClick, post, margin, ...rest}: any) => {
	if (photo.src && !photo.srcSet) {
		return <img
			src={photo.src}
			style={{
				margin,
				width : photo.width,
				height: photo.height,
				cursor: "pointer"
			}}
			onClick={(e: any) => onClick(e, rest)}
			{...rest}/>
	} else {
		//	find our image
		for (let i = 0; i < post.fields.galleries.length; i++) {
			const item = post.fields.galleries[i];

			if (item.image.image.fluid && item.image.image.fluid.src == photo.src) {
				return <div onClick={(e: any) => onClick(e, rest)}>
					<Img
						fluid={item.image.image.fluid}
						style={{
							margin,
							width : photo.width,
							height: photo.height,
							cursor: "pointer"
						}}
						{...rest}
					/>
				</div>
			}
		}
	}

	return <div/>
};

export class QardGallery extends QardBase<CardGalleryType, State> {
	state = {
		lightboxIsOpen: false,
		currentImage  : 0,
		images        : [] as StateImages[]
	};

	constructor(props: CardGalleryType) {
		super(props);

		this.closeLightbox = this.closeLightbox.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
	}

	__prepare() {
		if (this.props.preview) {
			for (let i = 0; i < this.props.items.length; i++) {
				this.getImageDimensions(this.props.items[i]);
			}
		}
	}

	componentDidMount() {
		this.__prepare();
	}

	componentDidUpdate(prevProps: CardGalleryType, prevState: State) {
		//  only prepare if the props have changed and stay silent for state changes
		if (prevProps.items.length != this.props.items.length) this.__prepare();
	}

	render() {
		const {preview, post, items} = this.props;

		const {images, currentImage, lightboxIsOpen} = this.state;

		if (!post && !preview) return null;

		let prepared: any = [];

		if (!images.length && !preview && post) {
			for (let i = 0; i < post.fields.galleries.length; i++) {
				const item = post.fields.galleries[i];

				if (!item.image.image.fluid) continue;

				prepared.push({
					src    : item.image.image.fluid.src,
					width  : 100,
					height : 100 / item.image.image.fluid.aspectRatio,
					srcSet : item.image.image.fluid.srcSet,
					caption: items[i].alt
				});
			}
		}

		if (preview) {
			for (let i = 0; i < images.length; i++) {

				const p: any = {...images[i].image};

				//  we need these for the Gallery widget
				p.caption = images[i].image.alt;
				p.width = images[i].width;
				p.height = images[i].height;
				prepared.push(p);
			}
		}

		if (!prepared.length) return <React.Fragment/>;

		console.log(prepared);

		return <Wrapper>
			<Gallery
				columns={this.columnsNr}
				onClick={this.openLightbox}
				photos={prepared}
				post={post}
				ImageComponent={ImageComponent}
			/>
			<Lightbox
				currentImage={currentImage}
				images={prepared}
				isOpen={lightboxIsOpen}
				onClickImage={this.handleClickImage}
				onClickNext={this.gotoNext}
				onClickPrev={this.gotoPrevious}
				onClickThumbnail={this.gotoImage}
				onClose={this.closeLightbox}
				showThumbnails={false}
				backdropClosesModal={true}
			/>
		</Wrapper>;
	}

	get columnsNr() {
		const {images} = this.state;
		return images.length == 1 ? 1 : undefined;
	}

	getImageDimensions(image: CardImageType) {
		browserImageSize(image.src).then((result: any) => {
			const stateImages = this.state.images;

			if (!stateImages.find(x => x.image.src == image.src)) {
				stateImages.push({
					image,
					width : result ? result.width : 1,
					height: result ? result.height : 1,
				});
			}

			this.setState({
				images: stateImages
			});
		});
	}

	openLightbox(event: Event, obj: any) {
		event.preventDefault();

		this.setState({
			currentImage  : obj.index,
			lightboxIsOpen: true,
		});
	}

	closeLightbox() {
		this.setState({
			currentImage  : 0,
			lightboxIsOpen: false,
		});
	}

	gotoPrevious() {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	gotoNext() {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	gotoImage(index: number) {
		this.setState({
			currentImage: index,
		});
	}

	handleClickImage() {
		if (this.state.currentImage === this.props.items.length - 1) return;

		this.gotoNext();
	}
}

export default QardGallery;
