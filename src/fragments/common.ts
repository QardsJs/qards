import {CardImageType} from "../components/qard/image";

export interface PageMetaType {
	keywords: string;
	description: string;
}

export interface PageHeroType {
	alt: string;
	image: {
		sharp: CardImageType;
		thumb: CardImageType;
	};
}