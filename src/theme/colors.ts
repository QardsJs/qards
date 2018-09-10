import {Colors} from '@blueprintjs/core';

import tinycolor from "tinycolor2";

const primary = '#1A2835';
const success = '#3DCC91';
const warning = 'orange';
const danger = 'red';

export default {
    // the color to be used as main (navbar and such)
    primary: primary,
    // text that should be used over a primary background
    bgPrimaryText: Colors.WHITE,
    bgPrimaryBorder: tinycolor(primary).lighten(20).toString(),
    // secondary color that plays well with the
    // primary color and should be a deviant of it
    secondary: Colors.GRAY5,
    // accent color that draws attention and is somewhat
    // opposed to primary and secondary
    accent: tinycolor("#6FC7B5").darken(15).toString(),
    // used for backgrounds and STUFF
    faded: tinycolor(primary).lighten(80).toString(),
    // text color
    text: 'black',
    // text color used for secondary content
    lightText: tinycolor('#94A4B0').darken(20).toString(),

    borderColor: Colors.LIGHT_GRAY3,

    intents: {
        //  these must match with the colors set in the sass vars file!!
        success: {
            color: success,
            background: tinycolor(success).lighten(39).toString()
        },
        warning: {
            color: warning,
            background: tinycolor(warning).lighten(40).toString()
        },
        danger: {
            color: danger,
            background: tinycolor(danger).lighten(40).toString()
        },
    }
};

export const dark = {};
