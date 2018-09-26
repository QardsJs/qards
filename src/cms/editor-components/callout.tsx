import React from "react";
import base from "./base";

export default base(
    'qards-callout', 'Callout', [
        {
            name: 'title',
            label: 'Title',
            widget: 'string'
        },
        {
            name: 'intent',
            label: 'Intent',
            widget: 'select',
            options: [
                "primary",
                "success",
                "warning",
                "danger"
            ]
        },
        {
            name: 'message',
            label: 'Message',
            widget: 'markdown',
            buttons: [
                "bold",
                "italic",
                "link",
                "bulleted-list",
                "numbered-list"
            ]
        },
    ]
);