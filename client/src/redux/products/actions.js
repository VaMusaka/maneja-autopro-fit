import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productsSearch,
} from 'api/products'
import { toast } from 'react-toastify'
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    SET_PRODUCTS_LOADING,
    SET_PRODUCTS_ERRORS,
    UPDATE_PRODUCT_LAYOUT,
} from './types'

export const setProductsLoadingAction = () => (dispatch) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true })
}

export const setProductsErrorsAction = (errors) => (dispatch) => {
    dispatch({ type: SET_PRODUCTS_ERRORS, payload: errors })
}

export const getProductsAction = () => async (dispatch) => {
    dispatch(setProductsLoadingAction())
    try {
        const { data } = await getProducts()
        dispatch({ type: GET_PRODUCTS, payload: data })
    } catch (error) {
        toast.error('Error getting products')
        dispatch(setProductsErrorsAction(error))
    }
}

export const getProductAction = (purchase) => async (dispatch) => {
    dispatch(setProductsLoadingAction())
    try {
        const { data } = await getProduct(purchase)
        dispatch({ type: GET_PRODUCT, payload: data })
    } catch (error) {
        toast.error('Error getting product')
        dispatch(setProductsErrorsAction(error))
    }
}

export const createProductAction = (purchase) => async (dispatch, getState) => {
    dispatch(setProductsLoadingAction())
    try {
        const { data } = await createProduct(purchase)
        const { products, layout } = getState().PRODUCTS

        products.push(data)

        dispatch({ type: GET_PRODUCTS, payload: products })
        dispatch({
            type: UPDATE_PRODUCT_LAYOUT,
            payload: { ...layout, openCreateDrawer: false },
        })
        toast.success('Product created successfully')
    } catch (error) {
        toast.error('Error creating product')
        dispatch(setProductsErrorsAction(error))
    }
}

export const updateProductAction = (purchase) => async (dispatch, getState) => {
    dispatch(setProductsLoadingAction())
    try {
        const { data } = await updateProduct(purchase)
        const { products } = getState().PRODUCTS

        const updatedProducts = products.map((purchase) =>
            purchase._id === data._id ? data : purchase
        )

        dispatch({
            type: GET_PRODUCTS,
            payload: updatedProducts,
        })
    } catch (error) {
        toast.error('Error getting product')
        dispatch(setProductsErrorsAction(error))
    }
}

export const deleteProductAction = (product) => async (dispatch, getState) => {
    dispatch(setProductsLoadingAction())
    try {
        await deleteProduct(product)

        const { products } = getState().PRODUCTS

        const updatedProducts = products.filter(({ _id }) => _id !== product)

        dispatch({
            type: GET_PRODUCTS,
            payload: updatedProducts,
        })
    } catch (error) {
        toast.error('Error getting product')
        dispatch(setProductsErrorsAction(error))
    }
}

export const searchProductsAction = (search) => async (dispatch) => {
    dispatch(setProductsLoadingAction())
    try {
        const { data } = await productsSearch(search)
        dispatch({ type: GET_PRODUCTS, payload: data })
    } catch (error) {
        toast.error('Error searching for Products')
        dispatch(setProductsErrorsAction(error))
    }
}
