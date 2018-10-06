import React from 'react';
import Immutable from "immutable";

import {cPatternWithId} from "../../utils/helpers";
import {encodeWidgetDataObject, decodeWidgetDataObject} from "../utils";

export interface FieldType {
	name: string;
	label: string;
	widget: string;
	default?: string;
	hint?: string;
	valueField?: string;
	collection?: string;
	searchFields?: string[];
	displayFields?: string[];
	required?: boolean;
	options?: string[];
	buttons?: string[];
	fields?: FieldType[];
}

export default function (id: string, label: string, fields: FieldType[]) {
	return {
		id, label, fields,

		pattern: cPatternWithId(id),

		fromBlock: (match: string[]) => {
			return Immutable.fromJS(decodeWidgetDataObject(match[1]));
		},

		toBlock: (obj: any) => {
			return JSON.stringify({
				widget: id,
				config: encodeWidgetDataObject(Immutable.fromJS(obj)),
			});
		},

		toPreview: (obj: any) => <div/>,
	}
}