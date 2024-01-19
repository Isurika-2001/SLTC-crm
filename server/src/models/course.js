const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
})

const course = mongoose.model('Course', courseSchema)

module.exports = course