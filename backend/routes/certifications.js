const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const { protect, authorize } = require('../middleware/auth');

// GET all certifications (public)
router.get('/', async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ order: 1, date: -1 });
        res.status(200).json({ success: true, data: certifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single certification (public)
router.get('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: certification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CREATE certification (admin)
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const certification = await Certification.create(req.body);
        res.status(201).json({ success: true, data: certification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// UPDATE certification (admin)
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!certification) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: certification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE certification (admin)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        if (!certification) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;