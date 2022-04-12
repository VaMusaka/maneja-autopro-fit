import { alpha } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { makeMiscHelpers } from './helpers'

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: 67,
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(3),
            borderRadius: theme.spacing(2),
            top: theme.spacing(1),
        },
    },
    styledDrawer: {
        top: '80px !important',
        paddingBottom: 100,
        height: 'calc(100% - 100px) !important',
        right: theme.spacing(2),
        borderRadius: theme.spacing(2),
    },
    styledMenuBar: {
        [theme.breakpoints.up('md')]: {
            borderTopLeftRadius: theme.spacing(2),
            borderTopRightRadius: theme.spacing(2),
            left: theme.spacing(3),
            top: theme.spacing(1),
            border: `solid ${theme.palette.primary.main} !important `,
        },
    },
    styledSelectedMenuItem: {
        backgroundColor: '#F4F4F5 !important',
        borderTopLeftRadius: theme.spacing(5),
        borderBottomLeftRadius: theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        fontWeight: 900,
    },
    layoutContainer: {
        marginTop: theme.spacing(2) * 4,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
            width: 'auto',
        },
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    rounded: {
        borderRadius: theme.spacing(2),
    },
    logoText: {
        fontFamily: "'Faster One', cursive !important",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    /// PRODUCTS
    productPageContainer: {
        marginTop: 100,
        padding: theme.spacing(2),
    },
    productGalleryContainer: {
        [theme.breakpoints.up('sm')]: {
            height: 510,
        },
        [theme.breakpoints.down('sm')]: {
            height: 280,
        },
    },
    productDescriptionContainer: {
        overflowY: 'scroll',
        height: 160,
    },
    productTitleContainer: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxHeight: 50,
    },
    hoverOverlay: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
    },
    rowCenterContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnCenterContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLeftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
    },

    ...makeMiscHelpers(theme),
}))

export default useStyles
