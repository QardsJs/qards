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
			order
		
			hero {
				...cardHeroFragment
			}
		
			headers {
				id
				order
				title
				subtitle
			}
			
			callouts {
			    id
				order
				title
				icon
				intent
				message {
				    message
				}
			}
		
			paragraphs {
				order
				text {
					text
				}
			}
			
			reveals {
                id
                order
                items {
                    id
                    order
                    title
                    content {
                        content
                    }
                }
            }
		
			codeBlocks {
				id
				order
				language
				code {
					code
				}
			}
			
			videos {
			    id
			    url
			    title
			    description {
			        description
			    }
			}
			
			audios {
			    order
				playlist {
					id
					url
					title
					subtitle
					poster {
                        resize(width: 120) {
                            src
                            width
                            height
                        }
                    }
				}
			}
		
			galleries {
			    id
			    order
				entries {
					...galleryEntryFragment
				}
			}
		}
		author {
			...authorFragment
		}
	}
`;