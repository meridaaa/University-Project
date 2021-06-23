const Daneshjoo = require('../models/daneshjooModel')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appError = require('../utils/AppError')
const Lessons = require('../models/lessonsModel')
const AppError = require('../utils/AppError')
const passport = require('passport');
const dotenv = require('dotenv')

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

// exports.getAllDaneshjoo = catchAsync(async (req, res, next) => {
//     const features = new APIFeatures(Daneshjoo.find(), req.query).sort().limitFields().paganinate()
//     const doc = await features.query
//     res.status(200).json({
//         status: 'success',
//         reslut: doc.length,
//         data: {
//             data: doc
//         }
//     })

// })

exports.getDaneshjoo = catchAsync(async (req, res, next) => {
    const doc = await Daneshjoo.findById(req.params.id);
    if (!doc) {
      return next(new appError('No document found with that ID', 404));
    }

    res.render('AllLessons.ejs', {
     Daneshjoo: doc
})
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       data: doc
  //     }
  //   });
  });

exports.login = catchAsync(async(req, res, next) => {
   const { Uni_id , Id } = req.body;
console.log(req.body, Uni_id , Id, req.params.id)
  // 1) Check if email and password exist
  if (!Uni_id || !Id) {
    return next(new AppError('Please provide Uni_id and id!', 400));
  }
  // 2) Check if user exists && id is correct
  const user1 = await Daneshjoo.findOne({ Uni_id }).select('+id');
  if (!user1 || Id != user1.id) {
    return next(new AppError('Incorrect Uni_id or password', 401));
  }
  console.log(user1._id);
  // console.log(req.daneshjoo.id);
  res.render('dashboard', {
    id : user1._id,
    name: user1.name
  })
  // createSendToken(user, 200, res);
});


exports.createDaneshjoo = catchAsync(async (req, res, next) => {
     const newdoc = await Daneshjoo.create(req.body)
        res.status(201).json({
            status: 'success', 
            data:{
                data: newdoc
            }
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newdoc.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash('success_msg', 'You are now registered and can login.')  
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      
        createSendToken(newUser, 201, res);
})  

// exports.updateDaneshjoo = catchAsync(async (req, res, next) => {
//     const doc = await Daneshjoo.findByIdAndUpdate(req.params.id, req.body)
//     if(!doc){
//         return next(new appError('No document found with that Id', 404))
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             doc
//         }
//     })
// })

// exports.deleteDaneshjoo = catchAsync(async (req, res, next) => {
//     const doc = await Daneshjoo.findByIdAndDelete(req.params.id)
//     if(!doc){
//         return next(new appError('No document found with that Id', 404))
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// })

// exports.akhz = catchAsync(async (req, res, next) => {
//     const{name, ostad} = req.body
//     var id = req.params.id
//     console.log(req.body);
//     Lessons.findOne({ name, ostad }).then(lesson => {
//       if(lesson){
//       const lessonId = lesson.id
      
//       // Daneshjoo.insertMany({Lessons: lessonId})
//       console.log(typeof Daneshjoo);
//       // const item = _.find(Daneshjoo, {Lessons: lessonId})
//     Daneshjoo.findOne({Lessons: lessonId}).then(lsson => {
//       if (lsson) {
//         console.log('dfdf*******')
//     //     // lesson.insert(lesson)
//     //     // res.render('akhz', {
//     //     //   errs,
//     //     //   name,
//     //     //   ostad
//     //     // });
//       }
    
//     })
//   }
//     })

exports.akhz = catchAsync(async (req, res, next) => {
    const lesson = await Daneshjoo.findById(req.params.id.substring(24, 48)).then(user =>{
      if(! user.Lessons.includes((req.params.id.substring(0, 24)))){
        user.Lessons.push(req.params.id.substring(0, 24))
        console.log(user.Lessons);
        user.save()  
      }
      else{console.log('Mojud ast');}
    }).catch(err => console.log(err))
    // const features = new APIFeatures(Lessons.find(), req.query).sort().limitFields().paganinate()
    const doc = await Lessons.find()
    req.params.id = req.params.id.substring(24, 48)
    
    console.log(req.query);
    res.render('AllLessons.ejs', {
        Lessons : doc,
        daneshjoo: req.params.id
    // next()
    })
  });

exports.remove = catchAsync(async (req, res, next) => {
    const lesson = await Daneshjoo.findById(req.params.id.substring(24, 48))
    .then(user =>{
      if( user.Lessons.includes((req.params.id.substring(0, 24)))){
        user.Lessons.remove((req.params.id.substring(0, 24)))
        // user.Lessons.push(req.params.id.substring(0, 24))
        console.log(user.Lessons);
        user.save()  
      }
      else{console.log('Mojud nist');}
    }).catch(err => console.log(err))
    // const features = new APIFeatures(Lessons.find(), req.query).sort().limitFields().paganinate()
    const doc = await Lessons.find()
    req.params.id = req.params.id.substring(24, 48)
    res.render('AllLessons.ejs', {
        Lessons : doc,
        daneshjoo: req.params.id
    })
    
  });  

// exports.login =  (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/daneshjoo/login',
//     failureFlash: true
//   })(req, res, next);
// };
    


    
    //   if (lesson) {
    //     console.log(Daneshjoo.findOne({Lessons: name}))
    //     errs.push({ msg: 'Lesson already exists' });
    //     res.render('akhz', {
    //       errs,
    //       name,
    //       ostad
    //     });
    //   }
    //    else {
    //     const newlesson = new Daneshjoo.Lessons({
    //       name
    //     }).then(lesson => {
    //             req.flash('success_msg', 'You are now registered and can login.')  
    //             res.redirect('/daneshjoo/:akhz');
    //           })
    //         }
    // })
    //           .catch(err => console.log(err));
//     next()
// })



// exports.login = catchAsync(async(req, res, next) => {
// const { email, password } = req.body;
// console.log(req.body);


//   // 1) Check if email and password exist
//   if (!email || !password) {
//     return next(new AppError('Please provide email and password!', 400));
//   }
//   // 2) Check if user exists && password is correct
//   // const user = await Daneshjoo.findOne({ User_id : email }).select('+password');
// const user = await Daneshjoo.findOne({ User_id : email })
// console.log(user);

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError('Incorrect email or password', 401));
//   }

//   // 3) If everything ok, send token to client
//   createSendToken(user, 200, res);
// });