import React from 'react';
import base from "./base";

export default base(
    'qards-video', 'Video', [{
        name: 'url',
        label: 'Url',
        widget: 'string',
    }]
);