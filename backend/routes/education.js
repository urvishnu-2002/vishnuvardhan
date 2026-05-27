const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { protect, authorize } = require('../middleware/auth');

// GET all education entries (public)
router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ order: 1, startDate: -1 });
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single education entry (public)
router.get('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ success: false, message: 'Education entry not found' });
        }
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CREATE education entry (admin only)
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json({ success: true, data: education });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// UPDATE education entry (admin only)
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!education) return res.status(404).json({ success: false, message: 'Education entry not found' });
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE education entry (admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) return res.status(404).json({ success: false, message: 'Education entry not found' });
        res.status(200).json({ success: true, message: 'Education entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;