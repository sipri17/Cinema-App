const Controller = require('../controllers');



const router = require('express').Router()



router.get('/', Controller.showAllMovie)

router.post('/',Controller.createMovie)

router.delete('/user/:mongoId', Controller.destroyMovieByMongoId)

router.get('/:movieId', Controller.showMovieById)

router.delete('/:movieId', Controller.destroyMovie)


router.put('/:movieId',  Controller.putMovie)






module.exports = router