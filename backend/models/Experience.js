const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Please add a role or title'],
        trim: true
    },
    startDate: {
        type: String,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: String,
        required: [true, 'Please add an end date']
    },
    description: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', ExperienceSchema);