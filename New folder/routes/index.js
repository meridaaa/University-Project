const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/users/dashboardAdmin',  (req, res) =>
  res.render('dashboardAdmin', {
    name: req.name,
    id: req.id
  })
);
// outer.get('/dashboardAdmin', ensureAuthenticated, (req, res) =>
//   res.render('dashboardAdmin', {
//     name: req.daneshjoo.name,
//     id: req.user.id
//   })
// );

// router.get('/daneshjoo/akhz', (req, res) =>
//   res.render('AllLessons')
// )

// router.get('/daneshjoo/:id/akhz', ensureAuthenticated, (req, res) =>
//   res.render('AllLessons', {
//     id: req.user.id
//   })
// )
// router.get('/daneshjoo/:id/akhz', ensureAuthenticated, (req, res) =>
//   res.render('AllLessons', {
//     daneshjoo: req.user.id
//   })
// )


module.exports = router;