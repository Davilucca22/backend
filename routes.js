const express = require('express')

const router = express.Router()

const home = require('./controllers/homecontroller')

router.get('/', home.olaMundo)

module.exports = router
