import React from 'react';
import Helmet from "react-helmet";
import {Box} from "grid-styled";

import {Category as CategoryProps, Post as PostProps} from '../../../templates/types';
import Layout from '../../layout';
import Content from '../../layout/content';
import Subscribe from '../../subscribe';
import Posts from '../../posts';
import {Wrapper} from "../styles";

import PageTitle from "../../page-title";
import FeaturedPost from '../../featured-post';

interface Props {
    totalCount: number;
    category: CategoryProps;
    posts: PostProps[];
    featured: PostProps[];
}

class CategoryPage extends React.Component<Props, any> {
    render() {
        const {posts, category, featured, totalCount} = this.props;
        const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} in "${category.title}" category`;

        return <Layout>
            <Helmet title={`${category.title} category`}>
                <meta name="description" content={category.description}/>
            </Helmet>

            <Wrapper>
                <Content>
                    <PageTitle title={tagHeader}/>
                </Content>

                <Content>
                    {featured && <Box mt={[20, 20, 20, 120]}>
                        {featured.map((f) => <FeaturedPost key={f.id} post={f}/>)}
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

export default CategoryPage;