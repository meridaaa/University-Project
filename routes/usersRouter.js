const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const { forwardAuthenticated } = require('../config/auth');

//login
router.get('/login', forwardAuthenticated,(req, res) => res.render('loginAdmin'));
router.post('/login', userController.login);

//Add Student
router.get('/AddStudent', (req, res) => { res.render('addStudent')})
router.post('/AddStudent', userController.addStudent)    

//Add Lesson
router.get('/AddLesson', (req, res) => { res.render('addLesson')})
router.post('/AddLesson', userController.addLesson)    

//logout
router.get('/logout',userController.logout);

module.exports = router