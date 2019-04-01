import React from 'react';
import {StyleSheetManager} from 'styled-components';

const StylesLoader = ({children}: any) => {
	const iframe = document.querySelectorAll('[class*="PreviewPaneFrame"]')[0];

	if (!iframe) {
		throw Error('Preview pane iframe was not found. Cms preview might not work as expected!');
	}

	// @ts-ignore
	return <StyleSheetManager target={iframe.contentDocument.head}>
		{children}
	</StyleSheetManager>;
};

export default StylesLoader;
