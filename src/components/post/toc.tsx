import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../../theme';
import {div} from "grid-styled";

const Wrapper = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;

	li {
		padding: 7px 0 5px 0;

		&.active {
			a {
				color: ${theme.colors.accent};
				opacity: 1;
				-webkit-transition: color 300ms linear;
				-ms-transition: color 300ms linear;
				transition: color 300ms linear;
			}
		}

		&.parent {
			margin-top: 10px;
		}

		a {
			display: block;
			font-weight: 500;
			font-size: 1rem;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}

	ul {
		padding: 0 0 0 20px;
		margin: 0;
		list-style-type: none;

		a {
			opacity: 0.6;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}
`;

interface Props {

}

interface State {
	activeItemId?: string | null;
}

class Toc extends Component<Props, State> {
	render() {
		return <div>toc</div>
	}
}

export default Toc;
