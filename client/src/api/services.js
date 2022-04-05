import axios from 'axios'

export const getServices = async () => await axios.get('services')

export const getService = async (service) => await axios.get(`services/${service}`)

export const createService = async (service) => await axios.post('services', service)

export const updateService = async (service) => await axios.put(`services/${service._id}`, service)

export const deleteService = async (service) => await axios.delete(`services/${service}`)

export const servicesSearch = async (search) => await axios.post('services/search', search)
