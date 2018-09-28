import React from 'react';
import base from "./base";

export default base(
    'qards-audio', 'Audio', [{
        name: 'items',
        label: 'Items',
        widget: 'list',
        fields: [{
            name: 'title',
            label: 'Title',
            widget: 'string',
        }, {
            name: 'subtitle',
            label: 'Subtitle',
            widget: 'string',
        }, {
            name: 'url',
            label: 'Url',
            widget: 'string',
        }, {
            name: 'poster',
            label: 'Poster',
            widget: 'image',
            required: false
        }]
    }]
);