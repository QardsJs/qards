import {graphql} from 'gatsby';

export const _ = graphql`
	fragment galleryEntryFragment on ContentfulCardGalleryEntry {
		id
        title
        image {
            fluid(maxWidth: 1200) {
                ...GatsbyContentfulFluid_tracedSVG
            }
        }
	}
`;