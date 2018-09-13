import React from "react";
import styled from "styled-components";

import QardHeaderQueried from '../qard/header/queried';

import QardParagraph from '../qard/paragraph';
import QardParagraphQueried from '../qard/paragraph/queried';

import QardGalleryQueried from '../qard/gallery/queried';
import QardRevealQueried from '../qard/reveal/queried';
import QardVideoQueried from '../qard/video/queried';
import QardCalloutQueried from '../qard/callout/queried';
import QardAudioQueried from '../qard/audio/queried';

import QardCodeQueried from '../qard/code/queried';

import theme from "../../theme";

export const Wrapper = styled.article`
    
`;

const HeaderWrapper = styled.header`
	margin-top: 0px;
	margin-bottom: 30px;

	h3 {
		margin-top: 20px;
		margin-bottom: 5px;
	}

	h5 {
		margin-top: 0px;
		margin-bottom: 0px;
		color: ${theme.colors.lightText};
		font-weight: 300;
		font-size: 1.3rem;
		line-height: 1.6rem;
	}
`;

export interface CardContentEntityType {
    //  paragraph, h1, embedded-entry-block etc
    nodeType: string;
    content: {
        //  if it's not a `embedded-entry-block` it will have its value here
        value: string;
    }
    data: {
        //  gets filled only for `embedded-entry-block` otherwise it's null
        target?: {
            sys: {
                //  entry id of the linked widget
                id: string;
                contentType: {
                    sys: {
                        //  the type of widget that was embedded: (cardAudio, cardVideo etc)
                        id: string;
                        type: string;
                    }
                }
            }
        }
    }
}


export interface CardContentType {
    content: CardContentEntityType[];
}

export interface CardType {
    id: string;
    title?: string;
    subtitle?: string;
    content: CardContentType;
}

export interface PostCardProps {
    card: CardType;
}

export const EntityTypes = {
    HEADER: 'cardHeader',
    PARAGRAPH: 'cardParagraph',
    GALLERY: 'cardGallery',
    REVEAL: 'cardReveal',
    CODE: 'cardCode',
    VIDEO: 'cardVideo',
    CALLOUT: 'cardCallout',
    AUDIO: 'cardAudio',
};

export default class Card extends React.Component<PostCardProps, any> {
    /**
     * Renders a piece of content which can be an embedded widget that
     * we support or a basic HTMl tag entity (paragraph, code etc)
     */
    renderEntity = (entity: CardContentEntityType) => {
        if (entity.nodeType == "embedded-entry-block") {
            return this.renderEmbeddedEntity(entity);
        }

        return this.renderBasicEntity(entity)
    };

    //  These are the widgets supported by cards. Keep in mind that the `value` is empty here
    //  and Contentful only sends us an id that we have to query inside the component
    renderEmbeddedEntity = (entity: CardContentEntityType) => {
        if (!entity.data.target) return;

        switch (entity.data.target.sys.contentType.sys.id) {
            case EntityTypes.PARAGRAPH:
                return <QardParagraphQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.HEADER:
                return <QardHeaderQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.GALLERY:
                return <QardGalleryQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.REVEAL:
                return <QardRevealQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.CODE:
                return <QardCodeQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.VIDEO:
                return <QardVideoQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.CALLOUT:
                return <QardCalloutQueried contentful_id={entity.data.target.sys.id}/>;

            case EntityTypes.AUDIO:
                return <QardAudioQueried contentful_id={entity.data.target.sys.id}/>;
        }
    };

    //  These are basic HTMl entities. Try to widgetize (is that a word?)
    //  as much as possible in order to have control over the content
    renderBasicEntity = (entity: CardContentEntityType) => {
        switch (entity.nodeType) {
            case 'paragraph':
                return <QardParagraph element={{text: {text: entity.content.value}}} isMarkdown={false}/>;
            default:
                //  an error letting the user know we didin't identify the entity
                console.error(`unknown basic entity: ${entity.nodeType}`);
        }
    };

    render() {
        const {title, subtitle, content} = this.props.card;

        return <Wrapper className={`post-card`}>
            {(title || subtitle) && <HeaderWrapper className={`post-card-header`}>
                {title && <h3>{title}</h3>}
                {subtitle && <h5>{subtitle}</h5>}
			</HeaderWrapper>}

            {content && content.content.map(
                (contentEntity: CardContentEntityType, key: number) => {
                    return <React.Fragment key={key}>
                        {this.renderEntity(contentEntity)}
                    </React.Fragment>
                })}
        </Wrapper>
    }
}