import * as React from 'react';
import {graphql, Link, StaticQuery} from 'gatsby';
import Img from 'gatsby-image';

import LazyLoad from 'react-lazyload';
import {Box, Flex} from 'grid-styled';
import styled from 'styled-components';
import {HTMLDivProps} from '@blueprintjs/core/src/common/props';

import {CardImageType} from './qard/image';
import {getSettingsConfig} from '../utils/helpers';

export const StyledLogo = styled(Link)`
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
	}
	
	&:hover {
	    text-decoration: none;
	}
`;

export interface DataProps {
	logo: {
		edges: {
			node: {
				thumb: CardImageType;
			};
		}[];
	};
}

export interface Props {
	siteName: any;
	brandProps?: HTMLDivProps;
}

export default class Logo extends React.Component<Props & HTMLDivProps, any> {
	render() {
		const {siteName, brandProps} = this.props;

		return (
			<StaticQuery
				query={graphql`
					query {
						logo: allFile(filter: {absolutePath: {regex: "/images\/uploads\/logo\\.(jpg|png)/"}}) {
							edges {
								node {
									thumb: childImageSharp {
										fixed(width: 50) {
											tracedSVG
											aspectRatio
											src
											srcSet
											width
											height
										}
									}
								}
							}
						}
					}
				`}
				render={(data: DataProps) => {
					return (
						<StyledLogo to={'/'}>
							<Flex flexDirection={'row'} alignItems={'center'}>
								<Box width={60} mr={0} style={{minWidth: 50}}>
									{data.logo && <LazyLoad height={50}>
										<Img fixed={data.logo.edges[0].node.thumb.fixed}/>
									</LazyLoad>}
								</Box>

								<Box width={1 / 2} ml={2}>
									{siteName && <span className={'brand'} {...brandProps}>{siteName}</span>}
									{!siteName && <span className={'brand'} {...brandProps}>
										{getSettingsConfig('name', 'Qards')}
									</span>}
								</Box>
							</Flex>
						</StyledLogo>
					);
				}}
			/>
		);
	}
}
