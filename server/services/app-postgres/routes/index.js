const Controller = require('../controllers');
const CustomerController = require('../controllers/customer');
const movieRouter = require('./movie')
const userRouter = require('./user')
const genreRouter = require('./genre')
const publicRouter = require('./public')
const router = require('express').Router()
const {User}= require('../models');
const authentication = require('../middlewares/authentication');

router.use('/public',publicRouter)

// router.use('/users', userRouter)




router.use('/movies', movieRouter)
router.use('/genres', genreRouter)




module.exports = router
