import React, {Component} from 'react';

import {debounce} from 'lodash';
import algoliasearch, {Response} from 'algoliasearch';
import styled from 'styled-components';
import {HTMLDivProps} from '@blueprintjs/core/src/common/props';
import {getPluginsConfig} from '../../utils/helpers';

import Algolia from './algolia.svg';
import {div} from 'grid-styled';

const Wrapper = styled.div`
    img {
        float: right;
        margin-top: 12px;
    }
`;

interface Props {
	onWrite?: () => void;
	onResults?: (results: Response['hits']) => void;
}

interface State {

}

export default class Search extends Component<Props & HTMLDivProps, State> {
	render() {
		const {onWrite, onResults, ...props} = this.props;

		if (!getPluginsConfig(['search', 'enable'])) {
			return <div/>;
		}

		const client = algoliasearch(
			getPluginsConfig(['search', 'algolia', 'appId']),
			getPluginsConfig(['search', 'algolia', 'searchKey']),
		);
		const index = client.initIndex(getPluginsConfig(['search', 'algolia', 'indexName']));

		const search = debounce((query: string) => {
			if (onWrite) {
				onWrite();
			}

			index.search({query}, (err, content) => {
				if (onResults) onResults(content.hits);
			});
		}, 800).bind(this);

		return (
			<Wrapper className="qards-search" {...props}>
				<input
					className="bp3-input bp3-large bp3-fill"
					type="text" placeholder="Search"
					onChange={(e) => search(e.target.value)}
				/>
				<img src={Algolia} alt={'Search by algolia'}/>
			</Wrapper>
		);
	}
}
