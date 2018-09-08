import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components'

import Footer from '../footer';
import Navbar from '../navbar';
import Content from './content';
import theme from "../../theme";

require('prismjs');

const LayoutWrapper = styled.div`
	margin: 0;
	padding: 0;
	/** This has to be the height of the footer!! **/
	min-height: calc(100vh - 90px)!important;
`;

interface Props {
    children: any;
}

class MainLayout extends React.Component<Props, any> {
    render() {
        const {children} = this.props;
        const brkp: any = theme.main.breakpoints;

        return <ThemeProvider
            theme={{
                space: [0, 6, 12, 18, 24],
                breakpoints: Object.keys(brkp).map((k: string) => {
                    return `${brkp[k]}em`
                })
            }}>
            <>
                <LayoutWrapper>
                    <Content style={{paddingTop: 40}}>
                        <Navbar/>
                    </Content>

                    {children}
                </LayoutWrapper>

                <Footer/>
            </>
        </ThemeProvider>
    }
}

export default MainLayout;
