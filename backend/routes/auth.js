const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (admin) => {
    return jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// REGISTER (only for super_admin or initial setup)
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Create admin
        const admin = await Admin.create({
            email,
            password,
            role: role || 'admin',
        });

        // Generate token
        const token = generateToken(admin);

        res.status(201).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        console.log('Login attempt with email:', email);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Trim whitespace to prevent login issues
        email = email.trim();

        // Check for admin
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            console.log(`Login failed: No admin found for email '${email}'`);
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for email '${email}'`);
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        console.log(`Login successful for email '${email}'`);

        // Generate token
        const token = generateToken(admin);

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// GET current admin
router.get('/me', protect, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
