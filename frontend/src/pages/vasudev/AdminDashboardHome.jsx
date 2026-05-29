import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Shield, Activity, Database, Server, Globe, Users, Briefcase, GraduationCap, Building, Award, Layers, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const AdminDashboardHome = () => {
    const { admin, token } = useAdmin();
    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        education: 0,
        certifications: 0,
        messages: 0,
        settings: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const headers = { Authorization: `Bearer ${token}` };
                
                // Fetch data lengths from all endpoints simultaneously
                const [projRes, expRes, eduRes, certRes, settingsRes, msgRes] = await Promise.allSettled([
                    fetch(`${API_BASE_URL}/projects/admin/all`, { headers }),
                    fetch(`${API_BASE_URL}/experience`, { headers }),
                    fetch(`${API_BASE_URL}/education`, { headers }),
                    fetch(`${API_BASE_URL}/certifications`, { headers }),
                    fetch(`${API_BASE_URL}/settings`, { headers }),
                    fetch(`${API_BASE_URL}/messages`, { headers })
                ]);

                const getCount = async (res) => {
                    if (res.status === 'fulfilled' && res.value.ok) {
                        const data = await res.value.json();
                        return data.data ? data.data.length : 0;
                    }
                    return 0;
                };

                const getSettingsData = async (res) => {
                    if (res.status === 'fulfilled' && res.value.ok) {
                        const data = await res.value.json();
                        return data.data || null;
                    }
                    return null;
                };

                setStats({
                    projects: await getCount(projRes),
                    experience: await getCount(expRes),
                    education: await getCount(eduRes),
                    certifications: await getCount(certRes),
                    messages: await getCount(msgRes),
                    settings: await getSettingsData(settingsRes),
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchStats();
        }
    }, [token]);

    return (
        <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-cyber-emerald)]/10 border border-[var(--color-cyber-emerald)]/30 text-[var(--color-cyber-emerald)] text-xs font-mono font-bold uppercase tracking-widest mb-4">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-cyber-emerald)] animate-pulse"></div>
                        System Active
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Center</span>
                    </h1>
                </div>
            </div>

            {/* Real-time Data Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyber-emerald)]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MessageSquare size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Messages</h3>
                    <div className="text-4xl font-black text-white mb-2">{loading ? <span className="animate-pulse text-slate-600">...</span> : stats.messages}</div>
                    <p className="text-[var(--color-cyber-emerald)] text-xs font-mono">Inbox Messages</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyber-emerald)]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Projects</h3>
                    <div className="text-4xl font-black text-white mb-2">{loading ? <span className="animate-pulse text-slate-600">...</span> : stats.projects}</div>
                    <p className="text-[var(--color-cyber-emerald)] text-xs font-mono">Active Records</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyber-emerald)]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Experience</h3>
                    <div className="text-4xl font-black text-white mb-2">{loading ? <span className="animate-pulse text-slate-600">...</span> : stats.experience}</div>
                    <p className="text-[var(--color-cyber-emerald)] text-xs font-mono">Active Records</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyber-emerald)]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Education</h3>
                    <div className="text-4xl font-black text-white mb-2">{loading ? <span className="animate-pulse text-slate-600">...</span> : stats.education}</div>
                    <p className="text-[var(--color-cyber-emerald)] text-xs font-mono">Active Records</p>
                </div>

                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyber-emerald)]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Award size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Certifications</h3>
                    <div className="text-4xl font-black text-white mb-2">{loading ? <span className="animate-pulse text-slate-600">...</span> : stats.certifications}</div>
                    <p className="text-[var(--color-cyber-emerald)] text-xs font-mono">Active Records</p>
                </div>
            </div>

            {/* Global Settings / Others Overview */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] p-8 md:p-10 mb-12">
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Layers size={24} className="text-[var(--color-cyber-emerald)]" />
                    Global Settings Overview
                </h2>
                {loading ? (
                    <div className="animate-pulse flex gap-4 items-center">
                        <div className="h-4 w-4 bg-[var(--color-cyber-emerald)]/50 rounded-full"></div>
                        <div className="text-slate-600 font-mono uppercase tracking-widest text-sm">Loading profile data...</div>
                    </div>
                ) : stats.settings ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div>
                            <h4 className="text-[var(--color-cyber-emerald)] text-xs font-mono font-bold uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Personal Bio</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap line-clamp-4">
                                {stats.settings.bio || 'Not configured'}
                            </p>
                            
                            <h4 className="text-[var(--color-cyber-emerald)] text-xs font-mono font-bold uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Contact Identity</h4>
                            <div className="text-slate-300 text-sm space-y-2 font-mono">
                                <p><strong className="text-slate-500 mr-2">Email:</strong> {stats.settings.contactEmail || 'N/A'}</p>
                                <p><strong className="text-slate-500 mr-2">Phone:</strong> {stats.settings.phone || 'N/A'}</p>
                                <p><strong className="text-slate-500 mr-2">Base:</strong> {stats.settings.location || 'N/A'}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[var(--color-cyber-emerald)] text-xs font-mono font-bold uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Attributes Matrix</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-[var(--color-cyber-emerald)]/30 transition-colors">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{stats.settings.skills?.length || 0}</div>
                                        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Skills</div>
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-[var(--color-cyber-emerald)]/30 transition-colors">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{stats.settings.technologies?.length || 0}</div>
                                        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Technologies</div>
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-[var(--color-cyber-emerald)]/30 transition-colors">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{stats.settings.services?.length || 0}</div>
                                        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Services</div>
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-[var(--color-cyber-emerald)]/30 transition-colors">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{stats.settings.languages?.length || 0}</div>
                                        <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Languages</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-slate-500 font-mono text-sm bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed flex items-center gap-4">
                        <Activity size={24} className="text-slate-600" />
                        Global settings not configured yet. Visit the 'Others' tab to initialize.
                    </div>
                )}
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Database size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">System Status</h3>
                    <div className="text-3xl font-black text-white mb-2">ONLINE</div>
                    <p className="text-emerald-400 text-xs font-mono">All services operational</p>
                </div>
                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Auth Level</h3>
                    <div className="text-3xl font-black text-white mb-2">{admin?.role || 'SUPER_ADMIN'}</div>
                    <p className="text-emerald-400 text-xs font-mono">Maximum clearance granted</p>
                </div>
                <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={64} className="text-[var(--color-cyber-emerald)]" />
                    </div>
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-2">Network</h3>
                    <div className="text-3xl font-black text-white mb-2">SECURE</div>
                    <p className="text-emerald-400 text-xs font-mono">Encrypted connection</p>
                </div>
            </div>
            
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] p-8 md:p-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Server size={24} className="text-[var(--color-cyber-emerald)]" />
                    Quick Actions
                </h2>
                <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed font-medium">
                    Welcome to your portfolio command center. From here you can manage your projects repository, update your educational history, and monitor your system's health. Select a module from the navigation bar above to begin.
                </p>
                <div className="flex flex-wrap gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-sm">
                        <Globe size={16} className="text-blue-400" /> Web Interface Active
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-sm">
                        <Users size={16} className="text-purple-400" /> Session: {admin?.email || 'Authorized Access'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;