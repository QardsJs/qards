import React, {Component} from 'react';
import Img from "gatsby-image";
import TrackVisibility from "react-on-screen";
import LazyLoad from "react-lazyload";

import {getPostUrlPath, readingTime, tokenizePost} from "../../utils/helpers";
import {Post as PostProps, Post as PostInterface} from "../../templates/types";
import {Article, Author, AuthorContent, Content, Cover, Gravatar, List, ListItem, StyledCard, Wrapper} from "./styles";
import {StyledButton} from "../pages/styles";


interface Props {
    posts: PostInterface[];
    showExcerpt?: boolean;
    title?: string;

    //  if these cards are rendered using a dark theme
    darkTheme?: boolean;
    paginate?: {
        pageSize: number;
    };
}

interface State {
    postsToShow: number;
    showingMore: boolean;
}

export default class Posts extends Component<Props, State> {
    state: State = {
        showingMore: false,
        postsToShow: 6
    };
    ticking: boolean | undefined = undefined;

    get paginationLimit(): number {
        const {paginate} = this.props;
        if (paginate) {
            return paginate.pageSize;
        }
        return 0;
    }

    update() {
        const {paginate} = this.props;

        if (!paginate) return;

        const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
        if (this.state.showingMore && distanceToBottom < 100) {
            this.setState({postsToShow: this.state.postsToShow + paginate.pageSize})
        }
        this.ticking = false;
    }

    handleScroll = () => {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => this.update())
        }
    };

    componentDidMount() {
        if (typeof window != undefined) window.addEventListener(`scroll`, this.handleScroll)
    }

    componentWillUnmount() {
        if (typeof window != undefined) window.removeEventListener(`scroll`, this.handleScroll);
    }

    render() {
        const {posts, title, paginate, showExcerpt, darkTheme} = this.props;

        const result: PostProps[] = [];
        let slicedPosts: PostProps[] = [];

        if (paginate) {
            slicedPosts = posts.slice(0, this.state.postsToShow);
        } else {
            slicedPosts = posts;
        }

        for (let i = 0; i < slicedPosts.length; i++) {
            result.push(tokenizePost(slicedPosts[i]));
        }

        return (
            <Wrapper className={darkTheme ? "darktheme" : ""}>
                {title && <h3>
                    {title}
				</h3>}

                <List is="ul" style={{
                    margin: "0 -20px"
                }}>
                    {result.map((post, key) => {
                        return <ListItem
                            width={[6 / 6, 3 / 6, 2 / 6]}
                            px={'20px'}
                            is="li"
                            key={key}
                            className={`itemli`}
                        >
                            <Article className={"post-card-article"}>
                                <StyledCard
                                    to={getPostUrlPath(post)}
                                    className="post-card unselectable"
                                >
                                    {post.cover && <Cover className={"post-card-cover"}>
										<LazyLoad height={210}>
											<TrackVisibility once>
												<Img
													alt={title}
													fluid={post.cover.fluid}
													style={{maxHeight: 210}}
												/>
											</TrackVisibility>
										</LazyLoad>

									</Cover>}

                                    <Content className={"post-card-content"}>
                                        <span className={`date`}>{post.createdAt}</span>
                                        <h5 className={`title`}>{post.title}</h5>
                                        {showExcerpt !== false && <p className={`excerpt`}>{post.excerpt}</p>}
                                    </Content>

                                    <Author className={"post-card-author"}>
                                        <Gravatar>
                                            <Img fluid={post.author.avatar.fluid}/>
                                        </Gravatar>

                                        <AuthorContent>
                                            <div className="name">{post.author.name}</div>

                                            <div className="info">
                                                {readingTime(post).text} in <b>{post.categories[0].title}</b>
                                            </div>
                                        </AuthorContent>
                                    </Author>
                                </StyledCard>
                            </Article>
                        </ListItem>
                    })}

                </List>

                {paginate && !this.state.showingMore && posts.length > this.state.postsToShow &&
				<StyledButton large minimal active icon="refresh" onClick={() => {
                    this.setState({
                        postsToShow: this.state.postsToShow + paginate.pageSize,
                        showingMore: true,
                    })
                }}>
					<b>Load more articles</b>
				</StyledButton>}
            </Wrapper>
        );
    }
}
