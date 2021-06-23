const express = require('express')
const lessonsController = require('../controller/lesssonsController')
const bodyParser = require('body-parser')

const lessonsRoutes = express.Router()
lessonsRoutes.use(bodyParser.json());



// lessonsRoutes.route('/')
// .get(lessonsController.getAllLessons)
// .post(lessonsController.createLesson)

lessonsRoutes.route('/:id')
.get(lessonsController.getLesson)
.patch(lessonsController.updateLesson)
.delete(lessonsController.deleteLesson)

module.exports = lessonsRoutes