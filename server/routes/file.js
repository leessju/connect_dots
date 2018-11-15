const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const fileController = require('../controllers/file');

router.post('/upload', passport.authenticate('jwt', { session: false }), fileController.upload);

module.exports = router;