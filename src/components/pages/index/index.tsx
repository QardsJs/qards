import React, {Component} from "react";
import styled from "styled-components";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import tinycolor from "tinycolor2";
import LazyLoad from "react-lazyload";
import {Box} from "grid-styled";

import theme from "../../../theme/";
import Subscribe from '../../subscribe';
import Layout from "../../layout";
import Helmet from "react-helmet";
import DiagonalBand from "../../common/diagonal-band";
import Content from "../../layout/content";
import Heading from "./heading";
import Features from "./features";
import SideBySide from "./sidebyside";
import PublishersDevelopers from "./publishers-developers";

import colors from "../../../theme/colors"

import Rocket from "../../../static/images/homepage/rocket.svg";
import Posts from "../../posts";
import {Post as PostProps} from "../../../templates/types";

const Wrapper = styled.div``;

export const Hero = styled.div`
	padding: 0 0 40px 0;

	h1 {
		font-size: 3rem;
	}

	h2 {
		font-size: 1.3rem;
		font-weight: 400;
	}
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.1rem;
            font-weight: 400;
        }
    }
`;

export const GreenBg = styled.div`
    color: ${colors.bgPrimaryText};
	background-color: #3DCC91;
    background-image: radial-gradient(ellipse at center -50%, ${tinycolor("#3DCC91").lighten(20).toString()} 0%,#3DCC91 56%,#3DCC91 100%);
    padding: 80px 0;
	margin-top: 200px;
`;

export const PrimaryBg = styled.div`
    background: ${colors.primary};
    color: ${colors.bgPrimaryText};
    background-image: radial-gradient(ellipse at center -50%, ${tinycolor(colors.primary).lighten(20).toString()} 0%,${colors.primary} 56%,${colors.primary} 100%);
    padding: 80px 0;
`;

interface Props {
    latest: PostProps[];
}

interface State {

}

export default class IndexRoute extends Component<Props & HTMLDivProps, State> {
    render() {
        const {latest} = this.props;

        return <Layout>
            <Helmet title={`Qards - A blogging platform for professionals`}>
                <meta name="description" content={""}/>
            </Helmet>

            <DiagonalBand skew={24}/>

            <Wrapper>
                <Hero>
                    <Content>
                        <Box mt={[80, 80, 80, 180]} mb={[40, 40, 40, 120]}>
                            <Heading
                                title={"A blogging platform for professionals"}
                                subtitle={"Qards is a blogging platform focused " +
                                "on performance and on closing the gap\n" +
                                "between content publishers and developers"}
                            />
                        </Box>
                    </Content>
                </Hero>

                <Content>
                    <Features/>
                </Content>

                <Hero>
                    <Box mt={[120, 120, 120, 180]} mb={[20, 20, 20, 100]}>
                        <Content>
                            <Heading
                                title={"Developers and Publishers express without barriers"}
                                subtitle={"With Qards, developers are free to shape content however they like; " +
                                "a content that is pure and speaks metadata about itself. No junk or polluted " +
                                "WYSIWYG editors."}
                            />

                            <PublishersDevelopers/>
                        </Content>
                    </Box>
                </Hero>

                <GreenBg>
                    <div style={{
                        textAlign: "center",
                        marginTop: -235
                    }}>
                        <LazyLoad height={296}>
                            <img width={250} src={Rocket} alt=""/>
                        </LazyLoad>
                    </div>

                    <Hero>
                        <Content>
                            <Heading
                                title={"Supercharge your content"}
                                subtitle={"It's time to change the way we are sending content " +
                                "to our users and make use of the latest technologies that make " +
                                "your website faster, cheaper, easier to operate, more secure and engaging"}
                            />
                        </Content>
                    </Hero>

                    <Content>
                        <SideBySide/>
                    </Content>
                </GreenBg>

                <Hero>
                    <Box mt={[80, 80, 80, 120]} mb={[80, 80, 80, 120]}>
                        <Content>
                            <Subscribe
                                title={"We're in closed beta"}
                                subtitle={"Please subscribe if you want to get notified of our release and future updates"}
                            />
                        </Content>
                    </Box>
                </Hero>

                <PrimaryBg>
                    <Content>
                        <Box mb={40}>
                            <Posts darkTheme={true} showExcerpt={true} posts={latest.slice(0, 3)}
                                   title={`Latest articles`} paginate={{
                                pageSize: 6
                            }}/>
                        </Box>
                    </Content>
                </PrimaryBg>
            </Wrapper>
        </Layout>
    }
}