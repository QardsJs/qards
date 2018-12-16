import * as React from 'react';

import styled from 'styled-components';
import Disqus from 'disqus-react';

import {getPluginsConfig} from '../utils/helpers';

const Wrapper = styled.div`
`;

interface Props {
	url: string;
	title: string;
	identifier: string;
}

interface State {

}

export default class DisqusComments extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>, State> {
	render() {
		const {url, title, identifier, ...rest} = this.props;
		const shortname = getPluginsConfig(['disqus', 'shortname']) || 'typely';
		const config = {
			url       : url,
			identifier: title,
			title     : identifier,
		};

		return <Wrapper {...rest}>
			<h4 style={{
				fontSize : '1.4rem',
				textAlign: 'center',
			}}>Comments</h4>

			<Disqus.DiscussionEmbed shortname={shortname} config={config}>
				{[0, 1, 2].map((id) => <p key={id} className="bp3-card bp3-skeleton">
						comments<br/>comments
					</p>,
				)}
			</Disqus.DiscussionEmbed>
		</Wrapper>;
	}
}
