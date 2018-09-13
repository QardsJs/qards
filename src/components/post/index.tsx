import React from 'react';

import Img from "gatsby-image";
import {Box} from 'grid-styled';
import TrackVisibility from "react-on-screen";
import LazyLoad from "react-lazyload";
import Card, {CardType} from "./card";

import Hide from '../common/hide';
import Sidebar from './sidebar';
import Author from '../author';
import ScrollProgress from "../scroll-progress";
import {Article, CardWrapper, Date, Hero, SidebarWrapper, SubTitle, Title, Wrapper} from "./styles";
import {CategoryType} from "../../templates/category";
import {Image, Tag} from "../../templates/types";
import {AuthorType} from "../author";

export interface PostType {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
    cover: Image;
    categories: CategoryType[];
    cards: CardType[];
    author: AuthorType;
}

export interface Props {
    post: PostType;
    location: {
        href: string;
    };
}

export default class Post extends React.Component<Props, any> {

    public render() {
        const {post, location} = this.props;

        return (
            <Wrapper data-rpi-area>
                <Box width={[1, 1, 1, 3 / 5]} mt={[0, 0, 0, 60]}>
                    <Article>
                        <Title>{post.title}</Title>
                        <Date>{post.updatedAt}</Date>

                        {post.cover && <Hero>
							<LazyLoad height={300}>
								<TrackVisibility once>
									<Img fluid={post.cover.fluid}/>
								</TrackVisibility>
							</LazyLoad>
						</Hero>}


                        <SubTitle>{post.excerpt}</SubTitle>

                        {post.cards.map((card, key) => {
                            if (!card.content) return "";
                            return (
                                <CardWrapper key={key}>
                                    <Card card={card}/>
                                </CardWrapper>
                            );
                        })}
                    </Article>

                    <Author author={post.author} style={{
                        marginTop: 40
                    }}/>
                </Box>
                <SidebarWrapper width={[0, 0, 0, 2 / 5]} mt={[0, 0, 0, 60]}>
                    <Hide medium small xsmall className={'sidebar'}>
                        <Sidebar wrapperProps={{style: {marginLeft: 60}}} post={post} currentUrl={location.href}/>
                    </Hide>
                </SidebarWrapper>


                <ScrollProgress identifier={post.id}/>
            </Wrapper>
        );
    }
}
