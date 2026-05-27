const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const { protect, authorize } = require('../middleware/auth');

// GET settings (public - this creates a default empty doc if none exists)
router.get('/', async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT update settings (admin only)
router.put('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (settings) {
            settings = await Setting.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
        } else {
            settings = await Setting.create(req.body);
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;