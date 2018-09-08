import React, {Component} from 'react';

import {Box, Flex} from "grid-styled";
import styled from 'styled-components';

import theme from "../../../theme";

const HeadingsWrapper = styled.div`
	text-align: center;
	
	@media screen and (max-width: ${theme.main.breakpoints.medium}em) {
        margin-bottom: 40px;
    }

	h2 {
		line-height: 1.6;
	}
`;

interface Props {
    title: string;
    subtitle: string;
}

export default class Heading extends Component<Props, any> {
    render() {
        return (
            <>
                <Flex flexWrap={"wrap"}>
                    <Box width={[0 / 6, 0 / 6, 0 / 6, 1 / 6]} px={2}/>
                    <Box width={[6 / 6, 6 / 6, 6 / 6, 4 / 6]} px={2}>
                        <HeadingsWrapper>
                            <h1>{this.props.title}</h1>
                            <h2>{this.props.subtitle}</h2>
                        </HeadingsWrapper>
                    </Box>
                    <Box width={[0 / 6, 0 / 6, 0 / 6, 1 / 6]} px={2}/>
                </Flex>
            </>
        );
    }
}
