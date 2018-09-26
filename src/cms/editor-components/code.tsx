import React from "react";
import base from "./base";

export default base(
    'qards-code', 'Code', [{
        name: 'language',
        label: 'Language',
        widget: 'string',
        required: false
    }, {
        name: 'code',
        label: 'Code',
        widget: 'text',
    }]
);