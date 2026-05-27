const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: [true, 'Please add an institution name'],
        trim: true
    },
    degree: {
        type: String,
        required: [true, 'Please add a degree or certification name'],
        trim: true
    },
    field: {
        type: String,
        required: [true, 'Please add a field of study'],
        trim: true
    },
    startDate: {
        type: String,
        required: [true, 'Please add a start date (e.g., "Aug 2019")']
    },
    endDate: {
        type: String,
        required: [true, 'Please add an end date (e.g., "May 2023" or "Present")']
    },
    description: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Education', EducationSchema);