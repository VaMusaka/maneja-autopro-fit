import { createTheme } from '@mui/material/styles'
import MuiPalette from './palette'
import MuiTypography from './typography'
import MuiOverrides from './overrides'
import MuiStyles from './styles'

const theme = createTheme({
    palette: MuiPalette,
    typography: MuiTypography,
    overrides: MuiOverrides,
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'h3',
                subtitle2: 'h5',
                body1: 'p',
                body2: 'span',
            },
        },
    },
    spacing: 8,
    shape: { borderRadius: 10 },
})

export { theme, MuiStyles }
