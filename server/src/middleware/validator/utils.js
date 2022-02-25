const checkIsNumeric = {
    isNumeric: { option: { no_symbols: true, locale: 'en-GB' } },
    optional: { option: { nullable: true } }
}

const checkIsBoolean = {
    isBoolean: true,
    optional: { option: { nullable: true } },
    toBoolean: true
}

module.exports = {
    checkIsBoolean,
    checkIsNumeric
}
