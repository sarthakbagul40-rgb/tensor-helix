import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Package, Truck, Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';

const Success = () => {
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        // Clear cart on mount to reset for next order
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-[#F8F9FB] px-6 flex flex-col items-center justify-center text-center pb-20 pt-12">
            <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-32 h-32 bg-emerald-500 rounded-[40px] flex items-center justify-center text-white mb-10 shadow-2xl shadow-emerald-200"
            >
                <CheckCircle2 size={64} strokeWidth={3} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
                    Feast <span className="text-primary italic">Confirmed</span>
                </h1>
                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-12">
                    Order Syncing with Kitchen Master...
                </p>
            </motion.div>

            {/* Hybrid Info Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="w-full bg-white rounded-[40px] p-8 border border-white shadow-xl shadow-slate-200/50 mb-10 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -mr-10 -mt-10" />
               <div className="flex items-center gap-5 text-left relative z-10">
                  <div className="w-14 h-14 bg-emerald-100 rounded-[22px] flex items-center justify-center text-emerald-600">
                    <MessageCircle size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">WhatsApp Synchronized</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mt-1">
                        Our Chef has received your order details and is currently preparing your meal.
                    </p>
                  </div>
               </div>
            </motion.div>

            <div className="w-full space-y-4 mb-14 text-left">
                {[
                    { icon: Package, title: 'Authenticating Order', time: 'Completed ✓', done: true },
                    { icon: Truck, title: 'Master Kitchen Sync', time: 'In Progress...', done: true, color: 'primary' },
                    { icon: Star, title: 'Final Handover', time: 'Awaiting Pickup', done: false },
                ].map((step, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (i * 0.1) }}
                        key={step.title} 
                        className={`flex items-center gap-5 p-5 rounded-[28px] border transition-all ${step.done ? 'bg-white border-slate-50' : 'bg-slate-50 border-transparent opacity-40'}`}
                    >
                        <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shadow-sm ${step.done ? 'bg-slate-900 text-white' : 'bg-white text-slate-300'}`}>
                            <step.icon size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-sm text-slate-900 uppercase tracking-tight leading-none mb-1.5">{step.title}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{step.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex gap-4 w-full">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="flex-1 bg-slate-900 text-white p-6 rounded-[32px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-slate-300 transition-all hover:bg-slate-800"
                >
                    Back to Menu
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-20 bg-white border border-slate-100 p-6 rounded-[32px] flex items-center justify-center text-slate-400"
                >
                    <Heart size={24} />
                </motion.button>
            </div>
        </div>
    );
};

export default Success;
