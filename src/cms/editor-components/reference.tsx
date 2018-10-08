import React from 'react';
import base from './base';

export default base(
	'qards-reference', 'Reference', [{
		label        : 'Post',
		//	DO not name this field `post` because you will
		//	overwrite the post props that qards receive
		name         : 'reference',
		widget       : 'relation',
		collection   : 'posts',
		searchFields : ['title', 'excerpt'],
		//	TODO: valueField should be id or slug here, using title
		//	is not reliable but NEtlify CMS doesn't seem to support
		//	this
		valueField   : 'title',
		displayFields: ['title'],
	}],
);