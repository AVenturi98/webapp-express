const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.get('/', controller.index)

router.get('/:id', controller.show)

router.post('/:id/reviews', controller.post)

module.exports = router