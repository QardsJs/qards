import React, {Component} from "react";
import styled from "styled-components";
import {ProgressBar, Intent} from "@blueprintjs/core";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import {Box, Flex} from "grid-styled";
import CircularProgressbar from 'react-circular-progressbar';

import theme from "../../../theme/";
import 'react-circular-progressbar/dist/styles.css';

import colors from "../../../theme/colors"

const Wrapper = styled.div`
    background: white;
    box-shadow: rgba(8, 35, 51, 0.05) 0px 4px 8px;
    color: ${colors.text};
    border-radius: 8px;
    padding: 32px 32px 10px 32px;
    position: relative;
    min-height: 500px;
    position: relative;
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
       padding: 20px 0;
    }
    
    .title {
        font-size: 2rem;
        line-height: 2.4rem;
        text-align: center;
        font-weight: 400;
        display: block;
    }
`;

const CircularFlex = styled(Flex)`
    padding: 40px 0 10px 0;
    
    .circular {
        width: 70%;
        max-width: 120px;
        margin: 0 auto;
    }
    
    b {
        display: block;
        margin-bottom: 10px;
    }
    
    span {
        color: ${colors.lightText};
        line-height: 1.6rem;
        font-size: .9rem;
    }
`;

const PerformanceList = styled.ul`
    list-style-type: none;
    margin: 20px 0 0 0;
    padding: 20px;
    
    li {
        margin-bottom: 40px;
        
        .measurement {
            display: block;
            color: ${colors.lightText};
            text-transform: uppercase;
            margin-bottom: 8px;
            font-size: .8rem;
            float: left;
        }
            
        .result {
            float: right;
            font-weight: 600;
        }
    }
`;

interface Props {

}

interface State {

}

export default class SideBySide extends Component<Props & HTMLDivProps, State> {
    render() {
        const {...props} = this.props;

        return (
            <Wrapper {...props}>
                <Flex flexWrap={"wrap"}>
                    <Box width={[2 / 2, 2 / 2, 2 / 4, 2 / 4]} px={[0, 0, 0, 4]}>
                        <b className={"title"}>Qards website</b>

                        <CircularFlex flexWrap={"wrap"}>
                            <Box width={[1, 1, 1, 1 / 2]} pl={[0, 0, 0, 20]} px={[60, 60, 60, 0]}>
                                <div className="circular">
                                    <CircularProgressbar
                                        percentage={100}
                                        text={`${100}%`}
                                        strokeWidth={3}
                                        styles={{
                                            path: {stroke: colors.intents.success.color},
                                            text: {fill: colors.intents.success.color, fontSize: '16px'},
                                        }}
                                    />
                                </div>
                            </Box>

                            <Box width={[1, 1, 1, 1 / 2]} px={[4, 4, 4, 0]} mt={[40, 40, 40, 0]}>
                                <b>Performance index</b>
                                <span>
                                    Qards blog deployed to a CDN that served from a location close to where the test was made
                                </span>
                            </Box>
                        </CircularFlex>

                        <PerformanceList>
                            <li>
                                <div className={"measurement"}>First meaningful paint</div>
                                <div className="result">980 ms</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.3}/>
                            </li>
                            <li>
                                <div className={"measurement"}>First interactive</div>
                                <div className="result">3,210 ms</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.6}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Consistently interactive</div>
                                <div className="result">3,210 ms</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.6}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Perceptual Speed Index: 980</div>
                                <div className="result">100</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.1}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Estimated Input Latency: 15 ms</div>
                                <div className="result">100</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.1}/>
                            </li>
                        </PerformanceList>
                    </Box>
                    <Box width={[2 / 2, 2 / 2, 2 / 4, 2 / 4]} px={[0, 0, 0, 4]}>
                        <b className={"title"}>Wordpress website</b>

                        <CircularFlex flexWrap={"wrap"}>
                            <Box width={[1, 1, 1, 1 / 2]} pl={[0, 0, 0, 20]} px={[60, 60, 60, 0]}>
                                <div className="circular">
                                    <CircularProgressbar
                                        percentage={74}
                                        text={`${74}%`}
                                        strokeWidth={4}
                                        styles={{
                                            path: {stroke: colors.intents.warning.color},
                                            text: {fill: colors.intents.warning.color, fontSize: '16px'},
                                        }}
                                    />

                                </div>
                            </Box>

                            <Box width={[1, 1, 1, 1 / 2]} px={[4, 4, 4, 0]} mt={[40, 40, 40, 0]}>
                                <b>Performance index</b>
                                <span>
                                    Wordpress blog deployed to a Digitalocean droplet (2vCPU, 4gb ram) located close
                                    to where the test was made
                                </span>
                            </Box>
                        </CircularFlex>

                        <PerformanceList>
                            <li>
                                <div className={"measurement"}>First meaningful paint</div>
                                <div className="result">3,180 ms</div>
                                <ProgressBar stripes={false} intent={Intent.WARNING} value={0.6}/>
                            </li>
                            <li>
                                <div className={"measurement"}>First interactive</div>
                                <div className="result">6,230 ms</div>
                                <ProgressBar stripes={false} intent={Intent.WARNING} value={1}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Consistently interactive</div>
                                <div className="result">6,230 ms</div>
                                <ProgressBar stripes={false} intent={Intent.WARNING} value={1}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Perceptual Speed Index: 1,997</div>
                                <div className="result">93</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.17}/>
                            </li>
                            <li>
                                <div className={"measurement"}>Estimated Input Latency: 16 ms</div>
                                <div className="result">100</div>
                                <ProgressBar stripes={false} intent={Intent.SUCCESS} value={0.1}/>
                            </li>
                        </PerformanceList>
                    </Box>
                </Flex>

                <p style={{
                    textAlign: "center",
                    lineHeight: 1.4,
                    fontSize: ".9rem",
                    marginBottom: 20,
                    color: colors.lightText,
                    padding: "20px 40px"
                }}>
                    These are <a
                    href="https://developers.google.com/web/tools/lighthouse/"
                    style={{textDecoration: "underline"}}
                    target={"_blank"}><b>lighthouse</b></a> audit results.

                    <br/>

                    Lighthouse is an open-source, automated tool for improving the quality of web pages.<br/>It has
                    audits for performance, accessibility, progressive web apps, and more.
                </p>
            </Wrapper>
        );
    }
}