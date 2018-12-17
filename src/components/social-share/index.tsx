import React, {Component} from "react";
import styled from "styled-components";
import {Box, Flex} from '@rebass/grid';
import {Button} from "@blueprintjs/core";
import {
    FacebookIcon,
    FacebookShareButton,
    GooglePlusIcon,
    GooglePlusShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinShareButton,
    LinkedinIcon
} from 'react-share';

const Wrapper = styled.div``;
const Btn = styled(Button)`
    padding: 0px!important;
    
    &:hover {
        transform: scale(1.03);
    }
    
    svg {
        border-radius: 4px!important;
    }
`;

interface Props {
    url: string;
    message: string;
}

interface State {

}

export default class SocialShare extends Component<Props, State> {
    render() {
        const {url, message, ...props} = this.props;

        return (
            <Wrapper {...props}>
                <Flex justifyContent={'center'}>
                    <Box px={2}>
                        <FacebookShareButton url={url} quote={message}>
                            <Btn icon={<FacebookIcon size={48}/>}/>
                        </FacebookShareButton>
                    </Box>

                    <Box px={2}>
                        <TwitterShareButton url={url} title={message}>
                            <Btn icon={<TwitterIcon size={48}/>}/>
                        </TwitterShareButton>
                    </Box>

                    <Box px={2}>
                        <WhatsappShareButton url={url} title={message}>
                            <Btn icon={<WhatsappIcon size={48}/>}/>
                        </WhatsappShareButton>
                    </Box>

                    <Box px={2}>
                        <LinkedinShareButton url={url} title={message} windowWidth={750} windowHeight={600}>
                            <Btn icon={<LinkedinIcon size={48}/>}/>
                        </LinkedinShareButton>
                    </Box>
                </Flex>
            </Wrapper>
        );
    }
}
