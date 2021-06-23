const mongoose = require('mongoose')
const User = require('./userModel')

const DaneshjooSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Uni_id: {
        type: String,
        required: true,
        unique: true
    },
    id:{
        type: String,
        length: 10,
        required: true,
        unique: true
    },
    fatherName:{
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true
    },
    date_birth:{
        type: Date,
        required: true
    },
    reshte: {
        type: String,
        required: true
    },
    Lessons: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Lessons'
    }],
    role:{
        type: String,
        enum: ['daneshjoo', 'admin']
    }
})

const Daneshjoo = mongoose.model('Daneshjoo', DaneshjooSchema)
module.exports = Daneshjoo