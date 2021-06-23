const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const { forwardAuthenticated } = require('../config/auth');

//login
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/login',(req, res) => res.render('loginAdmin'));
// router.post('/login', authController.login)
router.get('/AddStudent', (req, res) => { res.render('addStudent')})
router.post('/AddStudent', userController.addStudent)    

router.get('/AddLesson', (req, res) => { res.render('addLesson')})
router.post('/AddLesson', userController.addLesson)    

// Login
router.post('/login', userController.login);

//logout
router.get('/logout',userController.logout);

module.exports = router