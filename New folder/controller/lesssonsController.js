const Lessons = require('../models/lessonsModel')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const appError = require('../utils/AppError')


exports.getAllLessons = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Lessons.find(), req.query).sort().limitFields().paganinate()
    const doc = await features.query
        
    // res.status(200).json({
    //     status: 'success',
    //     reslut: doc.length,
    //     data: {
    //         data: doc
    //     }
    // })
    res.render('AllLessons.ejs', {
        Lessons : doc,
        daneshjoo: req.params.id
    })
})

exports.getLesson = catchAsync(async (req, res, next) => {
    const doc = await Lessons.findById(req.params.id);
    if (!doc) {
      return next(new appError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createLesson = catchAsync(async (req, res, next) => {
     const newdoc = await Lessons.create(req.body)
        res.status(201).json({
            status: 'success', 
            data:{
                data: newdoc
            }
        })
})  

exports.updateLesson = catchAsync(async (req, res, next) => {
    const doc = await Lessons.findByIdAndUpdate(req.params.id, req.body)
    if(!doc){
        return next(new appError('No document found with that Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

exports.deleteLesson = catchAsync(async (req, res, next) => {
    const doc = await Lessons.findByIdAndDelete(req.params.id)
    if(!doc){
        return next(new appError('No document found with that Id', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})
