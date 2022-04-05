const bcrypt = require('bcryptjs')
const mockData = require('./mockData')

const generatePasswordHash = (password) => {
  const saltRound = 12
  const salt = bcrypt.genSaltSync(saltRound)
  return bcrypt.hashSync(password, salt)
}

const status = {
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_204_NO_CONTENT: 204,
  HTTP_404_NOT_FOUND: 404,
  HTTP_403_FORBIDDEN: 403,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_400_BAD_REQUEST: 400
}

module.exports = {
  generatePasswordHash,
  mockData,
  status
}
