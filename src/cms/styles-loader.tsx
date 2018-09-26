import React from 'react';
import {StyleSheetManager} from 'styled-components';

const StylesLoader = ({children}: any) => {
    const iframe = document.querySelectorAll('iframe');

    if (!iframe || !iframe[0] || !iframe[0].contentDocument) {
        throw Error("I failed to locate the preview iframe for netlify CMS");
    }

    // @ts-ignore
    return <StyleSheetManager target={iframe[0].contentDocument.head}>
        {children}
    </StyleSheetManager>;
};

export default StylesLoader;