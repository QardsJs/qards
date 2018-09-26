import base64 from "base-64";

export function encodeWidgetDataObject(data: object): string {
    return base64.encode(JSON.stringify(data));
}

export function decodeWidgetDataObject(data: string): any {
    return JSON.parse(base64.decode(data));
}
