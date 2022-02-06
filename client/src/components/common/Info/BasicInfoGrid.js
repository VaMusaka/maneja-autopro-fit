import React from 'react'
import PropTypes from 'prop-types'
import BasicInfoRow from './BasicInfoRow'

const BasicInfoGrid = ({ data }) => (
    <>
        {data.map(({ title, info }) => (
            <BasicInfoRow title={title} info={info} key={title} />
        ))}
    </>
)

BasicInfoGrid.propTypes = {
    data: PropTypes.array,
}

export default BasicInfoGrid
