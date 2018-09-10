import React from 'react';
// @ts-ignore
import SP from 'scrollprogress';
import {debounce} from "lodash";
import styled from "styled-components";
import {Intent, ProgressBar} from "@blueprintjs/core";

interface State {
    progress: number;
    visible: boolean;
    scrollPerformed: boolean;
}

interface Props {
    identifier: string;
}

const ScrollProgressBar = styled(ProgressBar)`
    height: 5px;
    z-index: 999;
    position: fixed!important;
    border-radius: 0!important;
    left: 0;
    bottom: 0;
    height: 4px!important;
    background: transparent!important;
    display: ${(props: { scrollPerformed: boolean }) => props.scrollPerformed == true ? "block" : "none"}!important;

    .bp3-progress-meter {
        border-radius: 0!important;
    }
`;

export default class ScrollProgress extends React.Component<Props, State> {
    progressObserver: any;

    state = {
        progress: 0, visible: false, scrollPerformed: false
    };

    debounceVisibility = debounce(() => {
        this.setState({visible: false});
    }, 1000).bind(this);

    initObserver = () => {
        this.progressObserver = new SP((x: number, y: number) => {
            this.setState({
                progress: y,
                visible: true,
                scrollPerformed: true
            }, this.debounceVisibility);
        });
    };

    componentDidMount() {
        this.initObserver();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.identifier != this.props.identifier) {
            //  this is supposed to be a singleton and we just received a new identifier
            //  If we bootstrap our code inside `componentDidMount` we can experience
            //  unwanted behavior since only the first post seems to be calling `componentDidMount`
            //  while the rest are loaded via prefetch which does not call `componentDidMount` again
            //  and we're left with a progressbar that does not reflect the length of our current post
            //  so we're watching for a change in identifier and reset the state when that happens
            this.initObserver();
        }
    }

    componentWillUnmount() {
        this.progressObserver.destroy();
    }

    render() {
        return (
            <ScrollProgressBar
                stripes={false}
                animate={false}
                intent={Intent.SUCCESS}
                className={this.state.visible ? "inherit" : "fadeOut"}
                scrollPerformed={this.state.scrollPerformed}
                value={this.state.progress}
            />
        );
    }
}