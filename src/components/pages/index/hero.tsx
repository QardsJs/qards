import React, {Component} from "react";
import styled from "styled-components";
import {HTMLDivProps} from "@blueprintjs/core/src/common/props";

const Wrapper = styled.div``;
const HeroTitle = styled.h1``;
const HeroSubTitle = styled.h2``;

interface Props {

}

interface State {

}

export default class HomepageHero extends Component<Props & HTMLDivProps, State> {
    render() {
        const {...props} = this.props;

        return (
            <Wrapper {...props}>
                <HeroTitle>A blogging platform for professionals</HeroTitle>
                <HeroSubTitle>
                    Qards is a blogging platform focused on performance and on closing the gap
                    between content publishers and developers
                </HeroSubTitle>
            </Wrapper>
        );
    }
}