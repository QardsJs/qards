import {Intent} from "@blueprintjs/core";
import {IconName} from "@blueprintjs/icons";

export interface Image {
    title: string;
    fluid: any;
    fixed: any;
    resize: any;
}

export interface Page {
    id: string;
    url: string;
    title: string;
}

export interface Reveal {
    id: string;
    order: number;
    title: string;
    content: {
        content: string;
    };
}

export interface Tag {
    id: string;
    slug: string;
    title: string;
    cover: Image;
    description: string;
}

export interface Category {
    id: string;
    slug: string;
    title: string;
    cover: Image;
    description: string;
}

export interface CardRevealSet {
    order: number;
    items: Reveal[];
}

export interface CardHero {
    order: number;
    title: string;
    image: Image;
}

export interface CardHeader {
    id: string;
    order: number;
    title: string;
    subtitle?: string;
}

export interface CardCodeBlock {
    id: string;
    order: number;
    language: string;
    code: {
        code: string;
    };
}

export interface CardCallout {
    id: string;
    order: number;
    title?: string;
    icon?: IconName;
    message: {
        message: string;
    };
    intent?: Intent;
}

export interface CardAudioItem {
    id: string;
    url: string;
    title: string;
    subtitle?: string;
    poster?: Image;
}

export interface CardAudio {
    id: string;
    order: number;
    playlist: CardAudioItem[];
}

export interface CardVideo {
    id: string;
    order: number;
    url: string;
    title: string;
    description?: {
        description: string;
    };
}

export interface CardGalleryEntry {
    id: string;
    image: Image;
    title: string;
}

export interface CardGallery {
    order: number;
    entries: CardGalleryEntry[];
}

export interface CardParagraph {
    order: number;
    text: {
        text: string;
    };
    collapseLongContent: boolean;
}

export interface Card {
    order: number;
    options: {
        intent: string;
        isShareable: boolean;
    };
    hero: CardHero;
    callouts: CardCallout[];
    audios: CardAudio[];
    videos: CardVideo[];
    headers: CardHeader[];
    reveals: CardRevealSet[];
    paragraphs: CardParagraph[];
    galleries: CardGallery[];
    codeBlocks: CardCodeBlock[];
}

export interface Author {
    name: string;
    title: string;
    company: string;
    shortBio: {
        shortBio: string;
    };
    avatar: Image;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
    cover: Image;
    categories: Category[];
    cards: Card[];
    author: Author;
}