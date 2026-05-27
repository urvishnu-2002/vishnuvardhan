const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
            trim: true,
            maxlength: 100,
        },
        category: {
            type: String,
            required: [true, 'Please provide a project category'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a project description'],
            maxlength: 1000,
        },
        shortDescription: {
            type: String,
            required: [true, 'Please provide a short description'],
            maxlength: 200,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        link: {
            type: String,
            default: '#',
        },
        image: {
            type: String,
            default: null,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'published',
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
