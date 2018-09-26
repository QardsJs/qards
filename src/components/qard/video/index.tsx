import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import QardBase, {QardProps} from "../base";

import theme from '../../../theme';

const Wrapper = styled.div`
    .player {
        position: relative;
        margin-bottom: 10px;
        
        iframe {
            height: 100%;
            position: absolute;
            top: 0;
            width: 100%;
            left: 0;
        }
    }
    
    .video-player {
        padding-bottom: 56.34%;
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        .video-player {
            padding-bottom: 0;
        }
    }
`;

export interface CardVideoType extends QardProps {
    url: string;
}

export default class QardVideo extends QardBase<CardVideoType & HTMLDivProps, any> {
    render() {
        const {url, ...props} = this.props;

        return (
            <Wrapper {...props}>
                <div className="player">
                    <ReactPlayer width={"100%"} className={"video-player"} url={url}/>
                </div>
            </Wrapper>
        );
    }
}