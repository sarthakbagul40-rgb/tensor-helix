import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

const Profile = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuthStore();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-white px-6 flex flex-col items-center justify-center text-center font-sans">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 font-sans">
                    <User size={40} />
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-2">Not Logged In</h2>
                <p className="text-slate-500 mb-8 font-medium">Join us to track your orders and save addresses!</p>
                <button 
                    onClick={() => navigate('/auth')}
                    className="bg-primary text-white px-8 py-3 rounded-twelve font-black shadow-lg shadow-primary/30"
                >
                    Login / Signup
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-8 rounded-b-[32px] shadow-sm">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 border border-slate-100 rounded-twelve flex items-center justify-center text-slate-800 mb-6"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-twelve bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{user.user_metadata?.full_name || 'Foodie'}</h1>
                        <p className="text-slate-400 font-bold text-sm flex items-center gap-1 uppercase tracking-wider">
                            <Mail size={12} className="text-primary" /> {user.email}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-8 space-y-4">
                {/* Info Cards */}
                <div className="bg-white p-5 rounded-twelve border border-slate-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black text-slate-900 leading-none uppercase text-xs tracking-widest text-slate-400">Account Info</h3>
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest underline">Edit</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                                <p className="font-bold text-slate-700 text-sm">{user.user_metadata?.phone || '+91 - Add Phone'}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saved Address</p>
                                <p className="font-bold text-slate-700 text-sm truncate max-w-[200px]">{user.user_metadata?.address || 'Set your primary address'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Preview */}
                <button onClick={() => navigate('/orders')} className="w-full text-left bg-white p-5 rounded-twelve border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-black text-slate-900 leading-none">Order History</h3>
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                        View previous orders, current status, <br/> delivery details, and item totals.
                    </p>
                </button>

                {/* Sign Out */}
                <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignOut}
                    className="w-full bg-red-50 text-red-500 p-5 rounded-twelve font-black text-lg flex justify-between items-center border border-red-100 mt-8 transition-colors hover:bg-red-100"
                >
                    <span>Sign Out</span>
                    <LogOut size={20} />
                </motion.button>

                <p className="text-center text-[10px] text-slate-300 font-bold uppercase mt-6 tracking-[0.2em]">
                    Powered by Tensor Helix Architecture
                </p>
            </div>
        </div>
    );
};

export default Profile;
