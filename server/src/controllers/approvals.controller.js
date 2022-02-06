const { models, Types } = require('mongoose')
const { notFound, badRequest } = require('@hapi/boom')

const {ObjectId} = Types
const { Approval } = models

const getApprovals = async (req, res) => {
  const {date, department} = req.query
  const searchDate = date && new Date(date) || null

  try{
    const approvals = await Approval.getApprovals({date: searchDate, department})

    if(!approvals){
      const { output } = notFound()
      return res.status(output.statusCode).json(output)
    }

    return res.json(approvals)

  }catch(err){
    console.log(err)
    const { output } = badRequest()
    return res.status(output.statusCode).json(output)
  }
}

const getApproval = async (req, res) => {
  try{
    const approval = await Approval.getApproval(req.params.id)

    if(!approval){
      const { output } = notFound()
      return res.status(output.statusCode).json(output)
    }

    return res.json(approval)

  }catch(err){
    const { output } = badRequest()
    return res.status(output.statusCode).json(output)
  }
}

const updateApproval = async (req, res) => {
  try{
    const { id } = req.params
    const data = req.body
    await Approval.findByIdAndUpdate(id, {$set : data}, {new: true})

    const approval = await Approval.getApproval({_id: ObjectId(id)})


    if(!approval[0]){
      const { output } = notFound()
      return res.status(output.statusCode).json(output)
    }

    return res.json(approval[0])

  }catch(err){
    console.log(err)
    const { output } = badRequest()
    return res.status(output.statusCode).json(output)
  }
}


module.exports = {
  getApprovals, getApproval, updateApproval
}