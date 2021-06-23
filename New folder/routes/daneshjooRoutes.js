const express = require('express')
// const daneshjooController = require('../controller/daneshjooController')
const daneshjooController = require('../controller/daneshjooController')
const lessonController = require('../controller/lesssonsController')
const authController = require('../controller/authController')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser')

const daneshjooRoutes = express.Router()
daneshjooRoutes.use(bodyParser.json());

// daneshjooRoutes.use(authController.protect)

// daneshjooRoutes.get('/:akhz', (req, res) => { res.render('lessons')})

// daneshjooRoutes.route('/')
// .get(daneshjooController.getAllDaneshjoo)
// .post(daneshjooController.createDaneshjoo)
// .post(authController.restrictTo('daneshjoo') ,daneshjooController.createDaneshjoo)

// daneshjooRoutes.route('/:id')
// .get(daneshjooController.getDaneshjoo)
// .patch(daneshjooController.updateDaneshjoo)
// .delete(daneshjooController.deleteDaneshjoo)

daneshjooRoutes.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
// router.post('/login', authController.login))

daneshjooRoutes.route('/login')
.post( daneshjooController.login)
// daneshjooRoutes.get('/:id/akhz', (req, res) => res.render('AllLessons'))
// daneshjooRoutes.get('/:id/akhz')
// .get(lessonController.getAllLessons)

// daneshjooRoutes.get('/akhz', (req, res) => res.render('AllLessons'))
// daneshjooRoutes.route('/akhz')
// .get(daneshjooController.getAllDaneshjoo)
daneshjooRoutes.route('/:id/akhz')
.get(lessonController.getAllLessons)
daneshjooRoutes.route('/:id/add')
.get(daneshjooController.akhz)
daneshjooRoutes.route('/:id/add')
.post(daneshjooController.akhz)
daneshjooRoutes.route('/:id/remove')
.get(daneshjooController.remove)
// daneshjooRoutes.route('/login').post(daneshjooController.login)

module.exports = daneshjooRoutes