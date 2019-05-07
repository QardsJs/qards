import React, {Component} from 'react';
import remark from 'remark';
import remarkReact from 'remark-react';
import externalLinks from 'remark-external-links';

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
			{remark().use(remarkReact).use(externalLinks, {
				target: '_blank',
				rel   : ['nofollow', 'noopener', 'noreferrer'],
			}).processSync(md).contents}
		</Wrapper>;
	}
}

export default MarkdownRender;
