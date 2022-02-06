import React from 'react'
import { Box, Typography, Grid, Divider, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { MuiTextField, MuiSelectField, MuiCheckbox, MuiDatepicker } from 'components/common'
import PropTypes from 'prop-types'
import { MuiStyles } from 'theme'

const FormBuilder = ({
    title,
    formFields,
    submitButtonText,
    initialValues,
    validationSchema,
    handleSubmit,
}) => {
    const classes = MuiStyles()
    return (
        <Box p={2}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.pt3}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, values, handleChange, setFieldValue, handleSubmit }) => (
                            <Form>
                                <Grid container spacing={1}>
                                    {formFields.map(
                                        ({ label, size, options, name, component, ...rest }) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={size?.sm || 12}
                                                md={size?.md || 12}
                                                key={name}
                                            >
                                                {component === 'MuiTextField' && (
                                                    <MuiTextField
                                                        className={classes.mt2}
                                                        label={label}
                                                        value={values[name]}
                                                        errors={errors[name]}
                                                        onChange={handleChange}
                                                        name={name}
                                                        fullWidth
                                                        {...rest}
                                                    />
                                                )}
                                                {component === 'MuiSelectField' && (
                                                    <MuiSelectField
                                                        className={classes.mt2}
                                                        label={label}
                                                        handleChange={(e, selected) =>
                                                            setFieldValue(
                                                                name,
                                                                selected?.value || ''
                                                            )
                                                        }
                                                        defaultValue={values[name]}
                                                        name={name}
                                                        options={options}
                                                        {...rest}
                                                    />
                                                )}
                                                {component === 'MuiCheckBox' && (
                                                    <Box className={classes.pt2}>
                                                        <MuiCheckbox
                                                            label={label}
                                                            handleChange={(e, checked) => {
                                                                setFieldValue(name, checked)
                                                            }}
                                                            checked={values[name]}
                                                            name={name}
                                                            {...rest}
                                                        />
                                                    </Box>
                                                )}
                                                {component === 'MuiDatepicker' && (
                                                    <Box className={classes.pt2}>
                                                        <MuiDatepicker
                                                            label={label}
                                                            onChange={(date) => {
                                                                setFieldValue(name, date)
                                                            }}
                                                            name={name}
                                                            value={values[name]}
                                                            {...rest}
                                                        />
                                                    </Box>
                                                )}
                                            </Grid>
                                        )
                                    )}
                                </Grid>

                                <Button
                                    className={classes.mt2}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    {submitButtonText}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}

FormBuilder.propTypes = {
    title: PropTypes.string.isRequired,
    formFields: PropTypes.array.isRequired,
    validationSchema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    initialValues: PropTypes.object.isRequired,
}

FormBuilder.defaultProps = {
    submitButtonText: 'Submit',
}

export default FormBuilder
