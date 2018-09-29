import React, {Component} from "react";
import styled from "styled-components";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";
import {Box, Flex} from "grid-styled";
import Img from "gatsby-image";

import 'react-circular-progressbar/dist/styles.css';

import theme from "../../../theme/";
import {Icon} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

import {graphql, StaticQuery} from "gatsby";
import {CardImageType} from "../../qard/image";

const Wrapper = styled.div`
    color: ${theme.color(['primary', 'background'])};
    margin-top: 80px;
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        border-left: none;
        padding-left: 0;
    }
    
    .screenshot {
        width: 100%;
        padding: 0px;
        border-radius: 6px;
        box-shadow: rgba(8, 35, 51, 0.05) 0px 4px 8px;
        margin-bottom: 100px;
        
        -webkit-animation: fadein .5s; /* Safari, Chrome and Opera > 12.1 */
           -moz-animation: fadein .5s; /* Firefox < 16 */
            -ms-animation: fadein .5s; /* Internet Explorer */
             -o-animation: fadein .5s; /* Opera < 12.1 */
                animation: fadein .5s;
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.xsmall}em) {
        .screenshot {
            display: none;
        }
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.medium}em) {
        .screenshot {
            margin-top: 20px;
        }
    }
`;

const Section = styled(Flex)`
    &:last-child {
        .screenshot {
            margin-bottom: 0;
        } 
    }
`;

const Card = styled.div`
    text-align: justify;
    text-justify: inter-word;
    border-bottom: 1px dashed ${theme.color(['borders'])};
    padding: 20px 20px 10px 20px;
    
    &:hover {
        cursor: pointer;
    }
    
    &:hover, &.active {
        background: ${theme.color(['faded', 'background'])};
    }
    
    &:last-child {
        border-bottom: none;
    }
    
    .heading {
        .title {
            font-size: 1.3rem;
            font-weight: 500;
            margin: 0;
            padding: 0;
        } 
        
        .icon {
            float: left;
            width: 40px;
            height: 40px;
            font-size: 18px;
            padding: 10px;
            border-radius: 50%;
            
            &.success {
                color: ${theme.color(['intents', 'success', 'text'])};
                background-color: ${theme.color(['intents', 'success', 'background'])};
            }
            
            &.danger {
                color: ${theme.color(['intents', 'danger', 'text'])};
                background-color: ${theme.color(['intents', 'danger', 'background'])};
            }
            
            &.primary {
                color: #0F7AD8;
                background-color: #C2DCF2;
            }
        }
    }
    
    b {
        font-size: 1.6rem;
        font-weight: 400;
        display: block;
        margin-bottom: 10px;
    }
    
    p {
        margin-top: 10px;
        line-height: 1.6rem;
        font-size: 1rem;
        color: ${theme.color(['lightText'])};
    }
    
    &.qards {
        margin-top: 40px;
    }
    
    @media screen and (max-width: ${theme.main.breakpoints.medium}em) {
        &.qards {
            margin-top: 0px;
        }
    }
`;

interface ImageNode {
	name: string;
	extension: string;
	childImageSharp: CardImageType;
}

interface DataProps {
	allFile: {
		edges: {
			node: ImageNode;
		}[];
	};
}

const Index = (props: any) => {
	return <StaticQuery
		query={graphql`
            query PublishersDevelopersImages {
                allFile {
                    edges {
                        node {
                            name
                            extension
                            childImageSharp {
                                fluid(maxWidth: 1200) {
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
            }
        `}

		render={(data: DataProps) => {
			return <PublishersDevelopers {...data}/>
		}}
	/>
};

export class PublishersDevelopers extends Component<DataProps & HTMLDivProps, {
	selectedScreenshot: string
}> {
	state = {
		selectedScreenshot: "vscode"
	};

	getScreenshot(name: string, extension: string): null | ImageNode {
		for (let i = 0; i < this.props.allFile.edges.length; i++) {
			const node = this.props.allFile.edges[i].node;

			if (node.name == name && node.extension == extension) {
				return node;
			}
		}

		return null;
	}

	render() {
		const {...props} = this.props;

		const qards: ImageNode | null = this.getScreenshot("qards", "png");
		const vscode: ImageNode | null = this.getScreenshot("vscode", "png");
		const contentful: ImageNode | null = this.getScreenshot("contentful", "png");

		return (
			<Wrapper {...props}>
				<Section flexWrap={"wrap"} alignItems={"center"}>
					<Box width={[3 / 3, 3 / 3, 3 / 3, 1 / 3]} pr={[0, 0, 0, 4]}>
						<Card onMouseEnter={() => this.setState({selectedScreenshot: "vscode"})}>
							<div className="heading">
								<Flex flexWrap={"wrap"} alignItems={"center"}>
									<Box width={2 / 10} style={{maxWidth: 60}}>
										<div className={`icon success`}>
											<Icon icon={IconNames.CODE} iconSize={Icon.SIZE_LARGE}/>
										</div>
									</Box>

									<Box width={8 / 10}>
										<b className={"title"}>Developers</b>
									</Box>
								</Flex>
							</div>
							<p>
								Create and publish cards that take various configurations to display the
								content.
								Cards can be updated/re-designed at any time without any additional work
								required from
								the publishers.
							</p>
						</Card>
						<Card onMouseEnter={() => this.setState({selectedScreenshot: "contentful"})}>
							<div className="heading">
								<Flex flexWrap={"wrap"} alignItems={"center"}>
									<Box width={2 / 10} style={{maxWidth: 60}}>
										<div className={`icon danger`}>
											<Icon icon={IconNames.USER} iconSize={Icon.SIZE_LARGE}/>
										</div>
									</Box>

									<Box width={8 / 10}>
										<b className="title">Publishers</b>
									</Box>
								</Flex>
							</div>
							<p>
								Create content using Contentful CMS and tweak the available configuration
								points.
								No HTML is generated and the content is saved in its original state.
							</p>
						</Card>
					</Box>

					<Box width={[3 / 3, 3 / 3, 3 / 3, 2 / 3]} pl={[0, 0, 0, 4]}>
						{vscode && this.state.selectedScreenshot == "vscode" &&
							  <Img className={"screenshot"} fluid={vscode.childImageSharp.fluid}/>}
						{contentful && this.state.selectedScreenshot == "contentful" &&
							  <Img className={"screenshot"} fluid={contentful.childImageSharp.fluid}/>}
					</Box>

					<div className="divider"/>
				</Section>

			</Wrapper>
		);
	}
}

export default Index;