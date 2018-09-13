import {graphql} from 'gatsby';

export const _ = graphql`
	fragment postFragment on ContentfulPost {
		id
		slug
		title
		excerpt
		
		createdAt(formatString: "MMMM DD, YYYY")
		updatedAt(formatString: "MMMM DD, YYYY")
		
		cover {
            fluid(maxWidth: 1200) {
                ...GatsbyContentfulFluid_tracedSVG
            }
        }
		
		tags {
		    ...tagFragment
		}
		
		categories {
			...categoryFragment
		}
		
		cards {
			...cardFragment
		}
		author {
			...authorFragment
		}
	}
`;