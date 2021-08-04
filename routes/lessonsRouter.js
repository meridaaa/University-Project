const express = require('express')
const lessonsController = require('../controller/lesssonsController')
const bodyParser = require('body-parser')

const lessonsRoutes = express.Router()
lessonsRoutes.use(bodyParser.json());

lessonsRoutes.route('/')
.get(lessonsController.getAllLessons)

module.exports = lessonsRoutes