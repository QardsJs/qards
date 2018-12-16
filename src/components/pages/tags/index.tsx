import React from 'react';
import Helmet from 'react-helmet';
import {Box} from 'grid-styled';

import Layout from '../../layout';
import Content from '../../layout/content';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import {Wrapper} from '../styles';
import PageTitle from '../../page-title';
import FeaturedPost from '../../featured-post';
import {PostType} from '../../../fragments/post';
import {getPluginsConfig, getSettingsConfig, prependBaseUrl} from '../../../utils/helpers';
import {Pagination} from '../../rogue-interfaces';

interface Props {
	totalCount: number;
	tag: string;
	location: any;
	posts: PostType[];
	featured: PostType[];
	pagination: Pagination;
}

class TagsPage extends React.Component<Props, any> {
	render() {
		const {posts, tag, featured, totalCount, location, pagination} = this.props;
		const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;

		return <Layout>
			<Helmet title={`Posts tagged with: ${tag}`}>
				<html lang="en"/>
				<meta name="description" content={`Posts tagged with ${tag}`}/>

				<link rel="canonical" href={prependBaseUrl(location.pathname)}/>

				<meta property="og:locale" content="en_US"/>
				<meta property="og:type" content="article"/>
				<meta property="og:title" content={tag}/>
				<meta property="og:description" content={`Posts tagged with ${tag}`}/>
				<meta property="og:url" content={prependBaseUrl(location.pathname)}/>
				<meta property="og:site_name" content={getSettingsConfig(['name'])}/>

				<meta property="og:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
				<meta property="og:image:secure_url"
					  content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
				<meta property="og:image:width" content={'900'}/>
				<meta property="og:image:height" content={'450'}/>
				<meta property="og:image:alt" content={`Posts tagged with ${tag}`}/>

				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:description" content={`Posts tagged with ${tag}`}/>
				<meta name="twitter:title" content={tag}/>
				<meta name="twitter:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
			</Helmet>

			<Wrapper>
				<Content>
					<PageTitle title={tagHeader}/>
				</Content>

				<Content>
					{featured.length > 0 && <Box mt={[20, 20, 20, 40]}>
						{featured.map(
							(f) => <Box key={f.id} mb={[30, 30, 30, 70]}>
								<FeaturedPost post={f}/>
							</Box>,
						)}
					</Box>}

					<Box mt={[20, 20, 20, 40]}>
						<Posts showExcerpt={true} posts={posts} pagination={pagination}/>
					</Box>

					{getPluginsConfig(['emailSubscribers', 'enable']) &&
					<Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
						<Subscribe subtitle={'Our latest and greatest. No spam.'}/>
					</Box>}
				</Content>
			</Wrapper>
		</Layout>;
	}
}

export default TagsPage;
