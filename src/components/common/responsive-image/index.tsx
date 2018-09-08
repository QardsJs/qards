import React, {Component} from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
	padding-top: ${(props: StyleProps) => props.paddingTop != null ? props.paddingTop : 56.25}%;
	background-size: ${(props: StyleProps) => props.backgroundSize || 'cover'};
	background-color: transparent;
	background-repeat: no-repeat;
`;

interface StyleProps {
    backgroundSize?: string;
    paddingTop?: number;
}

interface Props {
    source: string;
    paddingTop?: number;
    backgroundSize?: string;
}

export default class ResponsiveImage extends Component<Props, any> {
    render() {
        const {source, ...props} = this.props;

        return (
            <Wrapper className="responsive-img" {...props}
                style={{backgroundImage: `url(${source})`}}
            />
        );
    }
}
