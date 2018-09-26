import React from "react";
import base from "./base";

export default base('qards-gallery', 'Gallery', [{
	name  : 'items',
	label : 'Images',
	widget: 'list',
	fields: [
		{name: 'alt', label: 'Alt', widget: 'string'},
		{name: 'src', label: 'Image', widget: 'image'},
	],
},]);