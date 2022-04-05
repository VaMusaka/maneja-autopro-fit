const express = require('express');
const jwtAuth = require('../../middleware/auth/jwtAuth')

const {approvalsValidationSchema} = require('../../middleware/validator/approvals.validator')

const {
  getApproval,
  getApprovals,
  updateApproval
} = require('../../controllers/approvals.controller')

const router = express.Router()

router.get('/', [jwtAuth], getApprovals)
router.get('/:id', [jwtAuth], getApproval)
router.patch('/:id', [jwtAuth, approvalsValidationSchema], updateApproval)

module.exports = router