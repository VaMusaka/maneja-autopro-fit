const express = require('express')
const {createUser, updateUser, getUser, getUsers, deleteUser} = require('../../controllers/users.controller')
const {
    validateCreateUser,
    updateUserValidationSchema
} = require( '../../middleware/validator/user.validator')

const jwtAuth = require('../../middleware/auth/jwtAuth')

const router = express.Router()

router.get('/', jwtAuth, getUsers)
router.get('/:id', jwtAuth, getUser)
router.post('/',[ jwtAuth , validateCreateUser] , createUser)
router.put('/:id', [jwtAuth, updateUserValidationSchema] , updateUser)
router.delete('/:id', jwtAuth, deleteUser)


module.exports = router
