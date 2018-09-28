import {graphql} from 'gatsby';
import {CardImageType} from "../components/qard/image";

export interface AuthorType {
	id: string;
	frontmatter: {
		title: string;
		excerpt: string;
		avatar: {
			image: CardImageType;
		};
	}
}

export const _ = graphql`
	fragment authorFragment on MarkdownRemark {
		id
		frontmatter {
			title
			excerpt
			avatar {
				image: childImageSharp {
					fixed(width: 120) {
						width
						height
						tracedSVG
						aspectRatio
						src
						srcSet
					}
				}
			}
		}
	}
`;