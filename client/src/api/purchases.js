import axios from 'axios'

export const getPurchases = async (filters) => await axios.get(`purchases`, { params: filters })

export const getPurchase = async (purchase) => await axios.get(`purchases/${purchase}`)

export const createPurchase = async (purchase) => await axios.post('purchases', purchase)

export const updatePurchase = async (purchase) =>
    await axios.put(`purchases/${purchase._id}`, purchase)

export const deletePurchase = async (purchase) => await axios.delete(`purchases/${purchase}`)

export const purchasesSearch = async (search) => await axios.post('purchases/search', search)
