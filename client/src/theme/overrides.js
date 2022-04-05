const fontFamily = {
    russo: "'Russo One', sans-serif",
    fastOne: "'Faster One', cursive",
    nixieOne: "'Nixie One', cursive",
    textMeOne: "'Text Me One', sans-serif",
    quickSand: "'Quicksand', sans-serif",
}

const MuiOverrides = {
    MuiCssBaseline: {
        '@global': {
            body: {
                backgroundColor: '#cccccc',
            },
            html: {
                webkitFontSmoothing: 'auto',
            },
            '*': {
                'scrollbar-width': 'thin',
            },
            '*::-webkit-scrollbar': {
                width: '4px',
                height: '4px',
            },
        },
    },
    MuiTypography: {
        h2: {
            fontFamily: fontFamily.russo,
            fontWeight: 400,
        },
        h3: {
            fontFamily: fontFamily.russo,
            fontWeight: 400,
        },
        h4: {
            fontFamily: fontFamily.russo,
            fontWeight: 200,
        },
        h5: {
            color: '#7b88aa !important',
            fontFamily: fontFamily.russo,
            fontWeight: 400,
        },
        body1: {
            fontWeight: 300,
        },
        body2: {
            fontWeight: 300,
        },
    },
    MuiOutlinedInput: {
        root: {
            borderRadius: 20,
        },
    },
    MuiButton: {
        root: {
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 20,
        },
    },
}

export default MuiOverrides
