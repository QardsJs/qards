import {graphql} from 'gatsby';
import {PostType} from "./post";
import {PageHeroType, PageMetaType} from "./common";

export interface CategoryType {
	id: string;
	posts?: {
		edges: PostType[];
	}

	frontmatter: {
		title: string;
		excerpt: string;
		meta: PageMetaType;
		hero: PageHeroType;
	}
}

export const _ = graphql`
	fragment categoryFragment on MarkdownRemark {
		id
		frontmatter{
			title
			excerpt
			
			meta{
				keywords
				description
			}
			
			hero{
				alt
				image {
					image: childImageSharp {
						fluid(maxWidth: 2500) {
							tracedSVG
							aspectRatio
							src
							srcSet
							sizes
						}
					}
				}
			}
		}
		
		fields {
			slug
		}
	}
`;
