import React from 'react';

import Post from '../../components/post/post';

import StylesLoader from '../styles-loader';

const PostPreview = ({entry}: any) => {
	const title: string = entry.getIn(['data', 'title']);
	const excerpt = entry.getIn(['data', 'excerpt']);
	const created_at = entry.getIn(['data', 'created_at']).toString();
	const body = entry.getIn(['data', 'body']);

	const heroAlt: string = entry.getIn(['data', 'hero', 'alt']);
	const heroSrc: string = entry.getIn(['data', 'hero', 'image']);
	const hero = {
		alt  : heroAlt,
		image: heroSrc,
	};

	return <StylesLoader>
		<div style={{padding: "20px 10px"}}>
			<Post
				preview={true}
				previewData={{
					title,
					created_at,
					excerpt,
					heroImage: hero,
					md       : body,
				}}
			/>
		</div>
	</StylesLoader>;
};

export default PostPreview;