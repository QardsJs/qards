import * as React from 'react';
import {Link} from 'gatsby';

import LazyLoad from 'react-lazyload';
import {Box, Flex} from 'grid-styled';
import styled from 'styled-components';

import LogoImage from '../static/images/logo.svg';

const StyledLogo = styled(Link)`
	display: block;
	margin: 0;
	padding: 0;
	
	img.logo {
	    height: 50px;
	    width: 50px;
	    margin: 0;
	}
	
	span {
	    font-size: .8em;
	    font-weight: 200;
	    text-transform: uppercase;
	}
	
	&:hover {
	    text-decoration: none;
	}
`;

export interface Props {
	siteName: string;
}

export default class Logo extends React.Component<Props, any> {
	render() {
		const {siteName} = this.props;
		return (
			<StyledLogo to={'/'}>
				<Flex flexDirection={'row'} alignItems={'center'}>
					<Box width={1 / 2} mr={0} style={{minWidth: 50}}>
						<LazyLoad height={50}>
							<img src={LogoImage} alt={siteName} className={'logo'}/>
						</LazyLoad>
					</Box>

					<Box width={1 / 2} ml={2}>
						<span className={'brand'}>Qards</span>
					</Box>
				</Flex>
			</StyledLogo>
		);
	}
}
