const express = require('express')
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

require('./config/password')(passport)

//db config
const DB = require('./config/keys').MongoURI

mongoose.connect(DB, {useNewUrlParser: true})
.then(() => console.log('Connected to mongoose....'))
.catch(err => console.log(err))
// mongoose.connect('mongodb+srv://clusterAnything.mongodb.net/test?retryWrites=true&w=majority,{ user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true }')

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

//Bodyparser
app.use(express.urlencoded({extended: false}))

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connsct falsh
app.use(flash())

//Global vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.get('/lessons', (req, res) => {
//     res.render('lessons', {title: 'XML Sitemap Generator Online'})
// })




//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/usersRouter'))
app.use('/lessons', require('./routes/lessonsRouter'))
app.use('/daneshjoo', require('./routes/daneshjooRoutes'))

const PORT = process.env.port || 5000
app.listen(PORT, console.log(`server started at ${PORT}`))