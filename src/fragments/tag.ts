import {graphql} from 'gatsby';

export const _ = graphql`
	fragment tagFragment on ContentfulTag {
		id
		slug
		title
        description
        cover {
            fixed(width: 100) {
                ...GatsbyContentfulFixed_tracedSVG
            }
        }
	}
`;