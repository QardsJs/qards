import React, {Component} from "react";
import {Box, Flex} from "grid-styled";
import Img from "gatsby-image";

import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

import Markdown from "../markdown";
import {AuthorType} from "../../fragments/author";
import {Wrapper, Avatar} from "./styles";

interface Props {
	author: AuthorType
}

export default class PostAuthor extends Component<Props & HTMLDivProps> {
	render() {
		const {author, ...props} = this.props;

		return (
			<Wrapper {...props}>
				<Flex>
					<Box width={100}>
						<Avatar>
							<Img {...author.frontmatter.avatar.image}/>
						</Avatar>
					</Box>
					<Box flex={'1 1 auto'} pt={1} pb={2}>
						<b className={"name"}>{author.frontmatter.title}</b>
						<div className="bio">
							<Markdown md={author.frontmatter.excerpt}/>
						</div>
					</Box>
				</Flex>
			</Wrapper>
		);
	}
}