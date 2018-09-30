import React from 'react';

import tinycolor from 'tinycolor2';
import styled from 'styled-components';

import theme from '../../theme';
import {getThemeConfig} from '../../utils/helpers';

const Wrapper = styled.div`
	.inner {
		max-width: ${theme.main.constraints.content.page.L};
		margin: 0 auto;
		padding: 0 20px;
	}
	
	&.dark {
		background: ${theme.color(['accent', 'background'])};
		color: ${theme.color(['accent', 'text'])};
		background-image: radial-gradient(ellipse at center -50%, ${tinycolor(theme.color(['accent', 'background'])).lighten(
	20).toString()} 0%,${theme.color(['accent', 'background'])} 56%,${getThemeConfig((['colors', 'accent', 'background']))} 100%);
		padding: 80px 0;
	}
`;

const Content = ({children, ...props}: any) => <Wrapper
	className={`content ${props.darkTheme ? 'dark' : ''}`} {...props}>
	<div className="inner">{children}</div>
</Wrapper>;

export default Content;
