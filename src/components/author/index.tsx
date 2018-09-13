import React, {Component} from "react";
import {Box, Flex} from "grid-styled";
import styled from "styled-components";
import Img from "gatsby-image";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import {Image} from "../../templates/types";

const Wrapper = styled.div`
    .name, .company {
        display: block;
        font-size: 14px!important;
    }
    
    .name {
        margin-bottom: 10px;
    }
    
    .bio {
        text-align: left;
    }
`;

const Avatar = styled.div`
    margin-right: 20px;
    line-height: 0;
    max-width: 80px;
    
    img {
        height: 80px;
        width: 80px;
        border-radius: 40px;
    }
`;


export interface AuthorType {
    name: string;
    title: string;
    company: string;
    shortBio: {
        shortBio: string;
    };
    avatar: Image;
}

interface Props {
    author: AuthorType
}

interface State {

}

export default class PostAuthor extends Component<Props & HTMLDivProps, State> {
    render() {
        const {author, ...props} = this.props;

        return (
            <Wrapper {...props}>
                <Flex>
                    <Box width={100}>
                        <Avatar>
                            <Img fluid={author.avatar.fluid}/>
                        </Avatar>
                    </Box>
                    <Box flex={'1 1 auto'} pt={1} pb={2}>
                        <b className={"name"}>{author.name}</b>
                        <div className="bio">
                            {author.shortBio.shortBio}
                        </div>
                    </Box>
                </Flex>
            </Wrapper>
        );
    }
}