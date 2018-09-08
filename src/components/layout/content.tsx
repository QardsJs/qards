import React from 'react';

import styled from 'styled-components';

import theme from '../../theme';

const Wrapper = styled.div`
	max-width: ${theme.main.constraints.content.page.L};
	margin: 0 auto;
	padding: 0 20px;
`;

const Content = ({children, ...props}: any) => <Wrapper className="content" {...props}>{children}</Wrapper>;

export default Content;
