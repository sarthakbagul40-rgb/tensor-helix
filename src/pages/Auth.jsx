import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, ShieldCheck, ArrowRight, Loader2, ChevronLeft, User, Lock, Sparkles, Flame, History, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signUp } = useAuthStore();
    
    const from = location.state?.from?.pathname || "/";

    const [mode, setMode] = useState('phone'); // 'phone', 'login', 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        fullName: ''
    });

    const handleIdentify = (e) => {
        e.preventDefault();
        if (formData.phone.length < 10) {
            setError("The legend requires a 10-digit number.");
            return;
        }
        setError(null);
        // "Discovery" flow: We switch to a combined view that feels like 'detection'
        setMode('gate');
    };

    const handleAuth = async (isNewUser) => {
        setIsLoading(true);
        setError(null);
        
        try {
            if (!isNewUser) {
                await signIn(formData.phone, formData.password);
            } else {
                if (!formData.fullName) throw new Error("Please tell us your name.");
                await signUp(formData.phone, formData.password, formData.fullName);
            }
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Auth error:', err);
            let message = err.message || "The gate remains closed.";
            
            if (message.toLowerCase().includes("email not confirmed")) {
                message = "IDENTITY GATE LOCKED: Please disable 'Confirm Email' in Supabase Auth Settings.";
            } else if (message.toLowerCase().includes("rate limit")) {
                message = "CAPACITY OVERLOAD: Too many attempts. Please wait 60s.";
            } else if (message.toLowerCase().includes("invalid login credentials")) {
                message = "ACCESS DENIED: Wrong phone or security cipher.";
            }
            
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#FFFDF9] flex flex-col overflow-hidden font-sans">
            {/* Heritage Background Elements */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-[#f4c430] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ba4a00] rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen px-8 pt-16 pb-24">
                {/* Minimalist Navigation */}
                <header className="flex items-center justify-between mb-12">
                    <button 
                        onClick={() => mode !== 'phone' ? setMode('phone') : navigate('/')}
                        className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#f4c430]/10 rounded-full border border-[#f4c430]/20">
                        <ShieldCheck size={12} className="text-primary" />
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] leading-none">Heritage Vault</span>
                    </div>
                </header>

                <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                    <AnimatePresence mode="wait">
                        {mode === 'phone' ? (
                            <motion.div 
                                key="phone-gate"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="space-y-8 text-center"
                            >
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-[#f4c430] rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl saffron-glow relative">
                                        <ChefHat size={32} />
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1] }} 
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="absolute -top-1 -right-1"
                                        >
                                            <Sparkles className="text-white fill-white" size={16} />
                                        </motion.div>
                                    </div>
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">
                                        The Feast <br/>
                                        <span className="text-primary italic">Awaits</span>
                                    </h1>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">
                                        Reconnect with the legendary <br/> kitchen of Mumbai.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative group">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                                        <input 
                                            type="tel"
                                            placeholder="98765 43210"
                                            maxLength={10}
                                            required
                                            value={formData.phone}
                                            onChange={(e) => { 
                                                setError(null);
                                                setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                                            }}
                                            className="w-full bg-white border border-slate-100 rounded-3xl py-6 pl-14 pr-6 text-slate-900 font-black text-xl focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-200 tracking-widest shadow-sm"
                                        />
                                        {formData.phone.length === 10 && (
                                            <motion.div 
                                                initial={{ scale: 0 }} 
                                                animate={{ scale: 1 }}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500"
                                            >
                                                <ShieldCheck size={20} />
                                            </motion.div>
                                        )}
                                    </div>

                                    {error && (
                                        <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest leading-none">
                                            {error}
                                        </p>
                                    )}

                                    <button 
                                        onClick={handleIdentify}
                                        disabled={formData.phone.length < 10}
                                        className="w-full bg-slate-900 text-white p-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] flex justify-between items-center group transition-all active:scale-95 disabled:opacity-20"
                                    >
                                        <span className="italic">Verify Access</span>
                                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                                            <ArrowRight size={16} strokeWidth={3} />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="gate-flow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                     <div className="flex items-center gap-2">
                                        <History size={14} className="text-primary" />
                                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">+91 {formData.phone}</h2>
                                     </div>
                                     <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">
                                        Enter Your <br/>
                                        <span className="text-primary">Credentials</span>
                                     </h1>
                                </div>

                                <div className="space-y-5 bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input 
                                                type="password"
                                                placeholder="SECURITY CIPHER"
                                                required
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-black text-sm focus:outline-none focus:border-primary/30"
                                            />
                                        </div>

                                        {/* Auto-Expanding Signup Fields */}
                                        <div className="space-y-4">
                                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-1">First time here? Fill name below to join</p>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                <input 
                                                    type="text"
                                                    placeholder="YOUR NAME (GUESTS ONLY)"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-black text-[10px] focus:outline-none focus:border-primary/30 uppercase tracking-widest placeholder:text-slate-200"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest text-center">
                                            {error}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-3 pt-4">
                                        <button 
                                            onClick={() => handleAuth(false)}
                                            disabled={isLoading || !formData.password}
                                            className="w-full bg-primary text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex justify-between items-center saffron-glow active:scale-95 disabled:opacity-50"
                                        >
                                            <span className="flex items-center gap-3 italic">
                                                {isLoading && <Loader2 className="animate-spin" size={16} />}
                                                Welcome Back
                                            </span>
                                            <ArrowRight size={16} strokeWidth={3} />
                                        </button>

                                        <button 
                                            onClick={() => handleAuth(true)}
                                            disabled={isLoading || !formData.password || !formData.fullName}
                                            className="w-full bg-slate-100 text-slate-400 p-4 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            New Member? Create Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <footer className="mt-auto text-center space-y-6">
                    <div className="flex justify-center gap-6 opacity-10 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-slate-900 border-t border-slate-100 pt-8">
                        <Flame size={14} />
                        <ShieldCheck size={14} />
                        <Sparkles size={14} />
                    </div>
                    <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.4em]">
                        Legendary Culinary Network ✦ Established 1994
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Auth;
