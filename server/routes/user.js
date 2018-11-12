const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const userController = require('../controllers/user');

router.get('/', userController.get);
router.get('/my/current', passport.authenticate('jwt', { session: false }), userController.current);
router.get('/:id', userController.getById);
router.post('/login', userController.login);
router.post('/', userController.add);
router.put('/:id', userController.put);
router.delete('/:id', userController.delete);

module.exports = router;