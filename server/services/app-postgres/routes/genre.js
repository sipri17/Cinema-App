const Controller = require('../controllers');
const router = require('express').Router()


router.get('/', Controller.showGenres)
router.post('/', Controller.createGenre)
router.get('/:genreId', Controller.showGenreById)
router.delete('/:genreId', Controller.deleteGenre)
router.put('/:genreId', Controller.editGenre)

module.exports = router