import React from 'react';
import Helmet from "react-helmet";
import {Box} from "grid-styled";

import {Wrapper} from "../styles";
import {PostType} from "../../../fragments/post";
import Layout from '../../layout';
import Content from '../../layout/content';
import Post from '../../post';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import DiagonalBand from '../../common/diagonal-band';
import {tokenizePost} from "../../../utils/helpers";


interface PostPageProps {
	post: PostType;
	related: PostType[];
	location: any;
}

class PostPage extends React.Component<PostPageProps, any> {

	render() {
		const {post, related, location} = this.props;

		const tokenizedPost = tokenizePost(post);

		return <Layout>
			<Helmet title={tokenizedPost.frontmatter.title}>
				<html lang="en"/>
				<meta name="description" content={tokenizedPost.frontmatter.excerpt}/>
			</Helmet>

			<Wrapper>
				<DiagonalBand translate={50}/>

				<Content>
					<Post post={tokenizedPost} location={location}/>
				</Content>

				<Box mt={[80, 80, 80, 180]} mb={[20, 20, 20, 60]}>
					<Content darkTheme={true}>
						<Posts darkTheme={true} showExcerpt={true} posts={related} title={`More like this`}
							  paginate={{
								  pageSize: 6
							  }}/>
					</Content>
				</Box>

				<Content>
					<Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
						<Subscribe/>
					</Box>
				</Content>
			</Wrapper>
		</Layout>
	}
}

export default PostPage;