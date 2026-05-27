import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { Trash2, CheckCircle, AlertTriangle, MessageSquare, X, Mail, Calendar, User } from 'lucide-react';

const MessagesManager = () => {
    const { token } = useAdmin();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewMessage, setViewMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setMessages(data.data);
            } else {
                console.warn(data.message);
            }
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (data.success) {
                    fetchMessages();
                    if (viewMessage?._id === id) setViewMessage(null);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="pb-32 px-6 md:px-12 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                        Communication <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-emerald)] to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Center</span>
                    </h1>
                </div>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 font-mono text-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            {/* Message Detail View */}
            {viewMessage && (
                <div className="bg-[#0f172a] rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                            <MessageSquare size={24} className="text-[var(--color-cyber-emerald)]"/> Message Details
                        </h2>
                        <button onClick={() => setViewMessage(null)} className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-slate-800 pb-8">
                        <div className="space-y-2">
                            <span className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><User size={14} /> Sender Name</span>
                            <p className="text-white text-lg font-medium">{viewMessage.name}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><Mail size={14} /> Email Address</span>
                            <p className="text-white text-lg font-medium">
                                <a href={`mailto:${viewMessage.email}`} className="text-blue-400 hover:underline">{viewMessage.email}</a>
                            </p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <span className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><Calendar size={14} /> Date Received</span>
                            <p className="text-slate-400 font-mono text-sm">{new Date(viewMessage.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <span className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest">Message Content</span>
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {viewMessage.message}
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4 pt-4 border-t border-slate-800">
                        <button onClick={() => handleDelete(viewMessage._id)} className="px-6 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <Trash2 size={16} /> Delete Message
                        </button>
                    </div>
                </div>
            )}

            {/* Inbox Table */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between bg-slate-900/50">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <CheckCircle size={20} className="text-[var(--color-cyber-emerald)]" /> Inbox
                    </h2>
                </div>
                
                {loading && !messages.length ? (
                    <div className="p-12 text-center text-[var(--color-cyber-emerald)] font-mono animate-pulse uppercase tracking-widest">
                        Syncing Communications...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-4">
                        <MessageSquare size={32} className="text-slate-600" />
                        No messages found in inbox.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-950 border-b border-slate-800">
                                <tr>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Sender</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Email</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em]">Date</th>
                                    <th className="py-5 px-6 text-[var(--color-cyber-emerald)] font-mono text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((msg) => (
                                    <tr key={msg._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer" onClick={() => setViewMessage(msg)}>
                                        <td className="py-5 px-6 font-bold text-white">{msg.name}</td>
                                        <td className="py-5 px-6 text-slate-400">{msg.email}</td>
                                        <td className="py-5 px-6 text-slate-500 font-mono text-sm">{new Date(msg.createdAt).toLocaleDateString()}</td>
                                        <td className="py-5 px-6 text-right">
                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
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

export default MessagesManager;