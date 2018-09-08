import React from 'react';
import {Box} from "grid-styled";

import {Title, SubTitle} from "./styles";

interface Props {
    title: string;
    subtitle?: string;
}

class PageTitle extends React.Component<Props, any> {
    render() {
        const {title, subtitle} = this.props;

        return <Box mt={[60, 60, 60, 120]} mb={[60, 60, 60, 120]}>
            <Title>{title}</Title>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </Box>
    }
}

export default PageTitle;