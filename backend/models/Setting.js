const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    bio: { type: String, default: '' },
    services: { type: [String], default: [] },
    contactEmail: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    hobbies: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Setting', SettingSchema);