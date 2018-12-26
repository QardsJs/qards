import React from 'react';
import Helmet from 'react-helmet';
import {Box} from '@rebass/grid';

import Layout from '../../layout';
import Content from '../../layout/content';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import {Wrapper} from '../styles';

import PageTitle from '../../page-title';
import FeaturedPost from '../../featured-post';
import {CategoryType} from '../../../templates/category';
import {PostType} from '../../../fragments/post';
import {getSettingsConfig, getPluginsConfig, prependBaseUrl} from '../../../utils/helpers';
import {Pagination} from '../../rogue-interfaces';

interface Props {
	totalCount: number;
	category: CategoryType;
	posts: PostType[];
	featured: PostType[];
	location: any;
	pagination: Pagination;
}

class CategoryPage extends React.Component<Props, any> {
	render() {
		const {posts, category, featured, totalCount, location, pagination} = this.props;

		const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} in "${category.frontmatter.title}" category`;

		return <Layout>
			<Helmet title={`${category.frontmatter.title} category`}>
				<html lang="en"/>
				<meta name="description" content={category.frontmatter.excerpt}/>

				<link rel="canonical" href={prependBaseUrl(location.pathname)}/>

				<meta property="og:locale" content="en_US"/>
				<meta property="og:type" content="article"/>
				<meta property="og:title" content={category.frontmatter.title}/>
				<meta property="og:description" content={category.frontmatter.excerpt}/>
				<meta property="og:url" content={prependBaseUrl(location.pathname)}/>
				<meta property="og:site_name" content={getSettingsConfig(['name'])}/>

				<meta property="og:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
				<meta property="og:image:secure_url" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
				<meta property="og:image:width" content={'900'}/>
				<meta property="og:image:height" content={'450'}/>
				<meta property="og:image:alt" content={category.frontmatter.excerpt}/>

				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:description" content={category.frontmatter.excerpt}/>
				<meta name="twitter:title" content={category.frontmatter.title}/>
				<meta name="twitter:image" content={prependBaseUrl(getSettingsConfig(['socialShareImg']))}/>
			</Helmet>

			<Wrapper>
				<Content>
					<PageTitle title={tagHeader}/>
				</Content>

				<Content>
					{featured.length > 1 && <Box mt={[20, 20, 20, 40]}>
						{featured.map((f) => <FeaturedPost key={f.id} post={f}/>)}
					</Box>}

					{posts.length > 0 && <Box mt={[20, 20, 20, 40]}>
						<Posts showExcerpt={true} posts={posts} pagination={pagination}/>
					</Box>}

					{!posts.length &&
					<Box mt={200} mb={200} style={{
						textAlign: 'center',
					}}>
						<h1>Nothing to see here yet</h1>
					</Box>}

					{getPluginsConfig(['emailSubscribers', 'enable']) &&
					<Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
						<Subscribe subtitle={'Our latest and greatest. No spam.'}/>
					</Box>}
				</Content>
			</Wrapper>
		</Layout>;
	}
}

export default CategoryPage;
