import React, {Component} from 'react';

import {markdownRenderPost} from '../../utils/helpers';

export interface Props {
	md: string;
	doFollowLinks?: boolean;
	component?: React.ReactType;
}

class MarkdownRender extends Component<Props, any> {
	render() {
		const {md, doFollowLinks, component, ...props} = this.props;
		const Wrapper: React.ReactType = component || 'div';

		// @ts-ignore
		return <Wrapper {...props}>
			{markdownRenderPost(md, doFollowLinks)}
		</Wrapper>;
	}
}

export default MarkdownRender;
