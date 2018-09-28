import React from 'react';
import Helmet from "react-helmet";
import {Box} from "grid-styled";

import Layout from '../../layout';
import Content from '../../layout/content';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import {Wrapper} from "../styles";
import PageTitle from "../../page-title";
import FeaturedPost from '../../featured-post';
import {PostType} from "../../../fragments/post";

interface Props {
	totalCount: number;
	tag: string;
	posts: PostType[];
	featured: PostType[];
}

class TagsPage extends React.Component<Props, any> {
	render() {
		const {posts, tag, featured, totalCount} = this.props;
		const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`;

		return <Layout>
			<Helmet title={`Posts tagged with: ${tag}`}>
				<html lang="en"/>
				<meta name="description" content={`Posts tagged with: ${tag}`}/>
			</Helmet>

			<Wrapper>
				<Content>
					<PageTitle title={tagHeader}/>
				</Content>

				<Content>
					{featured && <Box mt={[20, 20, 20, 120]}>
						{featured.map(
							(f) => <Box key={f.id} mb={[30, 30, 30, 70]}>
								<FeaturedPost post={f}/>
							</Box>
						)}
						 </Box>}

					<Box mt={[20, 20, 20, 120]}>
						<Posts showExcerpt={true} posts={posts} paginate={{
							pageSize: 6
						}}/>
					</Box>

					<Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
						<Subscribe subtitle={"Our latest and greatest. No spam."}/>
					</Box>
				</Content>
			</Wrapper>
		</Layout>
	}
}

export default TagsPage;