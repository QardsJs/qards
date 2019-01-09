import React from 'react';

import {PostType} from '../../fragments/post';

export interface QardProps {
	//  some items do not work well on preview mode
	//  (netlify-cms) and this flag is to indicate if
	//  we're in such mode. The components should watch
	//  this flag and disable functionalities based on
	//  its value
	preview?: boolean;
	renderStatic?: boolean;
	post?: PostType;
}

export interface QardState {

}

export default class QardBase<T extends QardProps, S extends QardState> extends React.Component<T, S> {
	//  Place inside the callback code that should not be
	//  available during preview mode (netlify-cms) or other
	//  places where the full functionality of the widget
	//  might not work (iframes etc)
	notAvailableInPreview(cb: any) {
		if (this.props.preview) {
			alert('This functionality is not available in preview mode');
		} else {
			cb();
		}
	}
}
