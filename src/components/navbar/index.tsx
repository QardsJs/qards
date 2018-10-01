import * as React from "react";
import { uniqBy } from "lodash";
import { graphql, Link, StaticQuery } from "gatsby";
import { Alignment, Button, Intent, Menu, NavbarGroup, NavbarHeading, Popover } from "@blueprintjs/core";

import Hide from "../common/hide";
import { extractNodesFromEdges, getPluginsConfig } from "../../utils/helpers";
import { Container, DrawerLinkList, StyledNavbar, StyledNavbarGroupLeft } from "./styles";
import NavbarDrawer from "./drawer";
import config from "../../../static/config/settings.json";
import Logo from "../logo";
import { PostType } from "../../fragments/post";
import { CategoryType } from "../../templates/category";

export interface CategoriesProps {
	isInDrawer?: boolean;
	popularCategories: CategoryType[];
}

export class Categories extends React.Component<CategoriesProps, any> {
	render() {
		const { popularCategories, isInDrawer } = this.props;

		if (isInDrawer) {
			return (
				<DrawerLinkList>
					{popularCategories.slice(0, 10).map((c) => {
						return (
							<li key={c.id}>
								<Link to={c.fields.slug}>{c.frontmatter.title}</Link>
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
						<Link className={`bp3-menu-item`} key={c.id} to={c.fields.slug}>
							{c.frontmatter.title}
						</Link>
					);
				})}
			</Menu>
		);
	}
}

export interface DataProps {
	pages: {
		edges: {
			node: PostType;
		}[];
	};

	categories: {
		edges: {
			node: CategoryType;
		}[];
	};
}

export interface Props {
}

export interface State {
}

export default class Navigation extends React.Component<Props, State> {

	render() {
		return (
			<StaticQuery
				query={graphql`
					query {
						pages: allMarkdownRemark(
							filter: {
								fileAbsolutePath: {regex: "//collections/posts//"},
								frontmatter: {isPage: {eq: true}}
							}
						) {
							edges {
								node {
									...postFragment
								}
							}
						}

						categories: allMarkdownRemark(
							filter: {
								fileAbsolutePath: {regex: "//collections/categories//"}
							}
						) {
							edges {
								node {
									id
									frontmatter {
										title
									}

									fields{
										slug
									}
								}
							}
						}
					}
				`}
				render={(data: DataProps) => {
					const { categories } = data;

					const pages: PostType[] = [];

					if (data.pages) for (let i = 0; i < data.pages.edges.length; i++) {
						pages.push(data.pages.edges[i].node);
					}

					const popularCategories = uniqBy(
						extractNodesFromEdges(categories.edges), JSON.stringify
					);

					return (
						<StyledNavbar className="qards-navbar" fixedToTop={false}>
							<Container>
								<StyledNavbarGroupLeft>
									<NavbarHeading>
										<Logo siteName={config.name}/>
									</NavbarHeading>
								</StyledNavbarGroupLeft>

								<Hide small xsmall>
									<NavbarGroup align={Alignment.RIGHT}>
										{typeof document !== "undefined" && getPluginsConfig(["search", "enable"]) &&
										<div>
											<NavbarDrawer
												width={600}
												pages={pages}
												popularCategories={popularCategories}
											>

												<Button minimal icon="search"
														className="qards-navbar-searchBtn"/>
											</NavbarDrawer>

											<span className="bp3-navbar-divider">&nbsp;</span>
										</div>}

										{pages.length > 0 && <div>
											{pages.map((page) => {
												return (
													<div key={page.id}>
														<Link className={"bp3-button bp3-minimal"}
															  to={page.fields.slug}>
															{page.frontmatter.title}
														</Link>
													</div>
												);
											})}

											<span className="bp3-navbar-divider">&nbsp;</span>
										</div>}

										{popularCategories.length > 0 && (
											<Popover
												content={<Categories
													popularCategories={popularCategories}/>}
												target={
													<Button
														intent={Intent.NONE}
														minimal
														className="qards-navbar-categoriesBtn"
													>
														<b>Categories</b>
													</Button>
												}
											/>
										)}
									</NavbarGroup>
								</Hide>

								<Hide medium large larger xlarge>
									<NavbarGroup align={Alignment.RIGHT}>
										{typeof document !== "undefined" && (
											<NavbarDrawer
												width={"90%"}
												pages={pages}
												popularCategories={popularCategories}
											>
												<Button icon="menu"/>
											</NavbarDrawer>
										)}
									</NavbarGroup>
								</Hide>
							</Container>
						</StyledNavbar>
					);
				}}
			/>
		);
	}
}
