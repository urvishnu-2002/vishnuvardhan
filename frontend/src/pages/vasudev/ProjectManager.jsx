import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Plus, Edit2, Trash2, X, Save, CheckCircle, AlertTriangle } from 'lucide-react';

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
            const response = await fetch('http://localhost:5000/api/projects/admin/all', {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tags = formData.tags.split(',').map((tag) => tag.trim());
            const data = { ...formData, tags };

            const url = editingId
                ? `http://localhost:5000/api/projects/${editingId}`
                : 'http://localhost:5000/api/projects';

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
        });
        setEditingId(project._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Category *</label>
                                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
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
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Tags (comma separated)</label>
                                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="React, Node.js, MongoDB" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Project Link</label>
                                <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                            </div>
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
