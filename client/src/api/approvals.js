import axios from 'axios'

export const getApprovals = async (filter) => await axios.get(`/approvals`, { params: filter })
export const getApproval = async (approval) => await axios.get(`/approvals/${approval}`)
export const updateApproval = async (approval) =>
    await axios.patch(`/approvals/${approval.id}`, approval)
