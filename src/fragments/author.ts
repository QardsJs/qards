import {graphql} from 'gatsby';

export const _ = graphql`
	fragment authorFragment on ContentfulAuthor {
	    id
		name
        
        shortBio {
            shortBio
        }
        
        avatar {
            fluid(maxWidth: 80) {
                ...GatsbyContentfulFluid_tracedSVG
            }
        }
	}
`;