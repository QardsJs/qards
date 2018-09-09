import React from 'react';

import Img from "gatsby-image";
import {Box} from 'grid-styled';
import TrackVisibility from "react-on-screen";
import LazyLoad from "react-lazyload";

import {
    Card as CardProps,
    CardAudio as CardAudioProps,
    CardCallout as CardCalloutProps,
    CardCodeBlock as CardCodeBlockProps,
    CardGallery as CardGalleryProps,
    CardHeader as CardHeaderProps,
    CardHero as CardHeroProps,
    CardParagraph as CardParagraphProps,
    CardRevealSet as CardRevealSetProps,
    CardVideo as CardVideoProps,
    Post as PostProps,
} from '../../templates/types';

import QardHeader from '../qard/header';
import QardGallery from '../qard/gallery';
import QardParagraph from '../qard/paragraph';
import QardAudio from '../qard/audio';
import QardVideo from '../qard/video';
import QardCodeBlock from '../qard/code';
import QardReveal from '../qard/reveal';
import QardCallout from '../qard/callout';

import Hide from '../common/hide';
import {Types} from '../qard/meta';
import Sidebar from './sidebar';
import Author from '../author';
import {Article, CardWrapper, Date, Hero, SidebarWrapper, SubTitle, Title, Wrapper} from "./styles";

export interface Props {
    post: PostProps;
    location: {
        href: string;
    };
}

export interface CardElementType {
    type: string;
    order: number;
    elementCallout?: CardCalloutProps;
    elementHero?: CardHeroProps;
    elementHeader?: CardHeaderProps;
    elementAudio?: CardAudioProps;
    elementVideo?: CardVideoProps;
    elementGallery?: CardGalleryProps;
    elementCodeBlock?: CardCodeBlockProps;
    elementReveal?: CardRevealSetProps;
    elementParagraph?: CardParagraphProps;
}

export default class Post extends React.Component<Props, any> {
    static cardElements(card: CardProps): CardElementType[] {
        // Will loop through all the contents of this
        // card and arrange them based on order. Will
        // also assign the types for later consuming
        const content = [];
        const {headers, paragraphs, hero, galleries, codeBlocks, audios, videos, reveals, callouts} = card;

        if (hero) {
            content.push({
                type: Types.HERO,
                order: 0,
                elementHero: hero,
            });
        }

        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                content.push({
                    type: Types.HEADER,
                    order: headers[i].order,
                    elementHeader: headers[i],
                });
            }
        }

        if (paragraphs) {
            for (let i = 0; i < paragraphs.length; i++) {
                content.push({
                    type: Types.PARAGRAPH,
                    order: paragraphs[i].order,
                    elementParagraph: paragraphs[i],
                });
            }
        }

        if (galleries) {
            for (let i = 0; i < galleries.length; i++) {
                content.push({
                    type: Types.GALLERY,
                    order: galleries[i].order,
                    elementGallery: galleries[i],
                });
            }
        }

        if (reveals) {
            for (let i = 0; i < reveals.length; i++) {
                content.push({
                    type: Types.REVEAL,
                    order: reveals[i].order,
                    elementReveal: reveals[i],
                });
            }
        }

        if (callouts) {
            for (let i = 0; i < callouts.length; i++) {
                content.push({
                    type: Types.CALLOUT,
                    order: callouts[i].order,
                    elementCallout: callouts[i],
                });
            }
        }

        if (codeBlocks) {
            for (let i = 0; i < codeBlocks.length; i++) {
                content.push({
                    type: Types.CODE,
                    order: codeBlocks[i].order,
                    elementCodeBlock: codeBlocks[i],
                });
            }
        }

        if (audios) {
            for (let i = 0; i < audios.length; i++) {
                content.push({
                    type: Types.AUDIO,
                    order: audios[i].order,
                    elementAudio: audios[i],
                });
            }
        }

        if (videos) {
            for (let i = 0; i < videos.length; i++) {
                content.push({
                    type: Types.VIDEO,
                    order: videos[i].order,
                    elementVideo: videos[i],
                });
            }
        }

        return content.sort((a, b) => {
            return a.order - b.order;
        });
    }

    get orderdCards(): CardProps[] {
        const {post} = this.props;
        return post.cards.sort((a, b) => {
            return a.order - b.order;
        });
    }

    renderCard(elements: CardElementType[]) {
        return (
            <React.Fragment>
                {elements.map((element, key) => {
                    let ret;

                    switch (element.type) {
                        case Types.HEADER:
                            if (!element.elementHeader) break;
                            ret = <QardHeader element={element.elementHeader}/>;
                            break;

                        case Types.PARAGRAPH:
                            if (!element.elementParagraph) break;
                            ret = <QardParagraph element={element.elementParagraph}/>;
                            break;

                        case Types.GALLERY:
                            if (!element.elementGallery) break;
                            ret = <QardGallery element={element.elementGallery}/>;
                            break;

                        case Types.CODE:
                            if (!element.elementCodeBlock) break;
                            ret = <QardCodeBlock element={element.elementCodeBlock}/>;
                            break;

                        case Types.AUDIO:
                            if (!element.elementAudio) break;
                            ret = <QardAudio infinite={true} element={element.elementAudio}/>;
                            break;

                        case Types.CALLOUT:
                            if (!element.elementCallout) break;
                            ret = <QardCallout element={element.elementCallout}/>;
                            break;

                        case Types.VIDEO:
                            if (!element.elementVideo) break;
                            ret = <QardVideo element={element.elementVideo}/>;
                            break;

                        case Types.REVEAL:
                            if (!element.elementReveal) break;
                            ret = <QardReveal element={element.elementReveal}/>;
                            break;
                    }

                    return ret ? <React.Fragment key={key}>{ret}</React.Fragment> : null;
                })}
            </React.Fragment>
        );
    }

    public render() {
        const {post, location} = this.props;

        return (
            <Wrapper>
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

                        {this.orderdCards.map((card, key) => {
                            return (
                                <CardWrapper key={key}>
                                    {this.renderCard(Post.cardElements(card))}
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
            </Wrapper>
        );
    }
}
