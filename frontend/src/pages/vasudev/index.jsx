import { useState, useEffect } from 'react';
import { AdminProvider, useAdmin } from './AdminContext';
import AdminLogin from './AdminLogin';
import ProjectManager from './ProjectManager';
import EducationManager from './EducationManager';
import AdminDashboardHome from './AdminDashboardHome';
import ExperienceManager from './ExperienceManager';
import CertificationsManager from './CertificationsManager';
import OthersManager from './OthersManager';
import MessagesManager from './MessagesManager';
import { LayoutDashboard, Briefcase, GraduationCap, LogOut, Building, Award, Layers, MessageSquare } from 'lucide-react';

const AdminLayout = ({ children, currentView, setCurrentView }) => {
    const { logout } = useAdmin();

    return (
        <div className="min-h-screen bg-black">
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-cyber-emerald)] animate-pulse shadow-[0_0_10px_var(--color-cyber-emerald)]"></div>
                        <span className="text-white font-black uppercase tracking-widest text-lg">
                            Sys<span className="text-[var(--color-cyber-emerald)]">Admin</span>
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <button 
                            onClick={() => setCurrentView('home')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'home' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <LayoutDashboard size={16} /> Home
                        </button>
                        <button 
                            onClick={() => setCurrentView('messages')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'messages' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <MessageSquare size={16} /> Messages
                        </button>
                        <button 
                            onClick={() => setCurrentView('projects')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'projects' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Briefcase size={16} /> Projects
                        </button>
                        <button 
                            onClick={() => setCurrentView('education')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'education' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <GraduationCap size={16} /> Education
                        </button>
                        <button 
                            onClick={() => setCurrentView('experience')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'experience' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Building size={16} /> Experience
                        </button>
                        <button 
                            onClick={() => setCurrentView('certifications')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'certifications' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Award size={16} /> Certifications
                        </button>
                        <button 
                            onClick={() => setCurrentView('others')}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'others' ? 'text-[var(--color-cyber-emerald)] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Layers size={16} /> Others
                        </button>
                        <button 
                            onClick={logout} 
                            className="ml-0 md:ml-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all font-bold uppercase tracking-widest text-xs"
                        >
                            <LogOut size={14} /> Exit
                        </button>
                    </div>
                </div>
            </nav>
            <div className="pt-32 md:pt-24">
                {children}
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const { isAuthenticated } = useAdmin();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    // Sync loginSuccess state when user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            setLoginSuccess(false);
        }
    }, [isAuthenticated]);

    // Scroll to top when switching views in the admin panel
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
    }, [currentView]);

    if (!isAuthenticated && !loginSuccess) {
        return <AdminLogin onLoginSuccess={() => setLoginSuccess(true)} />;
    }

    return (
        <AdminLayout currentView={currentView} setCurrentView={setCurrentView}>
            {currentView === 'home' && <AdminDashboardHome />}
            {currentView === 'messages' && <MessagesManager />}
            {currentView === 'projects' && <ProjectManager />}
            {currentView === 'education' && <EducationManager />}
            {currentView === 'experience' && <ExperienceManager />}
            {currentView === 'certifications' && <CertificationsManager />}
            {currentView === 'others' && <OthersManager />}
        </AdminLayout>
    );
};

// Wrapper component to provide context
const AdminPanel = () => {
    return (
        <AdminProvider>
            <AdminDashboard />
        </AdminProvider>
    );
};

export default AdminPanel;
