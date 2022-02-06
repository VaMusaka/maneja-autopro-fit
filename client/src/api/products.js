import axios from 'axios'

export const getProducts = async () => await axios.get('products')

export const getProduct = async (product) => await axios.get(`products/${product}`)

export const createProduct = async (product) => await axios.post('products', product)

export const updateProduct = async (product) => await axios.put(`products/${product._id}`, product)

export const deleteProduct = async (product) => await axios.delete(`products/${product}`)

export const productsSearch = async (search) => await axios.post('products/search', search)
