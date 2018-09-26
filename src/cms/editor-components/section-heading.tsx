import React from 'react';
import base from "./base";

export default base(
	'qards-section-heading', 'Section heading', [
		{
			name  : 'title',
			label : 'Title',
			widget: 'string'
		}, {
			name  : 'subtitle',
			label : 'Subtitle',
			widget: 'string'
		}, {
			name    : 'type',
			label   : 'Type',
			required: false,
			widget  : 'select',
			options : ["primary", "secondary"],
			//default : 'primary'
		},
	]
);