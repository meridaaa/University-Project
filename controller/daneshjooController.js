const Daneshjoo = require('../models/daneshjooModel')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/AppError')
const Lessons = require('../models/lessonsModel')
const AppError = require('../utils/AppError')
const dotenv = require('dotenv')
dotenv.config({ path: '../confg.env' })

exports.login = catchAsync(async (req, res, next) => {
  const { Uni_id, Id } = req.body;
  // 1) Check if Uni_id and Id  exist
  if (!Uni_id || !Id) {
    return next(new AppError('Please provide Uni_id and id!', 400));
  }
  // 2) Check if user exists && id is correct
  const user = await Daneshjoo.findOne({ Uni_id }).select('+id');
  if (!user || Id != user.id) {
    return next(new AppError('Incorrect Uni_id or password', 401));
  }
  console.log(user._id);
  // console.log(req.daneshjoo.id);

  res.render('dashboard', {
    name: user.name,
    id: user._id
  })

});


// exports.getDaneshjoo = catchAsync(async (req, res, next) => {
//   const doc = await Daneshjoo.findById(req.params.id);
//   if (!doc) {
//     return next(new appError('No document found with that ID', 404));
//   }
//   res.render('AllLessons.ejs', {
//     Daneshjoo: doc
//   })
// });



exports.akhz = catchAsync(async (req, res, next) => {
  await Daneshjoo.findById(req.params.id.substring(24, 48)).then(user => {
    if (!user.Lessons.includes((req.params.id.substring(0, 24)))) {
      user.Lessons.push(req.params.id.substring(0, 24))
      console.log(user.Lessons);
      user.save()
    }
    else { console.log('Mojud ast'); }
  }).catch(err => console.log(err))

  const doc = await Lessons.find()
  req.params.id = req.params.id.substring(24, 48)

  // console.log(req.query);
  res.render('AllLessons.ejs', {
    Lessons: doc,
    daneshjoo: req.params.id
    // next()
  })
});

exports.remove = catchAsync(async (req, res, next) => {
  await Daneshjoo.findById(req.params.id.substring(24, 48))
    .then(user => {
      if (user.Lessons.includes((req.params.id.substring(0, 24)))) {
        user.Lessons.remove((req.params.id.substring(0, 24)))
        // user.Lessons.push(req.params.id.substring(0, 24))
        console.log(user.Lessons);
        user.save()
      }
      else { console.log('Mojud nist'); }
    }).catch(err => console.log(err))

  const doc = await Lessons.find()
  req.params.id = req.params.id.substring(24, 48)
  res.render('AllLessons.ejs', {
    Lessons: doc,
    daneshjoo: req.params.id
  })

});

