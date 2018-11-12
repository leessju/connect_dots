const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const codeController = require('../controllers/code');

router.get('/', passport.authenticate('jwt', { session: false }), codeController.get);
router.get('/search/:search_text', codeController.search);
router.get('/:id', codeController.getById);
router.post('/', codeController.add);
router.put('/:id', codeController.put);
router.delete('/:id', codeController.delete);

module.exports = router;