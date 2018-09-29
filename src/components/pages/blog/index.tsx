import React from 'react';

import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Box} from 'grid-styled';

import FeaturedPost from '../../featured-post';
import Posts from '../../posts';
import Subscribe from '../../subscribe';
import Layout from '../../layout';
import Content from '../../layout/content';
import {PostType} from '../../../fragments/post';
import {getPluginsConfig} from '../../../utils/helpers';

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

export const Wrapper = styled.div`padding-bottom: 120px;`;

export interface Props {
	latest: PostType[];
	featured: PostType;
	metadata: {
		name: string;
		title: string;
		siteUrl: string;
		description: string;
	};
}

export class IndexPage extends React.Component<Props, any> {
	public render() {
		const {latest, featured, metadata} = this.props;

		return (
			<Layout>
				<Helmet title={metadata.title}>
					<html lang="en"/>
					<meta name="description" content={metadata.description}/>
				</Helmet>

				<Wrapper>
					<Content>
						{featured && <FeaturedPost post={featured}/>}

						{getPluginsConfig(['emailSubscribers', 'enable']) &&
						<div style={featured ? {marginTop: 120} : {}}>
							<Subscribe/>
						</div>}

						<Box mt={[80, 80, 80, 180]} mb={[40, 40, 40, 120]}>
							<Posts
								showExcerpt={false}
								posts={latest}
								title={`Latest articles`}
								paginate={{
									pageSize: 6,
								}}
							/>
						</Box>
					</Content>
				</Wrapper>
			</Layout>
		);
	}
}

export default IndexPage;
