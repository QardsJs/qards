import React from "react";
import base from "./base";

export default base(
    'qards-divider', 'Divider', [
        {
            name: 'type',
            label: 'Type',
            widget: 'select',
            options: ["bullets", "line"],
            //default: "bullets"
        }
    ]
);