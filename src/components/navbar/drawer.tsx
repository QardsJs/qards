import React, {Component} from 'react';

import {Link} from 'gatsby';
import Drawer from 'react-motion-drawer';
import styled from 'styled-components';
import {HTMLDivProps} from '@blueprintjs/core/src/common/props';
import {Tag, Spinner} from '@blueprintjs/core';

import {DrawerLinkList, DrawerSearch, DrawerSection, DrawerWrapper} from './styles';
import {Categories} from './index';
import Search from '../search';
import {Response} from 'algoliasearch';
import Hide from '../common/hide';

import theme from '../../theme';
import {PostType} from "../../fragments/post";
import {CategoryType} from "../../templates/category";

const Wrapper = styled.div``;
const SearchResultTag = styled(Tag)`
    margin-right: 6px;
`;
const Title = styled.div`
	font-size: 2em;
	font-weight: 200;
	margin-bottom: 10px;
	display: block;
	padding: 8px 20px 6px 12px;
	border-bottom: 1px solid ${theme.colors.borderColor};
`;
const SearchResult = styled(Link)`
    b {
        display: block;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    span {
        font-size: .8em;
    }
`;

interface Props {
	pages: PostType[];
	popularCategories: CategoryType[];
	children: any;
	width: string | number;
}

interface State {
	drawerOpen?: boolean;
	searchPerformed: boolean;
	searchingWrite?: boolean;
	searchResults?: PostType[];
}

export default class NavbarDrawer extends Component<Props & HTMLDivProps, State> {
	state = {drawerOpen: false, searchPerformed: false, searchingWrite: false, searchResults: []};

	toggleBodyCls(isItOpen: boolean) {
		if (isItOpen) {
			document.body.classList.add('has-drawer-open');
		} else {
			document.body.classList.remove('has-drawer-open');
		}
	}

	toggleDrawer = () => {
		this.setState({drawerOpen: !this.state.drawerOpen});
	};

	onDrawerChange = (isItOpen: boolean) => {
		this.setState({drawerOpen: isItOpen});
		this.toggleBodyCls(isItOpen);
	};

	//  test for escape key press as this drawer doesn't
	escFunction(event: any) {
		if (event.keyCode === 27 && this.state.drawerOpen) {
			this.toggleDrawer();
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.escFunction.bind(this), false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction.bind(this), false);
	}

	render() {
		const {pages, popularCategories, width, children, ...props} = this.props;
		const {searchResults, searchingWrite, searchPerformed} = this.state;

		const childrenWithProps = React.cloneElement(children, {
			onClick: this.toggleDrawer.bind(this)
		});

		return (
			<Wrapper {...props} className="qards-navbar-drawer-wrapper">
				{childrenWithProps}

				<Drawer
					open={this.state.drawerOpen}
					width={width}
					drawerStyle={{position: 'relative', background: 'white'}}
					className="qards-navbar-drawer"
					onChange={this.onDrawerChange}
				>
					<DrawerWrapper className="qards-navbar-drawer-content">
						<DrawerSearch>
							<Search
								onResults={(results: Response['hits']) => {
									this.setState({
										searchResults  : results,
										searchingWrite : false,
										searchPerformed: true
									});
								}}
								onWrite={() => {
									this.setState({
										searchingWrite: true
									});
								}}
							/>
						</DrawerSearch>

						{searchPerformed && (
							<div>
								<DrawerSection>
									<Title>Search results</Title>

									{searchingWrite && <Spinner size={50}/>}

									{searchResults.length > 0 && (
										<DrawerLinkList>
											{searchResults.map((result: PostType) => {
												return (
													<li key={result.fields.slug}>
														<SearchResult
															onClick={this.toggleDrawer}
															to={result.fields.slug}
														>
															<b>{result.frontmatter.title}</b>
															<span>{result.frontmatter.excerpt}</span>
															<div className="tags">
																{result.frontmatter.tags.map((tag, k) => {
																	return (
																		<SearchResultTag
																			intent={'primary'}
																			key={k}>
																			{tag}
																		</SearchResultTag>
																	);
																})}
															</div>
														</SearchResult>
													</li>
												);
											})}
										</DrawerLinkList>
									)}

									{searchResults.length == 0 && (
										<p
											style={{
												marginTop: 20,
												textAlign: 'center'
											}}
										>
											No results
										</p>
									)}
								</DrawerSection>
							</div>
						)}

						<Hide medium large larger xlarge>
							{popularCategories.length > 0 && (
								<div>
									<DrawerSection>
										<Title>Categories</Title>
										<Categories isInDrawer={true} popularCategories={popularCategories}/>
									</DrawerSection>
								</div>
							)}

							{pages.length > 0 && (
								<DrawerSection>
									<Title>Pages</Title>
									<DrawerLinkList>
										{pages.map((page) => {
											return (
												<li key={page.id}>
													<Link to={page.fields.slug}/>
												</li>
											);
										})}
									</DrawerLinkList>
								</DrawerSection>
							)}
						</Hide>
					</DrawerWrapper>
				</Drawer>
			</Wrapper>
		);
	}
}
