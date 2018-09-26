import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';
import {PostType} from '../../components/post';

import PostPage from "../../components/pages/post";


interface DataProps {
	post: PostType;

	related: {
		edges: {
			node: PostType
		}[]
	};
}

interface Props {
	pageContext: {
		slug: string;
		next: null | PostType;
		previous: null | PostType;
	};

	location: any;

	data: DataProps;
}

const PostTemplate = ({data, location}: Props) => {
	const related: PostType[] = [];

	// for (let i = 0; i < data.related.edges.length; i++) {
	//     const post: PostType = data.related.edges[i].node;
	//     const hasSimilarTags = _.intersection(post.tags.map(a => a.id), data.post.tags.map(a => a.id)).length;
	//     const hasSimilarCategories = _.intersection(post.categories.map(a => a.id), data.post.categories.map(a => a.id)).length;
	//
	//     if (post.id == data.post.id) continue;
	//     if (!hasSimilarTags && !hasSimilarCategories) continue;
	//
	//     related.push(post);
	// }

	return <PostPage location={location} post={data.post} related={related}/>
};


export default PostTemplate;

export const pageQuery = graphql`
	query($slug: String) {
		post: markdownRemark(fields: { slug: { eq: $slug } }) {
			...postFragment
		}
	}
`;