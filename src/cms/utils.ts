import {Base64} from 'js-base64';

export function encodeWidgetDataObject(data: object): string {
	return Base64.encode(JSON.stringify(data));
}

export function decodeWidgetDataObject(data: string): any {
	return JSON.parse(Base64.decode(data));
}
