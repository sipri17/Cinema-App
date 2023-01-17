const Controller = require('../controllers');

const router = require('express').Router();

router.post('/users/register', Controller.register);
router.get('/users', Controller.showAllUser);
router.get('/users/:id', Controller.findUserById);
router.delete('/users/:id', Controller.destroyUser);

module.exports = router;