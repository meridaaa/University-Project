const express = require('express')
const daneshjooController = require('../controller/daneshjooController')
const Daneshjoo = require('../models/daneshjooModel')
const lessonController = require('../controller/lesssonsController')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser')

const daneshjooRoutes = express.Router()
daneshjooRoutes.use(bodyParser.json());

daneshjooRoutes.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

daneshjooRoutes.route('/login')
.post(daneshjooController.login)

// daneshjooRoutes.get('/dashboard', (req, res) =>
//     res.render('dashboard',{
//         id: req._id
//     })
// )

daneshjooRoutes.route('/:id/akhz')
.get(lessonController.getAllLessons)

daneshjooRoutes.route('/:id/add')
.get(daneshjooController.akhz)
daneshjooRoutes.route('/:id/add')
.post(daneshjooController.akhz)

daneshjooRoutes.route('/:id/remove')
.get(daneshjooController.remove)


module.exports = daneshjooRoutes