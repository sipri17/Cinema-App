const Controller = require('../controllers')
const router = require('express').Router()

router.get('/users',Controller.showAllUsers)
router.post('/users/',Controller.register)
router.get('/users/:id',Controller.findUserById)
router.delete('/users/:id',Controller.deleteUser)
router.get('/movies',Controller.showAllMovies)
router.post('/movies',Controller.createMovie)
router.put('/movies/:id',Controller.putMovie)
router.get('/movies/:id',Controller.showMovieById)
router.delete('/movies/:id',Controller.destroyMovie)



module.exports = router
