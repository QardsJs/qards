import {graphql} from 'gatsby';

export const _ = graphql`
	fragment categoryFragment on ContentfulCategory {
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