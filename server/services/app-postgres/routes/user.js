const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = require('express').Router()




router.post('/login', Controller.login )
router.post('/register', Controller.register )



module.exports = router