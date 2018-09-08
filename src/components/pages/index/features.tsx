import React, {Component} from "react";

import styled from "styled-components";
import {Icon, Intent} from "@blueprintjs/core";
import {IconName, IconNames} from "@blueprintjs/icons";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import {Box, Flex} from "grid-styled";

import theme from "../../../theme/";
import colors from "../../../theme/colors";

const Wrapper = styled.div`
    box-shadow: rgba(8, 35, 51, 0.05) 0px 4px 8px;
    background: white;
    border-radius: 8px;
    padding: 32px 32px 10px 32px;
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        padding: 20px 0 0 0;
    }
`;

const FeatureWrapper = styled.div`
    margin-bottom: 32px;
    
    .heading {
        h3 {
            font-size: 1.3rem;
            font-weight: 500;
        } 
        
        .icon {
            float: left;
            width: 50px;
            height: 50px;
            font-size: 18px;
            padding: 16px;
            border-radius: 50%;
            
            &.success {
                color: ${colors.intents.success.color};
                background-color: ${colors.intents.success.background};
            }
            
            &.danger {
                color: ${colors.intents.danger.color};
                background-color: ${colors.intents.danger.background};
            }
            
            &.primary {
                color: #0F7AD8;
                background-color: #C2DCF2;
            }
        }
    }
    
    .content {
        font-size: 1.1rem;
        line-height: 1.7rem;
        font-weight: 300;
    } 
`;

interface Props {

}

interface FeatureProps {
    title: string;
    content: string;
    intent: Intent;
    icon: IconName;
}

interface State {

}

class Feature extends Component<FeatureProps, any> {
    render() {
        const {title, content, intent, icon, ...props} = this.props;
        return <FeatureWrapper {...props}>
            <div className="heading">
                <Flex flexWrap={"wrap"} alignItems={"top"}>
                    <Box width={2 / 10} pr={2} style={{maxWidth: 60}}>
                        <div className={`icon ${intent}`}>
                            <Icon icon={icon} iconSize={Icon.SIZE_LARGE}/>
                        </div>
                    </Box>

                    <Box width={8 / 10} px={2}>
                        <h3>{title}</h3>
                    </Box>
                </Flex>
            </div>

            <p className={"content"}>{content}</p>
        </FeatureWrapper>
    }
}

export default class Features extends Component<Props & HTMLDivProps, State> {
    render() {
        const {...props} = this.props;

        return (
            <Wrapper {...props}>
                <Flex flexWrap={"wrap"}>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Say good bye to web servers and databases"}
                            content={"Qards is a blogging platform powered by a static site generator " +
                            "and it will run on any CDN without a sweat."}
                            intent={Intent.SUCCESS}
                            icon={IconNames.APPLICATIONS}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Zero costs. Even for blogs with millions of visitors"}
                            content={"With modern tools such as Netlify you can have a super-busy " +
                            "blog operating at scale and with zero costs."}
                            intent={Intent.DANGER}
                            icon={IconNames.DOLLAR}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Your content is smart and powered by rich cards"}
                            content={"It's time to raise the bar when it comes to content creation. " +
                            "Qards allows you to create interactive, smart content."}
                            intent={Intent.PRIMARY}
                            icon={IconNames.LAYERS}
                        />
                    </Box>

                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Blazing fast, cdn-powered blogs at any scale"}
                            content={"Your deployments are converted to static assets and served from " +
                            "content delivery networks - closer to your visitors."}
                            intent={Intent.DANGER}
                            icon={IconNames.TIMELINE_LINE_CHART}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Modern technologies with React and GatsbyJs"}
                            content={"Qards is using the latest and most modern technologies to ensure " +
                            "a pleasant and open experience for your developers."}
                            intent={Intent.PRIMARY}
                            icon={IconNames.NINJA}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Un-hackable safe deployments."}
                            content={"Worry-free deployments that operate without servers or databases. " +
                            "Time to stop worrying about break-ins."}
                            intent={Intent.SUCCESS}
                            icon={IconNames.SHIELD}
                        />
                    </Box>

                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Tens of smart components to get started"}
                            content={"Charts, galleries, dynamic tables, embeds, quotes, audio playlists " +
                            "and so much more. Your publishers will love it!"}
                            intent={Intent.PRIMARY}
                            icon={IconNames.MERGE_COLUMNS}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Cached, offline and mobile first by default"}
                            content={"Your content is cached via service workers, pre-fetched for faster " +
                            "experience and designed to look good on mobiles."}
                            intent={Intent.SUCCESS}
                            icon={IconNames.OFFLINE}
                        />
                    </Box>
                    <Box width={[3 / 3, 3 / 3, 2 / 4, 1 / 3]} px={2}>
                        <Feature
                            title={"Publishers and developers working together"}
                            content={"Let's break those boundaries and allow your publishers to express " +
                            "their ideas using smart, interactive content."}
                            intent={Intent.DANGER}
                            icon={IconNames.TICK}
                        />
                    </Box>
                </Flex>
            </Wrapper>
        );
    }
}