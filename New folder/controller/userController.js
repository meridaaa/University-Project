const User =  require('../models/daneshjooModel')
const Daneshjoo = require('../models/daneshjooModel')
const Lessons = require('../models/lessonsModel')
const catchAsync= require('../utils/catchAsync')
const express = require('express')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const passport = require('passport');

dotenv.config({path: '../confg.env'})
const signToken = id => {
  // return jwt.sign({ id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN
   return jwt.sign({ id }, 'blue-moon-137946-660847ssX', {
    expiresIn: 90
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.addStudent = catchAsync(async (req, res, next) => {
    const{name, Uni_id, id, fatherName, motherName, date_birth, reshte } = req.body
    let errs = []
    //validations
     if(!name || !Uni_id|| !id || !fatherName || !motherName || !date_birth || !reshte){
        errs.push({msg: 'Please fill in all fields.'})
    }
    if(id.length != 10){
        errs.push({msg: 'ID should be 10 characters'})
    }
    if(errs.length > 0) {
        res.render('addStudent',{
            errs,
            name, Uni_id, id, fatherName, motherName, date_birth, reshte
    })
  }
  else{
    
        (Daneshjoo.findOne({ id }) || Daneshjoo.findOne({ Uni_id })).then(user => {
      if (user) {
        errs.push({ msg: 'Student with this ID or User_id already exists' });
       res.render('addStudent',{
            errs,
            name, Uni_id, id, fatherName, motherName, date_birth, reshte
    })
      } else {
        const newUser = new Daneshjoo({
          name, Uni_id, id, fatherName, motherName, date_birth, reshte
        });
        newUser
              .save()
              .then(user => {
                console.log('Added!');
                req.flash('success_msg', 'Student has been added.')  
                res.redirect('/users/addStudent');
              })
              .catch(err => console.log(err));
          }

      }) .catch(err => console.log(err));
          };
          createSendToken(newUser, 201, res);
  })

exports.addLesson = (req, res, next) => {
   const{name, vahed, ostad, daneshkade, place, zarfiat, saat, day} = req.body
    let errs = []
    //validations
     if(!name || !vahed || !ostad || !daneshkade || !place || !zarfiat || !saat || !day){
        errs.push({msg: 'Please fill in all fields.'})
    }
console.log(errs);
    if(errs.length > 0) {
        res.render('addLesson',{
            errs,
            name, vahed, ostad, daneshkade, place, zarfiat, saat, day
        })
    }else{
    
        Lessons.findOne({ name }).then(user => {
      if (user) {
        errs.push({ msg: 'Lesson already exists' });
        res.render('addLesson', {
          errs,
           name, vahed, ostad, daneshkade, place, zarfiat, saat, day
        });
      } else {
        const newUser = new Lessons({
           name, vahed, ostad, daneshkade, place, zarfiat, saat, day
        });

            newUser
              .save()
              .then(user => {
                console.log('Added!');
                req.flash('success_msg', 'Lesson has been added.')  
                res.redirect('/users/AddLesson');
              })
              .catch(err => console.log(err));
          }

      }) .catch(err => console.log(err));
          };  
  }


exports.login =  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboardAdmin',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout =  (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.')
  res.redirect('/daneshjoo/login')
}

// exports.register = (req, res, next) => {
//    const{email, password, password2} = req.body
//     let errs = []
//     //validations
//      if(!email || !password || !password2){
//         errs.push({msg: 'Please fill in all fields.'})
//     }
//     if(password != password2){
//         errs.push({msg: 'Passwords do not match.'})
//     }
//     if(password.length < 5){
//         errs.push({msg: 'Password should be at least 6 characters'})
//     }
// console.log(errs);
//     if(errs.length > 0) {
//         res.render('register',{
//             errs,
//             email,
//             password,
//             password2
//         })
//     }else{
    
//         User.findOne({ email }).then(user => {
//       if (user) {
//         errs.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errs,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash('success_msg', 'You are now registered and can login.')  
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//           });
//   }
// }