import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Save, AlertTriangle, Layers, User, Phone, Code, Share2 } from 'lucide-react';

const OthersManager = () => {
    const { token } = useAdmin();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
    // Centralize all basic configurations
    const [formData, setFormData] = useState({
        bio: '',
        services: '', // Comma separated
        contactEmail: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        technologies: '', // Comma separated
        skills: '', // Comma separated
        hobbies: '', // Comma separated
        languages: '', // Comma separated
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/settings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success && data.data) {
                // Convert arrays back to comma-separated strings for the form
                setFormData({
                    ...data.data,
                    services: data.data.services?.join(', ') || '',
                    technologies: data.data.technologies?.join(', ') || '',
                    skills: data.data.skills?.join(', ') || '',
                    hobbies: data.data.hobbies?.join(', ') || '',
                    languages: data.data.languages?.join(', ') || '',
                });
            }
        } catch (err) {
            console.warn('Failed to fetch settings, using defaults.', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setSuccessMsg(''); // Clear success msg on edit
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // Format strings back into arrays before saving
        const payload = {
            ...formData,
            services: formData.services.split(',').map(s => s.trim()).filter(Boolean),
            technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            hobbies: formData.hobbies.split(',').map(s => s.trim()).filter(Boolean),
            languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const response = await fetch('http://localhost:5000/api/settings', {
                method: 'PUT', // Assuming PUT replaces/creates the global settings object
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                setSuccessMsg('Settings updated successfully.');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <h3 className="text-xl font-black text-white mt-10 mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
            <Icon size={20} className="text-[var(--color-cyber-emerald)]" /> {title}
        </h3>
    );

    const InputField = ({ label, name, type = "text", placeholder }) => (
        <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">{label}</label>
            {type === "textarea" ? (
                <textarea name={name} value={formData[name]} onChange={handleInputChange} rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none resize-y" placeholder={placeholder} />
            ) : (
                <input type={type} name={name} value={formData[name]} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" placeholder={placeholder} />
            )}
        </div>
    );

    return (
        <div className="pb-32 px-6 md:px-12 max-w-5xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Settings</span>
                    </h1>
                </div>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 font-mono text-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}
            {successMsg && (
                <div className="mb-8 p-4 bg-[var(--color-cyber-emerald)]/10 border border-[var(--color-cyber-emerald)]/50 rounded-xl flex items-center gap-3 text-[var(--color-cyber-emerald)] font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle size={18} /> {successMsg}
                </div>
            )}

            <div className="bg-[#0f172a] rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <SectionHeader icon={User} title="Personal Information" />
                    <InputField label="Personal Bio" name="bio" type="textarea" placeholder="A brief introduction about yourself..." />
                    
                    <SectionHeader icon={Phone} title="Contact Details" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Contact Email" name="contactEmail" type="email" placeholder="hello@example.com" />
                        <InputField label="Phone Number" name="phone" placeholder="+1 234 567 8900" />
                        <InputField label="Location" name="location" placeholder="City, Country" />
                    </div>

                    <SectionHeader icon={Share2} title="Social & Platforms" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="GitHub URL" name="github" placeholder="https://github.com/..." />
                        <InputField label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." />
                        <InputField label="Twitter / X URL" name="twitter" placeholder="https://twitter.com/..." />
                    </div>

                    <SectionHeader icon={Code} title="Attributes & Expertise (Comma Separated)" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Services Offered" name="services" placeholder="Web Development, UI/UX Design..." />
                        <InputField label="Core Technologies" name="technologies" placeholder="React, Node.js, Python..." />
                        <InputField label="General Skills" name="skills" placeholder="Project Management, Agile..." />
                        <InputField label="Languages Spoken" name="languages" placeholder="English, Spanish..." />
                    </div>
                    <InputField label="Hobbies & Interests" name="hobbies" placeholder="Photography, Gaming..." />

                    <div className="flex gap-4 pt-10 mt-10 border-t border-slate-800 sticky bottom-0 bg-[#0f172a] pb-4">
                        <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            {loading ? 'Transmitting Data...' : <><Save size={18} className="inline mr-2" /> Sync Global Settings</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OthersManager;