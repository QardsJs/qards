import React from 'react';

import Post from "../../components/post/post";

import StylesLoader from "../styles-loader";

const PostPreview = ({entry}: any) => {
	const title: string = entry.getIn(['data', 'title']);
	const excerpt = entry.getIn(['data', 'excerpt']).toString();
	const created_at = entry.getIn(['data', 'created_at']);
	const body = entry.getIn(['data', 'body']);

	const heroAlt: string = entry.getIn(['data', 'hero', 'alt']);
	const heroSrc: string = entry.getIn(['data', 'hero', 'src']);
	const hero = {
		alt: heroAlt,
		src: heroSrc,
	};

	return <StylesLoader>
		<Post
			previewData={{
				title, created_at, excerpt, heroImage: hero, md: body,
			}}
			preview={true}
		/>
	</StylesLoader>;
};

export default PostPreview;