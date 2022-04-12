const checkIsNumeric = {
    isNumeric: { option: { no_symbols: false, locale: 'en-GB' } },
    optional: { option: { nullable: true } }
}

const checkIsBoolean = {
    isBoolean: true,
    optional: { option: { nullable: true } },
    toBoolean: true
}

const checkIsPhone = (input) => {
    const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if((input.match(phoneRegEx))){
        return true
    }

    return false

}

module.exports = {
    checkIsBoolean,
    checkIsNumeric,
    checkIsPhone
}
