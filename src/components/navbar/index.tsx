import * as React from 'react';
import {uniqBy} from 'lodash';
import {graphql, Link, StaticQuery} from 'gatsby';
import {Alignment, Button, Intent, Menu, NavbarGroup, NavbarHeading, Popover} from '@blueprintjs/core';

import Hide from '../common/hide';
import {extractNodesFromEdges} from '../../utils/helpers';
import {Container, DrawerLinkList, StyledNavbar, StyledNavbarGroupLeft} from './styles';
import NavbarDrawer from './drawer';
import Logo from '../logo';

export interface CategoriesProps {
	isInDrawer?: boolean;
	popularCategories: CategoryProps[];
}

export class Categories extends React.Component<CategoriesProps, any> {
	render() {
		const {popularCategories, isInDrawer} = this.props;

		if (isInDrawer) {
			return (
				<DrawerLinkList>
					{popularCategories.slice(0, 10).map((c) => {
						return (
							<li key={c.id}>
								<Link to={`/categories/${c.slug}/`}>{c.title}</Link>
							</li>
						);
					})}
				</DrawerLinkList>
			);
		}

		return (
			<Menu className="qards-categories-menu">
				{popularCategories.slice(0, 10).map((c) => {
					return (
						<Link className={`bp3-menu-item`} key={c.id} to={`/categories/${c.slug}/`}>
							{c.title}
						</Link>
					);
				})}
			</Menu>
		);
	}
}

export interface DataProps {
	site: {
		siteMetadata: {
			name: string;
			title: string;
			siteUrl: string;
			description: string;
		};
	};

	pages: {
		edges: {
			node: PageProps;
		}[];
	};

	categories: {
		edges: {
			node: PostProps;
		}[];
	};
}

export interface Props {
}

export interface State {
}

export default class Navigation extends React.Component<Props, State> {
	render() {
		return <div>navbar</div>
	}

	// srender() {
	// 	return (
	// 		<StaticQuery
	// 			query={graphql`
	// 				query {
	// 					site {
	// 						siteMetadata {
	// 							name
	// 							title
	// 							description
	// 							siteUrl
	// 						}
	// 					}
	// 					pages: allContentfulPages {
	// 						edges {
	// 							node {
	// 								id
	// 								url
	// 								title
	// 							}
	// 						}
	// 					}
	// 					categories: allContentfulPost {
	// 						edges {
	// 							node {
	// 								categories {
	// 									...categoryFragment
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			`}
	// 			render={(data: DataProps) => {
	// 				const {categories, site} = data;
	//
	// 				const pages: PageProps[] = [];
	// 				for (let i = 0; i < data.pages.edges.length; i++) {
	// 					pages.push(data.pages.edges[i].node);
	// 				}
	//
	// 				const popularCategories = uniqBy(
	// 					extractNodesFromEdges(categories.edges, 'categories'),
	// 					JSON.stringify
	// 				);
	//
	// 				return (
	// 					<StyledNavbar className="qards-navbar" fixedToTop={false}>
	// 						<Container>
	// 							<StyledNavbarGroupLeft>
	// 								<NavbarHeading>
	// 									<Logo siteName={site.siteMetadata.name}
	// 										 siteUrl={site.siteMetadata.siteUrl}/>
	// 								</NavbarHeading>
	// 							</StyledNavbarGroupLeft>
	//
	// 							<Hide small xsmall>
	// 								<NavbarGroup align={Alignment.RIGHT}>
	// 									{typeof document !== 'undefined' && (
	// 										<NavbarDrawer
	// 											width={600}
	// 											pages={pages}
	// 											popularCategories={popularCategories}
	// 										>
	// 											<Button minimal icon="search"
	// 												   className="qards-navbar-searchBtn"/>
	// 										</NavbarDrawer>
	// 									)}
	//
	// 									<span className="bp3-navbar-divider">&nbsp;</span>
	//
	// 									{pages.map((page) => {
	// 										return (
	// 											<div key={page.id}>
	// 												{!page.url.startsWith('http') && (
	// 													<Link className={'bp3-button bp3-minimal'}
	// 														 to={page.url}>
	// 														{page.title}
	// 													</Link>
	// 												)}
	//
	// 												{page.url.startsWith('http') && (
	// 													<a
	// 														className={'bp3-button bp3-minimal'}
	// 														target={'_blank'}
	// 														href={page.url}
	// 														rel={'noopener'}
	// 													>
	// 														{page.title}
	// 													</a>
	// 												)}
	// 											</div>
	// 										);
	// 									})}
	//
	// 									<span className="bp3-navbar-divider">&nbsp;</span>
	//
	// 									{popularCategories.length > 0 && (
	// 										<Popover
	// 											content={<Categories
	// 												popularCategories={popularCategories}/>}
	// 											target={
	// 												<Button
	// 													intent={Intent.NONE}
	// 													minimal
	// 													className="qards-navbar-categoriesBtn"
	// 												>
	// 													<b>Categories</b>
	// 												</Button>
	// 											}
	// 										/>
	// 									)}
	// 								</NavbarGroup>
	// 							</Hide>
	//
	// 							<Hide medium large larger xlarge>
	// 								<NavbarGroup align={Alignment.RIGHT}>
	// 									{typeof document !== 'undefined' && (
	// 										<NavbarDrawer
	// 											width={'90%'}
	// 											pages={pages}
	// 											popularCategories={popularCategories}
	// 										>
	// 											<Button icon="menu"/>
	// 										</NavbarDrawer>
	// 									)}
	// 								</NavbarGroup>
	// 							</Hide>
	// 						</Container>
	// 					</StyledNavbar>
	// 				);
	// 			}}
	// 		/>
	// 	);
	// }
}
