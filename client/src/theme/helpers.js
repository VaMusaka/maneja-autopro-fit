const makeMiscHelpers = (theme) => {
    const miscHelpers = {}

    // eslint-disable-next-line array-callback-return
    // eslint-disable-next-line no-plusplus
    for (let key = 1; key < 10; key++) {
        // MAKE PADDING
        miscHelpers[`p${key}`] = { padding: theme.spacing(key) }
        miscHelpers[`pt${key}`] = { paddingTop: theme.spacing(key) }
        miscHelpers[`pb${key}`] = { paddingBottom: theme.spacing(key) }
        miscHelpers[`pl${key}`] = { paddingLeft: theme.spacing(key) }
        miscHelpers[`pr${key}`] = { paddingRight: theme.spacing(key) }
        miscHelpers[`pv${key}`] = {
            paddingTop: theme.spacing(key),
            paddingBottom: theme.spacing(key),
        }
        miscHelpers[`ph${key}`] = {
            paddingRight: theme.spacing(key),
            paddingLeft: theme.spacing(key),
        }

        // MAKE FONT_WEIGHT
        miscHelpers[`fw${key}`] = { fontWeight: key * 100 }

        //
        miscHelpers[`fs${key}`] = { fontSize: `${key * 10}px !important` }

        // MAKE MARGIN
        miscHelpers[`m${key}`] = { margin: theme.spacing(key) }
        miscHelpers[`mt${key}`] = { marginTop: theme.spacing(key) }
        miscHelpers[`mb${key}`] = { marginBottom: theme.spacing(key) }
        miscHelpers[`ml${key}`] = { marginLeft: theme.spacing(key) }
        miscHelpers[`mr${key}`] = { marginRight: theme.spacing(key) }
    }

    return miscHelpers
}

export { makeMiscHelpers }
