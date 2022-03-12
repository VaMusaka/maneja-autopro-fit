import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { MuiTextField, MuiSelectField, MuiCheckbox } from 'components/common'
import { getInvoiceDepartment } from '../constants'
import { useDispatch } from 'react-redux'
import { createInvoiceLineAction } from 'redux/invoices/actions'
import { InvoiceLineSchema } from 'utils/validation'
import { Formik, Form } from 'formik'
import { MuiStyles } from 'theme'
import clsx from 'clsx'

import PropTypes from 'prop-types'
import { makeServiceSelectionOptions } from 'utils'

const InvoiceLineForm = ({ invoice, services }) => {
    const [department, setDepartment] = useState(null)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const classes = MuiStyles()

    useEffect(() => {
        setDepartment(getInvoiceDepartment(invoice))
        setLoading(false)
        // eslint-disable-next-line
    }, [])

    const hasVat = () => {
        if (department?.invoicesVatExempt) {
            return false
        }

        return invoice?.customer?.highValue
    }

    const canNotChangeVat = () => {
        if (invoice?.customer?.highValue) {
            return true
        }

        return department?.invoicesVatExempt
    }

    if (loading) {
        return ''
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
                        initialValues={{
                            _id: invoice._id,
                            service: '',
                            charged: '',
                            description: '',
                            addVat: hasVat(),
                        }}
                        validationSchema={InvoiceLineSchema}
                        onSubmit={(values) => dispatch(createInvoiceLineAction(values))}
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
                                            checked={values.addVat}
                                            errors={errors.addVat}
                                            disabled={canNotChangeVat}
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
                                    Create Invoice Line
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}
InvoiceLineForm.propTypes = {
    invoice: PropTypes.object.isRequired,
    services: PropTypes.array,
}

export default InvoiceLineForm
