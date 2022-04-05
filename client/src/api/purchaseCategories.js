import axios from 'axios'

export const getPurchaseCategories = async () => await axios.get('purchase-categories')

export const getPurchaseCategory = async (purchaseCategory) =>
    await axios.get(`purchase-categories/${purchaseCategory}`)

export const createPurchaseCategory = async (purchaseCategory) =>
    await axios.post('purchase-categories', purchaseCategory)

export const updatePurchaseCategory = async (purchaseCategory) =>
    await axios.put(`purchase-categories/${purchaseCategory._id}`, purchaseCategory)

export const deletePurchaseCategory = async (purchaseCategory) =>
    await axios.delete(`purchase-categories/${purchaseCategory}`)

export const purchaseCategoriesSearch = async (search) =>
    await axios.post('purchase-categories/search', search)
