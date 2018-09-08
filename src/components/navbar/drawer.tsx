import React, {Component} from "react";

import {Link} from "gatsby";
import Drawer from "react-motion-drawer";
import styled from "styled-components";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import {Tag, Spinner} from "@blueprintjs/core";

import {DrawerLinkList, DrawerSearch, DrawerSection, DrawerWrapper} from "./styles";
import {Categories} from "./index";
import {Category as CategoryProps, Page as PageProps, Post as PostProps} from "../../templates/types";
import Search from "../search";
import {Response} from "algoliasearch";
import Hide from "../common/hide";
import {getPostUrlPath} from "../../utils/helpers";

import theme from "../../theme";

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
    pages: PageProps[];
    popularCategories: CategoryProps[];
    children: any;
    width: string | number;
}

interface State {
    drawerOpen?: boolean;
    searchPerformed: boolean;
    searchingWrite?: boolean;
    searchResults?: PostProps[]
}

export default class NavbarDrawer extends Component<Props & HTMLDivProps, State> {
    state = {
        drawerOpen: false,
        searchPerformed: false,
        searchingWrite: false,
        searchResults: []
    };

    toggleDrawer = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    };

    onDrawerChange = (isItOpen: boolean) => {
        this.setState({drawerOpen: isItOpen});

        if (isItOpen) {
            document.body.classList.add('has-drawer-open');
        } else {
            document.body.classList.remove('has-drawer-open');
        }
    };

    render() {
        const {pages, popularCategories, width, children, ...props} = this.props;
        const {searchResults, searchingWrite, searchPerformed} = this.state;

        const childrenWithProps = React.cloneElement(children, {
            onClick: this.toggleDrawer.bind(this)
        });

        return (
            <Wrapper {...props}>
                {childrenWithProps}

                <Drawer
                    open={this.state.drawerOpen}
                    width={width}
                    drawerStyle={{
                        position: "relative",
                        background: "white"
                    }}
                    onChange={this.onDrawerChange}
                >
                    <DrawerWrapper>
                        <DrawerSearch>
                            <Search onResults={(results: Response['hits']) => {
                                this.setState({searchResults: results, searchingWrite: false, searchPerformed: true});
                            }} onWrite={() => {
                                this.setState({searchingWrite: true});
                            }}/>
                        </DrawerSearch>

                        {searchPerformed && <div>
							<DrawerSection>
								<Title>Search results</Title>

                                {searchingWrite && <Spinner size={50}/>}

                                {searchResults.length > 0 && <DrawerLinkList>
                                    {searchResults.map((result: PostProps) => {
                                        return <li key={result.slug}>
                                            <SearchResult onClick={this.toggleDrawer}
                                                          to={getPostUrlPath(result)}>
                                                <b>{result.title}</b>
                                                <span>{result.excerpt}</span>
                                                <div className="tags">
                                                    {result.tags.map((tag, k) => {
                                                        return <SearchResultTag intent={"primary"}
                                                                                key={k}>{tag.title}</SearchResultTag>
                                                    })}
                                                </div>
                                            </SearchResult>
                                        </li>
                                    })}
								</DrawerLinkList>}

                                {searchResults.length == 0 && <p style={{
                                    marginTop: 20,
                                    textAlign: "center"
                                }}>No results</p>}
							</DrawerSection>
						</div>}

                        <Hide medium large larger xlarge>
                            {pages.length > 0 && <DrawerSection>
								<Title>Pages</Title>
								<DrawerLinkList>
                                    {pages.map((page) => {
                                        return <li key={page.id}>
                                            {!page.url.startsWith('http') && <Link to={page.url}>
                                                {page.title}
											</Link>}

                                            {page.url.startsWith('http') &&
											<a target={'_blank'} href={page.url}>
                                                {page.title}
											</a>}
                                        </li>
                                    })}
								</DrawerLinkList>
							</DrawerSection>}

                            {popularCategories.length > 0 && <div>
								<DrawerSection>
									<Title>Categories</Title>
									<Categories isInDrawer={true} popularCategories={popularCategories}/>
								</DrawerSection>
							</div>}
                        </Hide>
                    </DrawerWrapper>
                </Drawer>
            </Wrapper>
        );
    }
}