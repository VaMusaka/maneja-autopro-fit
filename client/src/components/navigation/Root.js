import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { authSelector } from 'redux/selectors'
import { useSelector } from 'react-redux'
import { FullPageLoading } from 'components/common'

const Root = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { loading } = useSelector(authSelector)

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    if (isLoading) {
        return <FullPageLoading />
    }

    return <div>{children}</div>
}

Root.propTypes = {
    children: PropTypes.any,
}

export default Root
