import {Base64} from '../utils/helpers';

export function encodeWidgetDataObject(data: object): string {
	return Base64.encode(JSON.stringify(data));
}

export function decodeWidgetDataObject(data: string): any {
	return JSON.parse(Base64.decode(data));
}
