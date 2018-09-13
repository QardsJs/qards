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

export interface Tag {
    id: string;
    slug: string;
    title: string;
    cover: Image;
    description: string;
}

