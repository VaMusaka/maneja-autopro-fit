import axios from 'axios'
import { signOutUserAction } from 'redux/authentication/actions'

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const setAxiosDefaults = () => {
    axios.defaults.baseURL = 'api/'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
}

export const setAxiosInterceptors = (dispatch) => {
    // Add a response interceptor
    axios.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response
        },
        function (error) {
            if (error?.response?.status === 401) {
                dispatch(signOutUserAction())
                window.location.href = '/#/sign-in'
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error)
        }
    )
}

export const reduceToTotal = (data, field, subField = null) => {
    if (subField) {
        return (
            data?.reduce((n, object) => {
                if (object[field]) {
                    return n + object[field][subField]
                }

                return n
            }, 0) || 0
        )
    }
    return data?.reduce((n, object) => n + object[field], 0) || 0
}

const intString = (value) => {
    if (typeof parseInt(value) !== 'number' || !value) {
        return '0'
    }

    if (value < 999) {
        return value
    }

    var suffixes = ['', ' K', ' M', ' N', ' T']
    var suffixNum = Math.floor(('' + value.toFixed(0)).length / 3)
    var shortValue = parseFloat(
        (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
    )
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1)
    }
    return shortValue + suffixes[suffixNum]
}

export const intToString = (value) => {
    return intString(value)
}

export const getShortMonth = (month) => {
    const monthsShort = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    return monthsShort[month - 1]
}

export const getChartHeight = (height, title = false, footer = false) => {
    let chartHeight = height
    if (footer) {
        chartHeight = chartHeight - 40
    }
    if (title) {
        chartHeight = chartHeight - 40
    }

    return chartHeight
}

export const getInfoGridCustomerDetails = (customer) => {
    return [
        { title: 'Email', info: customer.email },
        { title: 'Phone', info: customer.phone },
        {
            title: 'Location',
            info: `
            ${customer?.addessLine1 || ''} 
            ${customer?.addessLine2 || ''}
            ${customer?.town || ''} \n 
            ${customer.postalCode || ''}`,
        },
        { title: 'Account Type', info: customer.customerType },
        {
            title: 'Is Credit Account',
            info: customer.creditAccount ? 'Yes' : 'No',
        },
        { title: 'Payment Terms', info: customer.paymentTerms },
        {
            title: 'Account Status',
            info: customer.active ? 'Active' : 'In Active',
        },
        {
            title: 'High Value Customer',
            info: customer.highValue ? 'Yes' : 'No',
        },
    ]
}

export const invoiceIsPaidInFull = ({ payments, balancePayable }) => {
    const isPaidInFull = !payments.paidInFull || balancePayable > 0

    return !isPaidInFull
}

export const invoiceAmountPaid = ({ payments }) => {
    const amountPaid = payments.card + payments.cash + payments.cheque
    return amountPaid || 0
}

export const toggleCreateDrawer = (dispatch, layout, type, open) => {
    return dispatch({
        type,
        payload: { ...layout, openCreateDrawer: open },
    })
}

export const makeCustomerSelectOptions = (customers) => {
    if (!customers) {
        return []
    }

    return customers.map(({ _id, name, email }) => {
        return { value: _id, label: `${name} - ${email}` }
    })
}

export const makeServiceSelectionOptions = (services) => {
    if (!services) {
        return [
            {
                label: 'Select One',
                value: '-',
            },
        ]
    }

    return services.map(({ _id, title }) => {
        return { value: _id, label: title }
    })
}

export const makeDropDownOptions = (data, labelField, valueField) => {
    if (!data) {
        return [
            {
                label: 'Select One',
                value: '-',
            },
        ]
    }

    return data.map((item) => {
        return { value: item[valueField], label: item[labelField] }
    })
}

export const isUkPhone = (phone) => {
    const regEx = /^0([1-6][0-9]{8,10}|7[0-9]{9})$/
    return phone.match(regEx)
}

export const formatNumber = (number, decimals = 0, toString = false) => {
    if (!number) {
        return 0
    }

    let formatted
    if (toString) {
        formatted = intString(number)
    } else {
        const toFormat = number && number.toFixed(decimals)
        formatted = new Intl.NumberFormat('en-GB').format(toFormat)
    }
    return formatted
}

export const openTab = (location) => {
    // eslint-disable-next-line no-undef
    const win = window.open(location, '_blank')
    win.focus()
}

export function getBase64FromUrl(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL(outputFormat || 'image/png')
        callback(dataURL)
        // Clean up
        canvas = null
    }
    img.src = url
}

export const makeQueryString = (filters) => {
    return Object.keys(filters)
        .map((key) => key + '=' + filters[key])
        .join('&')
}
