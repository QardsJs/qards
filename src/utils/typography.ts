import Typography from "typography";

const typography = new Typography({
    baseFontSize: "16px",
    baseLineHeight: 1,
    omitGoogleFont: true,
    headerFontFamily: [
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
    bodyFontFamily: ["Roboto", "arial", "serif"],
});

export default typography;