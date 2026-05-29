import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Save, AlertTriangle, User, Phone, Code, Share2, CheckCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const SectionHeader = ({ icon: Icon, title }) => (
    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
        <Icon size={20} className="text-[var(--color-cyber-emerald)]" /> {title}
    </h3>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
    <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">{label}</label>
        {type === "textarea" ? (
            <textarea name={name} value={value} onChange={onChange} rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none resize-y" placeholder={placeholder} />
        ) : (
            <input type={type} name={name} value={value} onChange={onChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] outline-none" placeholder={placeholder} />
        )}
    </div>
);

const OthersManager = () => {
    const { token } = useAdmin();
    
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

    // Tracking loading, success, and error states for each section
    const [sectionStates, setSectionStates] = useState({
        bio: { loading: false, success: '', error: '' },
        contact: { loading: false, success: '', error: '' },
        socials: { loading: false, success: '', error: '' },
        expertise: { loading: false, success: '', error: '' },
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/settings`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success && data.data) {
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
        
        // Reset section status when editing
        const sectionMap = {
            bio: 'bio',
            contactEmail: 'contact', phone: 'contact', location: 'contact',
            github: 'socials', linkedin: 'socials', twitter: 'socials',
            services: 'expertise', technologies: 'expertise', skills: 'expertise', languages: 'expertise', hobbies: 'expertise'
        };
        const section = sectionMap[name];
        if (section) {
            updateSectionStatus(section, 'success', '');
            updateSectionStatus(section, 'error', '');
        }
    };

    const updateSectionStatus = (section, key, value) => {
        setSectionStates(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const handleSaveSection = async (section, e) => {
        e.preventDefault();
        updateSectionStatus(section, 'loading', true);
        updateSectionStatus(section, 'success', '');
        updateSectionStatus(section, 'error', '');

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
            const response = await fetch(`${API_BASE_URL}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                updateSectionStatus(section, 'success', 'Saved successfully.');
            } else {
                updateSectionStatus(section, 'error', result.message || 'Failed to update section.');
            }
        } catch (err) {
            updateSectionStatus(section, 'error', err.message);
        } finally {
            updateSectionStatus(section, 'loading', false);
        }
    };

    const renderFeedback = (section) => {
        const { success, error } = sectionStates[section];
        if (success) {
            return (
                <span className="flex items-center gap-1 text-[var(--color-cyber-emerald)] font-mono text-xs animate-pulse">
                    <CheckCircle size={14} /> {success}
                </span>
            );
        }
        if (error) {
            return (
                <span className="flex items-center gap-1 text-red-400 font-mono text-xs">
                    <AlertTriangle size={14} /> {error}
                </span>
            );
        }
        return null;
    };

    return (
        <div className="pb-32 px-6 md:px-12 max-w-5xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Settings</span>
                    </h1>
                </div>
            </div>

            <div className="space-y-12">
                {/* 1. Bio Section */}
                <form onSubmit={(e) => handleSaveSection('bio', e)} className="bg-[#0f172a] rounded-2xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <SectionHeader icon={User} title="Personal Information" />
                    
                    <div className="space-y-6">
                        <InputField label="Personal Bio" name="bio" type="textarea" placeholder="A brief introduction about yourself..." value={formData.bio} onChange={handleInputChange} />
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                            <div>{renderFeedback('bio')}</div>
                            <button type="submit" disabled={sectionStates.bio.loading} className="px-6 py-3 rounded-lg bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2">
                                {sectionStates.bio.loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Bio
                            </button>
                        </div>
                    </div>
                </form>

                {/* 2. Contact Details */}
                <form onSubmit={(e) => handleSaveSection('contact', e)} className="bg-[#0f172a] rounded-2xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <SectionHeader icon={Phone} title="Contact Details" />
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Contact Email" name="contactEmail" type="email" placeholder="hello@example.com" value={formData.contactEmail} onChange={handleInputChange} />
                            <InputField label="Phone Number" name="phone" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleInputChange} />
                            <div className="md:col-span-2">
                                <InputField label="Location" name="location" placeholder="City, Country" value={formData.location} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                            <div>{renderFeedback('contact')}</div>
                            <button type="submit" disabled={sectionStates.contact.loading} className="px-6 py-3 rounded-lg bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2">
                                {sectionStates.contact.loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Contact
                            </button>
                        </div>
                    </div>
                </form>

                {/* 3. Socials & Platforms */}
                <form onSubmit={(e) => handleSaveSection('socials', e)} className="bg-[#0f172a] rounded-2xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <SectionHeader icon={Share2} title="Social & Platforms" />
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="GitHub URL" name="github" placeholder="https://github.com/..." value={formData.github} onChange={handleInputChange} />
                            <InputField label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={handleInputChange} />
                            <div className="md:col-span-2">
                                <InputField label="Twitter / X URL" name="twitter" placeholder="https://twitter.com/..." value={formData.twitter} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                            <div>{renderFeedback('socials')}</div>
                            <button type="submit" disabled={sectionStates.socials.loading} className="px-6 py-3 rounded-lg bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2">
                                {sectionStates.socials.loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Socials
                            </button>
                        </div>
                    </div>
                </form>

                {/* 4. Attributes & Expertise */}
                <form onSubmit={(e) => handleSaveSection('expertise', e)} className="bg-[#0f172a] rounded-2xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <SectionHeader icon={Code} title="Attributes & Expertise (Comma Separated)" />
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Services Offered" name="services" placeholder="Web Development, UI/UX Design..." value={formData.services} onChange={handleInputChange} />
                            <InputField label="Core Technologies" name="technologies" placeholder="React, Node.js, Python..." value={formData.technologies} onChange={handleInputChange} />
                            <InputField label="General Skills" name="skills" placeholder="Project Management, Agile..." value={formData.skills} onChange={handleInputChange} />
                            <InputField label="Languages Spoken" name="languages" placeholder="English, Spanish..." value={formData.languages} onChange={handleInputChange} />
                        </div>
                        <InputField label="Hobbies & Interests" name="hobbies" placeholder="Photography, Gaming..." value={formData.hobbies} onChange={handleInputChange} />

                        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                            <div>{renderFeedback('expertise')}</div>
                            <button type="submit" disabled={sectionStates.expertise.loading} className="px-6 py-3 rounded-lg bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2">
                                {sectionStates.expertise.loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Expertise
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OthersManager;