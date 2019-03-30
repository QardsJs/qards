import React from 'react';
import base from './base';

export default base(
	'qards-section-heading', 'Section heading', [{
		name  : 'title',
		label : 'Title',
		widget: 'string',
	}, {
		name  : 'subtitle',
		label : 'Subtitle',
		widget: 'string',
	}, {
		name    : 'type',
		label   : 'Type',
		//	required otherwise the toc will not render ok for
		//	section headings without a type specified. A regular
		//	h2 can be generated directly from markdown if that is
		//	the case. This component is for TOC-present headings
		required: true,
		widget  : 'select',
		options : ['primary', 'secondary'],
		default : 'primary',
	}],
);
