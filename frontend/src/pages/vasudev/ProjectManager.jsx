import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Plus, Edit2, Trash2, X, Save, CheckCircle, AlertTriangle } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const ProjectManager = () => {
    const { token } = useAdmin();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        shortDescription: '',
        tags: '',
        link: '#',
        image: '',
        github: '',
        company: '',
        date: '',
        challenges: '',
        solutions: '',
        featured: false,
        status: 'published',
        order: 0,
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/projects/admin/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setProjects(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tags = formData.tags.split(',').map((tag) => tag.trim());
            const challenges = formData.challenges.split('\n').map((c) => c.trim()).filter(Boolean);
            const solutions = formData.solutions.split('\n').map((s) => s.trim()).filter(Boolean);
            const data = { ...formData, tags, challenges, solutions };

            const url = editingId
                ? `${API_BASE_URL}/projects/${editingId}`
                : `${API_BASE_URL}/projects`;

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                fetchProjects();
                setShowForm(false);
                setEditingId(null);
                setFormData({
                    title: '',
                    category: '',
                    description: '',
                    shortDescription: '',
                    tags: '',
                    link: '#',
                    image: '',
                    github: '',
                    company: '',
                    date: '',
                    challenges: '',
                    solutions: '',
                    featured: false,
                    status: 'published',
                    order: 0,
                });
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            ...project,
            tags: project.tags.join(', '),
            image: project.image || '',
            github: project.github || '',
            company: project.company || '',
            date: project.date || '',
            challenges: Array.isArray(project.challenges) ? project.challenges.join('\n') : '',
            solutions: Array.isArray(project.solutions) ? project.solutions.join('\n') : '',
        });
        setEditingId(project._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    fetchProjects();
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            title: '',
            category: '',
            description: '',
            shortDescription: '',
            tags: '',
            link: '#',
            image: '',
            github: '',
            company: '',
            date: '',
            challenges: '',
            solutions: '',
            featured: false,
            status: 'published',
            order: 0,
        });
    };

    return (
        <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Manager</span>
                    </h1>
                </div>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 font-mono text-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            <div className="mb-8">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-cyber-emerald)]/10 text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-emerald)]/30 hover:bg-[var(--color-cyber-emerald)] hover:text-black transition-all font-bold uppercase tracking-widest text-xs"
                >
                    {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add New Project</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-[#0f172a] rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                        {editingId ? <><Edit2 size={24} className="text-[var(--color-cyber-emerald)]"/> Edit Project</> : <><Plus size={24} className="text-[var(--color-cyber-emerald)]"/> Add New Project</>}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Category *</label>
                                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Associated Company / Organization</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="e.g., Priyansh Technologies or Personal Project" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Short Description *</label>
                            <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} required maxLength="200" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Full Description *</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm resize-y" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Date / Timeline</label>
                                <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="e.g., Feb 2024 – May 2024 or Priyansh Technologies" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">GitHub Repository Link</label>
                                <input type="text" name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Tags (comma separated)</label>
                                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="React, Node.js, MongoDB" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Project Link</label>
                                <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Architectural Challenges (one per line)</label>
                            <textarea name="challenges" value={formData.challenges} onChange={handleInputChange} rows="3" placeholder="Coordinating data consistency...&#10;Guaranteeing near-zero latency..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm resize-y" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Engineered Solutions (one per line)</label>
                            <textarea name="solutions" value={formData.solutions} onChange={handleInputChange} rows="3" placeholder="Implemented REST API cache pooling...&#10;Engineered robust auth systems..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm resize-y" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm appearance-none">
                                    <option value="draft" className="bg-slate-900">Draft</option>
                                    <option value="published" className="bg-slate-900">Published</option>
                                    <option value="archived" className="bg-slate-900">Archived</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Display Order</label>
                                <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="space-y-4 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest block">Project Image</label>
                            
                            {formData.image ? (
                                <div className="space-y-3">
                                    <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                                        <img src={formData.image} alt="Project Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-2 right-2 p-2 rounded-full bg-black/75 text-red-400 hover:text-red-300 border border-red-500/30 hover:scale-105 transition-all"
                                            title="Remove Image"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full max-w-md">
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-800 hover:border-[var(--color-cyber-emerald)]/50 rounded-lg cursor-pointer bg-slate-950/50 hover:bg-slate-900/30 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-[var(--color-cyber-emerald)]/60" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-slate-400 font-bold"><span className="text-[var(--color-cyber-emerald)]">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-slate-500 font-mono">PNG, JPG or WEBP (Max 10MB)</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-lg w-fit">
                            <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 accent-[var(--color-cyber-emerald)] bg-slate-900 border-slate-800 rounded cursor-pointer" />
                            <label htmlFor="featured" className="text-sm font-bold text-white cursor-pointer select-none tracking-wide">
                                Mark as Featured Project
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-slate-800">
                            <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                {loading ? 'Saving...' : <><Save size={18} /> {editingId ? 'Update Project' : 'Create Project'}</>}
                            </button>
                            <button type="button" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent text-white border border-slate-700 hover:bg-slate-800 transition-all font-bold uppercase tracking-widest text-sm" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <CheckCircle size={20} className="text-[var(--color-cyber-emerald)]" />
                        Projects Repository <span className="text-slate-500 font-mono text-sm border border-slate-700 px-3 py-1 rounded-full">{projects.length} TOTAL</span>
                    </h2>
                </div>
                
                {loading && !showForm ? (
                    <div className="p-12 text-center text-[var(--color-cyber-emerald)] font-mono animate-pulse uppercase tracking-widest">
                        Loading Repository Data...
                    </div>
                ) : projects.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-4">
                        <AlertTriangle size={32} className="text-slate-600" />
                        No projects found. Initialize your repository.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-950">
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">Image</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">Title</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">Category</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800">Status</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800 text-center">Featured</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800 text-center">Order</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] border-b border-slate-800 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id} className="group hover:bg-slate-800/30 transition-colors border-b border-slate-800/50 last:border-0">
                                        <td className="py-3 px-6">
                                            {project.image ? (
                                                <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded border border-slate-800" />
                                            ) : (
                                                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-slate-600 font-mono text-[9px] uppercase font-bold">No Image</div>
                                            )}
                                        </td>
                                        <td className="py-5 px-6 font-bold text-white tracking-wide">{project.title}</td>
                                        <td className="py-5 px-6 text-slate-400 text-sm">{project.category}</td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border shadow-inner ${
                                                project.status === 'published' 
                                                ? 'bg-[var(--color-cyber-emerald)]/10 text-[var(--color-cyber-emerald)] border-[var(--color-cyber-emerald)]/30' 
                                                : project.status === 'draft'
                                                ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                                                : 'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            <span className={`font-mono text-xl ${project.featured ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_5px_var(--color-cyber-emerald)]' : 'text-slate-700'}`}>
                                                {project.featured ? '★' : '−'}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-slate-400 font-mono text-center">{project.order}</td>
                                        <td className="py-5 px-6">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => handleEdit(project)} className="p-2.5 rounded-lg bg-slate-950 text-blue-400 border border-slate-800 hover:bg-blue-400/10 hover:border-blue-400/50 hover:scale-110 transition-all shadow-lg" title="Edit">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(project._id)} className="p-2.5 rounded-lg bg-slate-950 text-red-400 border border-slate-800 hover:bg-red-400/10 hover:border-red-400/50 hover:scale-110 transition-all shadow-lg" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
