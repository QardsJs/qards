import React from 'react';
import base from "./base";

export default base('qards-reveal', 'Reveal', [{
	name  : 'items',
	label : 'Items',
	widget: 'list',
	fields: [{
		name  : 'title',
		label : 'Title',
		widget: 'string',
	}, {
		name   : 'content',
		label  : 'Content',
		widget : 'markdown',
		buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"]
	}]
}]);