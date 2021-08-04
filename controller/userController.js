const Daneshjoo = require('../models/daneshjooModel')
const Lessons = require('../models/lessonsModel')
const catchAsync = require('../utils/catchAsync')
const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport');

dotenv.config({ path: '../confg.env' })

exports.addStudent = catchAsync(async (req, res, next) => {
  const { name, Uni_id, id, fatherName, motherName, date_birth, reshte } = req.body
  let errs = []
  //validations
  if (!name || !Uni_id || !id || !fatherName || !motherName || !date_birth || !reshte) {
    errs.push({ msg: 'Please fill in all fields.' })
  }
  if (id.length != 10) {
    errs.push({ msg: 'ID should be 10 characters' })
  }
  if (errs.length > 0) {
    res.render('addStudent', {
      errs,
      name, Uni_id, id, fatherName, motherName, date_birth, reshte
    })
  }
  else {

    // await (Daneshjoo.findOne({ id }) || Daneshjoo.findOne({ Uni_id })).then(user => {
      await Daneshjoo.findOne({ Uni_id }).then(user => {
      if (user) {
        errs.push({ msg: 'Student with this  ID or User_id already exists' });
        res.render('addStudent', {
          errs,
          name, Uni_id, id, fatherName, motherName, date_birth, reshte
        })
      } else {
        // Daneshjoo.findOne({ id }).then(user1 => {
        //   if (user1) {
        //     errs.push({ msg: 'Student with this ID already exists' });
        //     res.render('addStudent', {
        //       errs,
        //       name, Uni_id, id, fatherName, motherName, date_birth, reshte
        //     })
        //   }
        //   else {
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

    }).catch(err => console.log(err));
  }
})
// };
// createSendToken(newUser, 201, res);
// })

exports.addLesson = catchAsync(async (req, res, next) => {
  const { name, vahed, ostad, daneshkade, place, zarfiat, saat, day } = req.body
  let errs = []
  //validations
  if (!name || !vahed || !ostad || !daneshkade || !place || !zarfiat || !saat || !day) {
    errs.push({ msg: 'Please fill in all fields.' })
  }
  console.log(errs);
  if (errs.length > 0) {
    res.render('addLesson', {
      errs,
      name, vahed, ostad, daneshkade, place, zarfiat, saat, day
    })
  } else {

    await Lessons.findOne({ name }).then(user => {
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

    }).catch(err => console.log(err));
  };
})


exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/dashboardAdmin',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.')
  res.redirect('/')
}




// exports.addStudent = catchAsync(async (req, res, next) => {
//   const { name, Uni_id, id, fatherName, motherName, date_birth, reshte } = req.body
//   let errs = []
//   //validations
//   if (!name || !Uni_id || !id || !fatherName || !motherName || !date_birth || !reshte) {
//     errs.push({ msg: 'Please fill in all fields.' })
//   }
//   if (id.length != 10) {
//     errs.push({ msg: 'ID should be 10 characters' })
//   }
//   if (errs.length > 0) {
//     res.render('addStudent', {
//       errs,
//       name, Uni_id, id, fatherName, motherName, date_birth, reshte
//     })
//   }
//   else {
//     // (Daneshjoo.findOne({ id }) || Daneshjoo.findOne({ Uni_id })).then(user => {
//     Daneshjoo.findOne({ Uni_id }).then(user => {
//       if (user) {
//         console.log(user)
//         errs.push({ msg: 'Student with this ID or User_id already exists' });
//         res.render('addStudent', {
//           errs,
//           name, Uni_id, id, fatherName, motherName, date_birth, reshte
//         })
//       } else {
//         const newUser = new Daneshjoo({
//           name, Uni_id, id, fatherName, motherName, date_birth, reshte
//         });
//         newUser
//           .save()
//           .then(user => {
//             console.log('Added!');
//             req.flash('success_msg', 'Student has been added.')
//             res.redirect('/users/addStudent');
//           })
//           .catch(err => console.log(err));
//       }

//     }).catch(err => console.log(err));
//   };
// })
