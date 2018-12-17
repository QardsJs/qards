import React from 'react';
import {Box} from '@rebass/grid';

import {Title, SubTitle} from "./styles";

interface Props {
    title: string;
    subtitle?: string;
}

class PageTitle extends React.Component<Props, any> {
    render() {
        const {title, subtitle} = this.props;

        return <Box mt={[30, 30, 30, 60]} mb={[30, 30, 30, 60]}>
            <Title>{title}</Title>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </Box>
    }
}

export default PageTitle;
