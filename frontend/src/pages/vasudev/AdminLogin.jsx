import { useState } from 'react';
import { useAdmin } from './AdminContext';
import { Lock, User, Key, AlertTriangle, ShieldCheck } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAdmin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);
        if (result.success) {
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald)] to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-cyber-emerald)]/10 via-black to-black pointer-events-none" />
            
            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative p-10">
                    <div className="absolute -top-10 -right-10 text-[var(--color-cyber-emerald)]/10 pointer-events-none">
                        <ShieldCheck size={160} />
                    </div>
                    
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-cyber-emerald)]/10 border border-[var(--color-cyber-emerald)]/30 text-[var(--color-cyber-emerald)] text-xs font-mono font-bold uppercase tracking-widest mb-6">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-cyber-emerald)] animate-pulse"></div>
                            Restricted Area
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Login</span>
                        </h1>
                        <p className="text-slate-400 mt-2 font-mono text-sm">Enter credentials to access the command center.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 font-mono text-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <AlertTriangle size={18} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2">
                                <User size={14} /> Admin Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 pl-11 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm"
                                    placeholder="Enter admin email"
                                />
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2">
                                <Key size={14} /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 pl-11 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm"
                                    placeholder="••••••••"
                                />
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] mt-8"
                        >
                            {isLoading ? 'Authenticating...' : 'Initialize Session'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
