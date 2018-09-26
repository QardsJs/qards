import {graphql} from 'gatsby';

export const _ = graphql`
	fragment postFragment on MarkdownRemark {
		id
		md: rawMarkdownBody
		
		authors {
			frontmatter {
				title
				avatar {
					image: childImageSharp {
						fixed(width: 80) {
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
		
		frontmatter{
			title
			excerpt
			created_at(formatString: "MMMM DD, YYYY")
			tags
			
			meta{
				keywords
				description
			}
			
			hero{
				alt
				image {
					image: childImageSharp {
						fluid(maxWidth: 2900) {
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
		
		audioPosterImages: childrenQardsAudioImages {
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
		
		galleryImages: childrenQardsGalleryImages {
			image: childImageSharp {
				fluid(maxWidth: 2900) {
					tracedSVG
					aspectRatio
					src
					srcSet
					sizes
				}
			}
		}
		
		fields {
			slug
		}
	}
`;