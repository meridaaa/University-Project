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

module.exports = router;