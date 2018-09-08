import React, {Component} from 'react';
import {Box, Flex} from 'grid-styled';
import Img from "gatsby-image";
import {Intent} from "@blueprintjs/core";

import {getPostUrlPath, tokenizePost} from "../../utils/helpers";
import {Post as PostProps} from '../../templates/types';
import {Image, Date, FeaturedTag, Text, Wrapper} from "./styles";

interface Props {
    post: PostProps;
}

export default class FeaturedPost extends Component<Props, any> {
    get coverBoxWidth(): number[] {
        const {post} = this.props;

        if (post.cover) {
            return [0, 0, 1 / 3];
        }

        return [0];
    }

    get detailsBoxWidth(): number[] {
        const {post} = this.props;

        if (post.cover) {
            return [1, 1, 2 / 3];
        }

        return [1];
    }

    render() {
        const {post} = this.props;

        if (!post) return "";

        const tokenizedPost = tokenizePost(post);

        return (
            <Wrapper to={getPostUrlPath(tokenizedPost)}>
                <Flex flexWrap="wrap">
                    {tokenizedPost.cover && <Box pr={30} width={this.coverBoxWidth}>
						<Image>
							<Img fluid={tokenizedPost.cover.fluid}/>
						</Image>
					</Box>}
                    <Box width={this.detailsBoxWidth} pr={10}>
                        <Text>
                            <Date>{tokenizedPost.updatedAt}</Date>
                            <FeaturedTag intent={Intent.SUCCESS}>Featured</FeaturedTag>

                            <div className="clearfix"/>

                            <h3>{tokenizedPost.title}</h3>
                            <p>{tokenizedPost.excerpt}</p>
                        </Text>
                    </Box>
                </Flex>
            </Wrapper>
        );
    }
}
