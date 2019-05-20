import React, {Component} from 'react';

import {markdownRenderPost} from '../../utils/helpers';

export interface Props {
	md: string;
	component?: React.ReactType;
}

class MarkdownRender extends Component<Props, any> {
	render() {
		const {md, component, ...props} = this.props;
		const Wrapper: React.ReactType = component || 'div';

		// @ts-ignore
		return <Wrapper {...props}>
			{markdownRenderPost(md)}
		</Wrapper>;
	}
}

export default MarkdownRender;
