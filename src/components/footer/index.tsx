import * as React from 'react';
import {graphql, Link, StaticQuery} from "gatsby";
import {Box, Flex} from "grid-styled";
import {CreditsContainer, FooterContainer, FooterWrapper, PageWrapper} from "./styles";
import {Page as PageProps} from "../../templates/types";

interface DataProps {
    pages: {
        edges: {
            node: PageProps
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
                    pages: allContentfulPages {
                        edges {
                            node {
                                id
                                url
                                title
                            }
                        }
                    }
                }
            `}

            render={(data: DataProps) => {

                const pages: PageProps[] = [];
                for (let i = 0; i < data.pages.edges.length; i++) {
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
                                {pages && <Flex flexWrap={"wrap"} justifyContent={'flex-end'}>
                                    {pages.map((page) => {
                                        return <PageWrapper pr={1} mt={2} width={[4 / 4, 2 / 4, 1 / 4]} key={page.id}>
                                            {!page.url.startsWith('http') && <Link to={page.url}>
                                                {page.title}
											</Link>}

                                            {page.url.startsWith('http') &&
											<a target={'_blank'} href={page.url} rel={"noopener"}>
                                                {page.title}
											</a>}
                                        </PageWrapper>
                                    })}
								</Flex>}
                            </Box>
                        </Flex>
                    </FooterContainer>
                </FooterWrapper>
            }}
        />;
    }
}
