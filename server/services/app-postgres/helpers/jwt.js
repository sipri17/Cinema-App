const jwt = require('jsonwebtoken')

const keySecret = "test"
const generateToken = (payload)=>jwt.sign(payload,keySecret)

const verifyToken = (token)=> jwt.verify(token, keySecret)

module.exports = {generateToken, verifyToken}