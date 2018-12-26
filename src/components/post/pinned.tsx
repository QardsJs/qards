import * as React from 'react';

import {Card} from '@blueprintjs/core';
import {Flex} from '@rebass/grid';
import styled from 'styled-components';
import {PostType} from '../../fragments/post';
import {Link} from 'gatsby';
import tinycolor from 'tinycolor2';
import theme from '../../theme';

const Wrapper = styled.div`
`;

export const StyledCard = styled(Link)`
    width: 100%;
	padding: 0 0 50px 0 !important;
	margin-bottom: 40px;
	border-radius: 4px !important;
	position: relative;
	border: 1px solid ${tinycolor(theme.color(['faded', 'background'])).darken(20).toString()};

	-webkit-box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};
	-moz-box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};
	box-shadow: 0 5px 15px 0 ${theme.color(['faded', 'background'])};

	&:hover {
	    text-decoration: inherit!important;
	    -webkit-transform: translate3d(0, -2px, 0);
        -moz-transform: translate3d(0, -2px, 0);
        -o-transform: translate3d(0, -2px, 0);
        -ms-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
        
        -webkit-box-shadow: 0 5px 15px 0 ${tinycolor(theme.color(['faded', 'background'])).darken(10).toString()};
        -moz-box-shadow: 0 5px 15px 0 ${tinycolor(theme.color(['faded', 'background'])).darken(10).toString()};
        box-shadow: 0 5px 15px 0 ${tinycolor(theme.color(['faded', 'background'])).darken(10).toString()};
	}
`;

interface Props {
	posts: PostType[];
}

interface State {

}

export default class PinnedPosts extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>, State> {
	render() {
		return <Wrapper {...this.props}>

		</Wrapper>;
	}
}
