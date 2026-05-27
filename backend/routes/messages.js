const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, authorize } = require('../middleware/auth');

// GET all messages (admin only)
router.get('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST new message (public - for your frontend Contact form)
router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE message (admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
        res.status(200).json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;