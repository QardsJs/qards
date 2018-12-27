import React from 'react';

import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Box} from '@rebass/grid';

import FeaturedPost from '../../featured-post';
import Posts from '../../posts';
import Subscribe from '../../subscribe';
import Layout from '../../layout';
import Content from '../../layout/content';
import {PostType} from '../../../fragments/post';
import {Pagination} from '../../rogue-interfaces';
import {getSettingsConfig, getPluginsConfig, prependBaseUrl, getPostsConfig} from '../../../utils/helpers';

//  exported because they are used in other templates
export const Hero = styled.div`
	padding: 40px 0;

	h1 {
		font-size: 3rem;
	}

	h2 {
		font-size: 1.3rem;
		font-weight: 400;
	}
`;

export const Wrapper = styled.div``;

export interface Props {
	posts: PostType[];
	featured: PostType;
	location: any;
	pagination: Pagination;
}

export class IndexPage extends React.Component<Props, any> {
	public render() {
		const {posts, featured, location, pagination} = this.props;

		const emailSubscribersEnabled = getPluginsConfig(['emailSubscribers', 'enable']);
		const postsMb = emailSubscribersEnabled ? [40, 40, 40, 80] : 0;

		return (
			<Layout>
				<Helmet title={getSettingsConfig(['title'])}>
					<html lang="en"/>
					<meta name="description" content={getSettingsConfig(['excerpt'])}/>

					<link rel="canonical" href={prependBaseUrl(location.pathname)}/>

					<meta property="og:locale" content="en_US"/>
					<meta property="og:type" content="article"/>
					<meta property="og:title" content={getSettingsConfig(['title'])}/>
					<meta property="og:description" content={getSettingsConfig(['excerpt'])}/>
					<meta property="og:url" content={prependBaseUrl(location.pathname)}/>
					<meta property="og:site_name" content={getSettingsConfig(['name'])}/>

					<meta property="og:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
					<meta property="og:image:secure_url"
						  content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
					<meta property="og:image:width" content={'900'}/>
					<meta property="og:image:height" content={'450'}/>
					<meta property="og:image:alt" content={getSettingsConfig(['excerpt'])}/>

					<meta name="twitter:card" content="summary_large_image"/>
					<meta name="twitter:description" content={getSettingsConfig(['excerpt'])}/>
					<meta name="twitter:title" content={getSettingsConfig(['title'])}/>
					<meta name="twitter:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
				</Helmet>

				<Wrapper>
					<Content>
						{featured && <FeaturedPost post={featured}/>}

						<Box mb={postsMb}>
							{posts && posts.length > 0 && <Posts
								showExcerpt={getPostsConfig(['showExcerpts'], true)}
								posts={posts}
								title={`Latest articles`}
								pagination={pagination}
							/>}

							{!posts || posts.length <= 0 &&
							<Box mt={200} mb={200} style={{
								textAlign: 'center',
							}}>
								<h1>Nothing to see here yet</h1>
							</Box>}
						</Box>

						{emailSubscribersEnabled && <Box mt={[80, 80, 80, 120]} mb={[80, 80, 80, 120]}>
							<Subscribe/>
						</Box>}
					</Content>
				</Wrapper>
			</Layout>
		);
	}
}

export default IndexPage;
