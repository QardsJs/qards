import React, {Component} from 'react';
import styled from 'styled-components';

import {Flex} from 'grid-styled';
import tinycolor2 from 'tinycolor2';
import {Link} from 'gatsby';

import theme from '../../theme';
import {PostType} from '../../fragments/post';
import {getThemeConfig, slugify} from '../../utils/helpers';

const Wrapper = styled(Flex)`
    padding: 20px 0;
    
    a {
        text-align: center;
        padding: 10px 20px;
        background: ${theme.color(['faded', 'background'])};
        border-radius: 6px;
        margin-bottom: 10px;
        margin-right: 6px;
        width: auto;
        flex-grow: 1;
        
        &:hover {
            text-decoration: none;
            background: ${tinycolor2(theme.color(['faded', 'background'])).darken(5).toString()};
        }
        
        &:last-child {
            margin-right: 0;
        }
    }
`;

interface Props {
	post: PostType
}

interface State {

}

export default class PostTags extends Component<Props, State> {
	render() {
		const {post, ...props} = this.props;
		const {tags} = post.frontmatter;

		return (
			<Wrapper flexWrap={'wrap'} alignItems={'space-between'} {...props}>
				{tags.map((tag) => {

					return <Link to={`/tags/${slugify(tag)}/`} key={tag}>
						{tag}
					</Link>;
				})}
			</Wrapper>
		);
	}
}