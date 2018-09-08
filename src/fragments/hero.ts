import {graphql} from 'gatsby';

export const _ = graphql`
	fragment cardHeroFragment on ContentfulCardHero {
	    id
	    order
        title
        image {
            fixed(width: 100) {
                ...GatsbyContentfulFixed_tracedSVG
            }
        }
	}
`;