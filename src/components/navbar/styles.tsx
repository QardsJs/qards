import styled from 'styled-components';
import {Navbar, NavbarGroup} from '@blueprintjs/core';

import theme from '../../theme';
import {getThemeConfig} from '../../utils/helpers';

export const StyledNavbar = styled(Navbar)`
	border: none;
	padding: 0 !important;
	box-shadow: none !important;
	background: transparent !important;
	height: auto;

	a[role='button'],
	button {
		&:focus {
			outline: none;
		}
	}
`;

export const SearchInput = styled.input`
	width: 100%;
`;

export const Container = styled.div`
	display: flex;
`;

export const StyledNavbarGroupLeft = styled(NavbarGroup)`
	flex: 1;
	margin-right: 10px;
`;

export const DrawerLinkList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	
	li {
    
	    a {
	        display: block;
	        padding: 10px 25px;
            font-size: 1.4em;
            text-decoration: none;
            
            
            &:hover {
                text-decoration: none;
                background: ${theme.color(['faded', 'background'])};
            }
	    }
	}
`;

export const DrawerSearch = styled.div`
    padding: 20px 32px 30px 12px;
`;

export const DrawerWrapper = styled.div`
    background: white!important;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const DrawerSection = styled.div`
    margin-bottom: 30px;
`;
