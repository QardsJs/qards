import React, {Component} from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import TrackVisibility from 'react-on-screen';
import LazyLoad from 'react-lazyload';

import theme from '../../../theme';
import MarkdownRenderer from "../../markdown";
import {CardVideo as CardVideoProps} from "../../../templates/types"

const Wrapper = styled.div`
    margin-bottom: 30px;
    
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
 
    .title {
        font-size: .8em;
    }
    
    .description {
        font-size: .8em;
        color: ${theme.colors.lightText};
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

interface Props {
    element: CardVideoProps;
}

interface State {

}

export default class QardVideo extends Component<Props & HTMLDivProps, State> {
    render() {
        const {element, ...props} = this.props;

        return (
            <LazyLoad height={300}>
                <TrackVisibility once>
                    <Wrapper {...props}>
                        <div className="player">
                            <ReactPlayer width={"100%"} className={"video-player"} url={element.url}/>
                        </div>

                        <b className="title">{element.title}</b>
                        {element.description && <div className="description">
							<MarkdownRenderer md={element.description.description}/>
						</div>}
                    </Wrapper>
                </TrackVisibility>
            </LazyLoad>
        );
    }
}