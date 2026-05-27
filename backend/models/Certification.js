const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a certification title'],
        trim: true
    },
    issuer: {
        type: String,
        required: [true, 'Please add an issuer'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Please add an issue date']
    },
    link: {
        type: String,
        default: ''
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

module.exports = mongoose.model('Certification', CertificationSchema);