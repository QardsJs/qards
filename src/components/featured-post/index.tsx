import React, {Component} from 'react';
import {Box, Flex} from 'grid-styled';
import Img from "gatsby-image";
import {Intent} from "@blueprintjs/core";

import {tokenizePost} from "../../utils/helpers";
import {PostType} from "../post";
import {Image, Date, FeaturedTag, Text, Wrapper} from "./styles";

interface Props {
	post: PostType;
}

export default class FeaturedPost extends Component<Props, any> {
	get heroImageBoxWidth(): number[] {
		const {post} = this.props;

		if (post.heroImage) {
			return [0, 0, 1 / 3];
		}

		return [0];
	}

	get detailsBoxWidth(): number[] {
		const {post} = this.props;

		if (post.heroImage) {
			return [1, 1, 2 / 3];
		}

		return [1];
	}

	render() {
		const {post} = this.props;

		if (!post) return "";

		const tokenizedPost = tokenizePost(post);

		return (
			<Wrapper to={tokenizedPost.fields.slug}>
				<Flex flexWrap="wrap">
					{tokenizedPost.heroImage && <Box pr={30} width={this.heroImageBoxWidth}>
							 <Image>
								 <Img fluid={tokenizedPost.heroImage.image.fluid}/>
							 </Image>
						 </Box>}
					<Box width={this.detailsBoxWidth} pr={10}>
						<Text>
							<Date>{tokenizedPost.frontmatter.created_at}</Date>
							<FeaturedTag intent={Intent.SUCCESS}>Featured</FeaturedTag>

							<div className="clearfix"/>

							<h3>{tokenizedPost.frontmatter.title}</h3>
							<p>{tokenizedPost.frontmatter.excerpt}</p>
						</Text>
					</Box>
				</Flex>
			</Wrapper>
		);
	}
}
