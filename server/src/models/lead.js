const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
    date: Date,
    scheduled_at: Date,
    scheduled_to: { type: Date, required: false },
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    branch_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Branch'},
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    counsellor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const lead = mongoose.model('Lead', leadSchema)

module.exports = lead