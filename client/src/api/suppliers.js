import axios from 'axios'

export const getSuppliers = async () => await axios.get('suppliers')

export const getSupplier = async (supplier) => await axios.get(`suppliers/${supplier}`)

export const createSupplier = async (supplier) => await axios.post('suppliers', supplier)

export const updateSupplier = async (supplier) =>
    await axios.put(`suppliers/${supplier._id}`, supplier)

export const deleteSupplier = async (supplier) => await axios.delete(`suppliers/${supplier}`)

export const suppliersSearch = async (search) => await axios.post('suppliers/search', search)
