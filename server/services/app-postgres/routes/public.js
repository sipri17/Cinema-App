const CustomerController = require('../controllers/customer')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/movies', CustomerController.showAllMovies)
router.get('/movies/:movieId', CustomerController.showMovieById)



module.exports = router
