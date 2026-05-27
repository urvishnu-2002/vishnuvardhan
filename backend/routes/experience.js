const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect, authorize } = require('../middleware/auth');

// GET all experience (public)
router.get('/', async (req, res) => {
    try {
        const experience = await Experience.find().sort({ order: 1, startDate: -1 });
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single experience (public)
router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CREATE experience (admin)
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json({ success: true, data: experience });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// UPDATE experience (admin)
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!experience) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE experience (admin)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;