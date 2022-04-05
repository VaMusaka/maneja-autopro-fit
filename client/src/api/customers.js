import axios from 'axios'

export const getCustomers = async () => await axios.get('customers')

export const getCustomer = async (customer) => await axios.get(`customers/${customer}`)

export const createCustomer = async (customer) => await axios.post('customers', customer)

export const updateCustomer = async (customer) =>
    await axios.put(`customers/${customer._id}`, customer)

export const deleteCustomer = async (customer) => await axios.delete(`customers/${customer}`)

export const customerSearch = async (search) => await axios.post('customers/search', search)
