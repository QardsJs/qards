import * as React from 'react';
import Link from 'gatsby-link';
import {Icon} from '@blueprintjs/core';
import {Box, Flex} from '@rebass/grid';
import styled from 'styled-components';

import {Pagination as PaginationType} from './rogue-interfaces';


const Wrapper = styled(Flex)`
	padding: 0;
`;

export const StyledButton = styled(Link)`
	margin: 0;

	&:focus {
		outline: none;
	}
`;

interface Props extends PaginationType {

}

interface State {

}

export default class Pagination extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>, State> {
	render() {
		const pagination = this.props;
		const btnCls = 'bp3-button bp3-large bp3-minimal bp3-active';

		return <Wrapper mt={[40, 40, 80]} alignItems={'center'}>
			<Box width={[1, 1 / 3]} style={{textAlign: 'left'}}>
				{pagination && !pagination.isFirst &&
				<StyledButton className={btnCls} to={pagination.prevPage}>
					<Icon icon={'arrow-left'}/>
					<span className="bp3-button-text">Previous posts</span>
				</StyledButton>}
			</Box>

			<Box width={[0, 1 / 3]} style={{
				//	nowrap and hidden overflow otherwise the text is visible
				//	even with a box width set to 0
				textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden',
			}}>
				<b>{pagination.currentPage}</b> out of <b>{pagination.numPages}</b>
			</Box>

			<Box width={[1, 1 / 3]} style={{textAlign: 'right'}}>
				{pagination && !pagination.isLast &&
				<StyledButton className={btnCls} to={pagination.nextPage}>
					<span className="bp3-button-text">Next posts</span>
					<Icon icon={'arrow-right'}/>
				</StyledButton>}
			</Box>
		</Wrapper>;
	}
}
