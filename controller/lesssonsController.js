const Lessons = require('../models/lessonsModel')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')


exports.getAllLessons = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Lessons.find(), req.query).sort().limitFields().paganinate()
    const doc = await features.query
        
    res.render('AllLessons.ejs', {
        Lessons : doc,
        daneshjoo: req.params.id
    })
})
