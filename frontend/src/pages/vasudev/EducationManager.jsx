import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Plus, Edit2, Trash2, X, Save, CheckCircle, AlertTriangle, GraduationCap } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const EducationManager = () => {
    const { token } = useAdmin();
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
        location: '',
        order: 0,
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/education`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setEducationList(data.data);
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId
                ? `${API_BASE_URL}/education/${editingId}`
                : `${API_BASE_URL}/education`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                fetchEducation();
                handleCancel();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (edu) => {
        setFormData({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startDate: edu.startDate,
            endDate: edu.endDate,
            description: edu.description,
            location: edu.location || '',
            order: edu.order,
        });
        setEditingId(edu._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/education/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    fetchEducation();
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
        setFormData({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', location: '', order: 0 });
    };

    return (
        <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Manager</span>
                    </h1>
                </div>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 font-mono text-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            <div className="mb-8">
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-cyber-emerald)]/10 text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-emerald)]/30 hover:bg-[var(--color-cyber-emerald)] hover:text-black transition-all font-bold uppercase tracking-widest text-xs">
                    {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Education</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-[#0f172a] rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                        {editingId ? <><Edit2 size={24} className="text-[var(--color-cyber-emerald)]"/> Edit Education</> : <><GraduationCap size={24} className="text-[var(--color-cyber-emerald)]"/> Add Education</>}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Institution *</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Degree *</label>
                                <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Field of Study *</label>
                                <input type="text" name="field" value={formData.field} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Start Date *</label>
                                <input type="text" name="startDate" placeholder="e.g., Aug 2019" value={formData.startDate} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">End Date *</label>
                                <input type="text" name="endDate" placeholder="e.g., May 2023 or Present" value={formData.endDate} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Location</label>
                                <input type="text" name="location" placeholder="e.g., Hyderabad, India" value={formData.location} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Display Order</label>
                                <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none resize-y" />
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-slate-800">
                            <button type="submit" disabled={loading} className="px-8 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                {loading ? 'Saving...' : <><Save size={18} className="inline mr-2" /> {editingId ? 'Update' : 'Save'}</>}
                            </button>
                            <button type="button" onClick={handleCancel} className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-white transition-all font-bold uppercase tracking-widest text-sm">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between bg-slate-900/50">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <CheckCircle size={20} className="text-[var(--color-cyber-emerald)]" /> Education History
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-950 border-b border-slate-800">
                            <tr>
                                <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Institution</th>
                                <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Degree</th>
                                <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Duration</th>
                                <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educationList.map((edu) => (
                                <tr key={edu._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                    <td className="py-5 px-6 font-bold text-white">{edu.institution}</td>
                                    <td className="py-5 px-6 text-slate-400">{edu.degree} in {edu.field}</td>
                                    <td className="py-5 px-6 text-slate-500 font-mono text-sm">{edu.startDate} - {edu.endDate}</td>
                                    <td className="py-5 px-6 text-right">
                                        <button onClick={() => handleEdit(edu)} className="p-2 text-blue-400 hover:text-blue-300 mr-2"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(edu._id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EducationManager;