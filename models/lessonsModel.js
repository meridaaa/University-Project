const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
     name:{
        type: String,
        required: true
    },
    vahed:{
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    ostad: {
        type: String
    },
    place: [String],
    zarfiat: {
        type: Number,
        min: 15,
        required: true
    },
    saat: {
        type: String
    },
    daneshkade: {
        type: String,
        required: true
    },
    day:[String]
})

const Lessons = mongoose.model('Lessons', lessonSchema)
module.exports = Lessons
