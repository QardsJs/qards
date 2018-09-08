import colors from './colors';

export default {
    colors: colors, //	or colors.dark
    main: {
        breakpoints: {
            //  these are em values not pixels
            small: 40,
            xsmall: 52,
            medium: 64,
            large: 75,
            xlarge: 88,
        },
        constraints: {
            content: {
                page: {
                    S: '100%',
                    M: '100%',
                    L: '1200px',
                },
                post: {
                    S: '100%',
                    M: '100%',
                    L: '800px',
                },
            },
        },
    },
};
