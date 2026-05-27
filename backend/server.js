const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Get the CORS origin from the environment and strip any trailing slash
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.replace(/\/$/, '') : 'http://localhost:5173';

// Middleware
app.use(cors({
    origin: corsOrigin,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/education', require('./routes/education'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    // Automatically seed an admin user if the database is empty
    try {
        const Admin = require('./models/Admin');
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const email = process.env.ADMIN_EMAIL || 'admin@example.com';
            const password = process.env.ADMIN_PASSWORD || 'password123';
            await Admin.create({
                email,
                password,
                role: 'super_admin'
            });
            console.log(`✅ Admin auto-created: ${email} / ${password}`);
        }
    } catch (err) {
        console.error('Failed to auto-seed admin:', err.message);
    }
});
