import React from "react";
import base from "./base";

export default base(
	'qards-reference', 'Reference', [{
		label: 'Display style',
		name: 'displayStyle',
		widget: 'select',
		options: ["default", "minimal", "compact"],
		//default: "default"
	},{
		label: "Post(s)",
		name: "posts",
		widget: "list",
		fields: [{
			label: "Post",
			name: "post",
			widget: "relation",
			collection: "posts",
			searchFields: ["title", "excerpt"],
			//	TODO: valueField should be id or slug here, using title
			//	is not reliable but NEtlify CMS doesn't seem to support
			//	this
			valueField: "title",
			displayFields: ["title"]
		}]
	}]
);