// API Service for backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';


export const projectService = {
    // Get all published projects
    async getProjects() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching projects:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    },

    // Get single project
    async getProject(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching project:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            return null;
        }
    },

    // Get all projects (admin only)
    async getAdminProjects(token) {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/admin/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching admin projects:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching admin projects:', error);
            return [];
        }
    },
};

export const authService = {
    // Login
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    },

    // Register
    async register(email, password, role = 'admin') {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, message: error.message };
        }
    },

    // Get current admin info
    async getCurrentAdmin(token) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching current admin:', error);
            return { success: false, message: error.message };
        }
    },
};

export const experienceService = {
    async getExperiences() {
        try {
            const response = await fetch(`${API_BASE_URL}/experience`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching experiences:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching experiences:', error);
            return [];
        }
    }
};

export const educationService = {
    async getEducations() {
        try {
            const response = await fetch(`${API_BASE_URL}/education`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching educations:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching educations:', error);
            return [];
        }
    }
};

export const certificationService = {
    async getCertifications() {
        try {
            const response = await fetch(`${API_BASE_URL}/certifications`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching certifications:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching certifications:', error);
            return [];
        }
    }
};

export const settingService = {
    async getSettings() {
        try {
            const response = await fetch(`${API_BASE_URL}/settings`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            } else {
                console.error('Error fetching settings:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            return null;
        }
    }
};

