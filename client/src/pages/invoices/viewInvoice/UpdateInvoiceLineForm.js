import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiTextField, MuiSelectField, MuiCheckbox } from 'components/common'
import { getInvoiceDepartment } from '../constants'
import { useDispatch } from 'react-redux'
import { InvoiceLineSchema } from 'utils/validation'
import { Formik, Form } from 'formik'
import { MuiStyles } from 'theme'
import clsx from 'clsx'

import PropTypes from 'prop-types'
import { makeServiceSelectionOptions } from 'utils'
import { updateInvoiceLineAction } from 'redux/invoices/actions'

const UpdateInvoiceLineForm = ({ invoice, invoiceLines, services, initialValues }) => {
    const [department, setDepartment] = useState(null)
    const [loading, setLoading] = useState(true)
    const [vatDisabled, setVatDisabled] = useState(true)

    const dispatch = useDispatch()
    const classes = MuiStyles()

    useEffect(() => {
        setDepartment(getInvoiceDepartment(invoice))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setVatDisabled(canNotChangeVat())
        setLoading(false)
        // eslint-disable-next-line
    }, [department])

    const canNotChangeVat = () => {
        if (invoice?.customer?.highValue) {
            return true
        }

        return department?.invoicesVatExempt
    }

    if (loading) {
        return ''
    }

    const handleUpdateInvoiceLines = (values) => {
        const lines = invoiceLines?.map((line) => {
            if (line?._id === values?._id) {
                delete values._id
                values.charged = parseInt(values.charged)
                return values
            }

            line.service = line?.service?._id
            delete line._id
            return line
        })

        dispatch(updateInvoiceLineAction({ _id: invoice?._id, lines }))
    }

    return (
        <Box p={2}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">New Invoice Line</Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.pt3, classes.pb2)}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={InvoiceLineSchema}
                        onSubmit={handleUpdateInvoiceLines}
                    >
                        {({ errors, values, handleChange, setFieldValue, handleSubmit }) => (
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <MuiSelectField
                                            label={'Service'}
                                            name={'service'}
                                            defaultValue={values['service']}
                                            handleChange={(e, selected) =>
                                                setFieldValue('service', selected?.value || '')
                                            }
                                            fullWidth
                                            options={makeServiceSelectionOptions(services)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiTextField
                                            className={classes.mt2}
                                            label={'Description'}
                                            value={values['description']}
                                            errors={errors['description']}
                                            onChange={handleChange}
                                            name={'description'}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiTextField
                                            className={classes.mt2}
                                            label={'Amount Charged'}
                                            value={values['charged']}
                                            errors={errors['charged']}
                                            onChange={handleChange}
                                            name={'charged'}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiCheckbox
                                            label={'Add Vat (20%)'}
                                            handleChange={(e, checked) => {
                                                setFieldValue('addVat', checked)
                                            }}
                                            name={'addVat'}
                                            checked={values['addVat']}
                                            errors={errors['addVat']}
                                            disabled={vatDisabled}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    className={classes.mt2}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Update Invoice Line
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}
UpdateInvoiceLineForm.propTypes = {
    invoice: PropTypes.object.isRequired,
    services: PropTypes.array,
    invoiceLines: PropTypes.array,
    initialValues: PropTypes.object,
}

export default UpdateInvoiceLineForm
