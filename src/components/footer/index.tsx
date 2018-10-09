import * as React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import { Box, Flex } from "grid-styled";
import { CreditsContainer, FooterContainer, FooterWrapper, PageWrapper } from "./styles";
import { PostType } from "../../fragments/post";

interface DataProps {
	pages: {
		edges: {
			node: PostType
		}[]
	}
}

interface Props {

}

export default class Footer extends React.Component<Props, any> {
	render() {
		return <StaticQuery
			query={graphql`
                query {
                    pages: allMarkdownRemark(
					filter: {
						fileAbsolutePath: {regex: "//static/content/collections/posts//"},
						frontmatter: {isPage: {eq: true}}
					}
				) {
					edges {
						node {
							...postFragment
						}
					}
				}
                }
            `}

			render={(data: DataProps) => {

				const pages: PostType[] = [];
				if (data.pages) for (let i = 0; i < data.pages.edges.length; i++) {
					pages.push(data.pages.edges[i].node);
				}

				return <FooterWrapper>
					<FooterContainer>
						<Flex flexWrap={"wrap"}>
							<Box width={[4 / 4, 4 / 4, 1 / 4]}>
								<CreditsContainer>
									<p>
										Powered by <a href="https://qards.io">Qards</a>
									</p>
								</CreditsContainer>
							</Box>

							<Box width={[4 / 4, 4 / 4, 3 / 4]}>
								{pages && <Flex flexWrap={"wrap"} justifyContent={"flex-end"}>
									{pages.map((page) => {
										return <PageWrapper pr={1} mt={2} width={[4 / 4, 2 / 4, 1 / 4]}
															key={page.id}>
											<div key={page.id}>
												<Link className={"bp3-button bp3-minimal"}
													  to={page.fields.slug}>
													{page.frontmatter.title}
												</Link>
											</div>
										</PageWrapper>;
									})}
								</Flex>}
							</Box>
						</Flex>
					</FooterContainer>
				</FooterWrapper>;
			}}
		/>;
	}
}
