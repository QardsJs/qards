import styled from 'styled-components';

import theme from "../../../theme";

export const breakpoints: any = {
    small: `@media screen and (max-width: ${theme.main.breakpoints.small}em)`,
    xsmall: `@media screen and (min-width: ${theme.main.breakpoints.small}em) and (max-width: ${theme.main.breakpoints.xsmall}em)`,
    medium: `@media screen and (min-width: ${theme.main.breakpoints.xsmall}em) and (max-width: ${theme.main.breakpoints.medium}em)`,
    large: `@media screen and (min-width: ${theme.main.breakpoints.medium}em) and (max-width: ${theme.main.breakpoints.large}em)`,
    larger: `@media screen and (min-width: ${theme.main.breakpoints.large}em) and (max-width: ${theme.main.breakpoints.xlarge}em)`,
    xlarge: `@media screen and (min-width: ${theme.main.breakpoints.xlarge}em)`,
};

export const hidden = (key: string) => (props: any) => {
    const k: string = breakpoints[key];

    return props[key]
        ? {
            [k]: {
                display: 'none',
            },
        }
        : null;
};

export const small = hidden('small');
export const xsmall = hidden('xsmall');
export const medium = hidden('medium');
export const large = hidden('large');
export const larger = hidden('larger');
export const xlarge = hidden('xlarge');

// @ts-ignore
const Hide = styled.div([], small, xsmall, medium, large, larger, xlarge);

export default Hide;
