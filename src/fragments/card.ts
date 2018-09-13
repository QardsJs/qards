import {graphql} from 'gatsby';

export const _ = graphql`
	fragment cardFragment on ContentfulCard {
		id
		title
        subtitle
        contentful_id
        
        content {
            content {
                nodeType
                content{
                    value
                }
                data {
                    target{
                        sys {
                            id
                            contentType{
                                sys{
                                    id
                                    type
                                }
                            }
                        }
                    }
                }
            }
        }
	}
`;