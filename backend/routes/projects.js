const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/auth');

// Helper function to ensure project objects have safe default values
const sanitizeProject = (p) => {
    const project = p.toJSON ? p.toJSON() : p;
    return {
        ...project,
        title: project.title || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        category: project.category || '',
        link: project.link || '',
        image: project.image || '',
        github: project.github || '',
        date: project.date || '',
        tags: Array.isArray(project.tags) ? project.tags : [],
        images: Array.isArray(project.images) ? project.images : [],
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
    };
};

// GET all projects (public)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ status: 'published' }).sort({ order: 1, createdAt: -1 });
        const safeProjects = projects.map(sanitizeProject);
        res.status(200).json({ success: true, data: safeProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single project (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const safeProject = sanitizeProject(project);
        res.status(200).json({ success: true, data: safeProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET all projects (admin - including unpublished)
router.get('/admin/all', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        const safeProjects = projects.map(sanitizeProject);
        res.status(200).json({ success: true, data: safeProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CREATE project
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// UPDATE project
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE project
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
