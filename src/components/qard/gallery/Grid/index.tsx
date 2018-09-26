import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Photo from './photo';
import {computeSizes, computeSizesColumns} from './utils';

class Gallery extends React.Component<{
	post?: any;
	photos: any;
	columns?: any;
	onClick?: any;
	ImageComponent?: any;
}> {
	state = {
		containerWidth: 0,
	};

	observer: any;
	_gallery: any;

	componentDidMount() {
		this.observer = new ResizeObserver(entries => {
			// only do something if width changes
			const newWidth = entries[0].contentRect.width;
			if (this.state.containerWidth !== newWidth) {
				this.setState({containerWidth: Math.floor(newWidth)});
			}
		});
		this.observer.observe(this._gallery);
	}

	componentWillUnmount() {
		this.observer.disconnect();
	}

	handleClick = (event: any, {index}: any) => {
		const {photos, onClick}: any = this.props;
		onClick(event, {
			index,
			photo   : photos[index],
			previous: photos[index - 1] || null,
			next    : photos[index + 1] || null,
		});
	};

	render() {
		const containerWidth = this.state.containerWidth;
		// no containerWidth until after first render with refs, skip calculations and render nothing
		if (!containerWidth) return <div ref={c => (this._gallery = c)}/>;
		const {ImageComponent = Photo} = this.props;
		// subtract 1 pixel because the browser may round up a pixel
		const {margin, onClick, direction, post}: any = this.props;
		let {columns}: any = this.props;

		// set default breakpoints if user doesn't specify columns prop
		if (columns === undefined) {
			columns = 1;
			if (containerWidth >= 500) columns = 2;
			if (containerWidth >= 900) columns = 3;
			if (containerWidth >= 1500) columns = 4;
		}
		const photos = this.props.photos;
		const width = containerWidth - 1;
		let galleryStyle: any, thumbs;

		if (!direction || direction === 'row') {
			galleryStyle = {display: 'flex', flexWrap: 'wrap', flexDirection: 'row'};
			thumbs = computeSizes({width, columns, margin: margin || 2, photos});
		}
		if (direction === 'column') {
			galleryStyle = {position: 'relative'};
			thumbs = computeSizesColumns({width, columns, margin: margin || 2, photos});
			galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
		}
		return (
			<div className="react-photo-gallery--gallery">
				<div ref={c => (this._gallery = c)} style={galleryStyle}>
					{thumbs.map((photo: any, index: any) => {
						const {left, top, containerHeight, ...rest} = photo;
						return (
							<ImageComponent
								key={photo.key || photo.src}
								margin={margin || 2}
								index={index}
								photo={rest}
								post={post}
								direction={direction}
								left={left}
								top={top}
								onClick={onClick ? this.handleClick : null}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Gallery;