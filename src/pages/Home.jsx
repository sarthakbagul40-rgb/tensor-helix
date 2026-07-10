import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Plus, ShoppingCart, Heart, Filter, Flame, Clock, Loader2, ChevronRight, Sparkles, Smile, Zap, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';

const CATEGORIES = ['All', 'Thali', 'Main Course', 'Starter', 'Add-ons'];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const addToCart = useCartStore(state => state.addToCart);
  const cart = useCartStore(state => state.cart);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [moodResult, setMoodResult] = useState(null);
  const [isCruncing, setIsCrunching] = useState(false);

  useEffect(() => {
    fetchMenu();




  }, []);

  const fetchMenu = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }); // Latest first
    
    if (data && !error) {
      // Deduplicate by name, preferring local assets for thalis
      const uniqueItems = data.reduce((acc, current) => {
        const x = acc.find(item => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          // If duplicate, prefer the one with the local image path
          if (current.image_url.startsWith('/assets/') && !x.image_url.startsWith('/assets/')) {
            const index = acc.indexOf(x);
            acc[index] = current;
          }
          return acc;
        }
      }, []);
      setMenuItems(uniqueItems.filter(item => item.category !== 'ARCHIVED'));
    }
    setIsLoading(false);
  };

  const filteredItems = menuItems.filter(item => {
    // 1. HARD CATEGORY BLOCK (Mutton, Signature, Chicken, Egg, Veg)
    if (['Mutton', 'Signature', 'Chicken', 'Egg', 'Veg'].includes(item.category)) return false;
    if (item.name.toLowerCase().includes('mutton')) return false;

    // 2. SEARCH & CATEGORY FILTER
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleMoodSelect = (mood) => {
    setIsCrunching(true);
    setMoodResult(null);
    
    // Luxury simulation delay
    setTimeout(() => {
      let match = null;
      if (mood === 'spicy') {
        match = menuItems.find(item => item.name.toLowerCase().includes('chicken')) || menuItems[0];
      } else if (mood === 'mild') {
        match = menuItems.find(item => item.category === 'Thali' || item.name.toLowerCase().includes('egg')) || menuItems[1];
      } else if (mood === 'light') {
        match = menuItems.find(item => item.category === 'Starter' || item.category === 'Add-ons') || menuItems[2];
      } else {
        match = menuItems[Math.floor(Math.random() * menuItems.length)];
      }
      
      setMoodResult(match);
      setIsCrunching(false);
    }, 2000);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-32">
      {/* Refined Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 pt-12 pb-6 sticky top-0 z-50 border-b border-white/20">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f4c430] rounded-full flex items-center justify-center saffron-glow overflow-hidden border-2 border-white">
               <img 
                src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.email || 'guest'}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
               />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-primary fill-primary" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Heritage Lane, Mumbai</p>
                <ChevronRight size={10} className="text-slate-300" />
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase mt-0.5">
                {user?.user_metadata?.full_name?.split(' ')[0] || 'Delicious'} Biryani
              </h1>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/checkout')}
            className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg relative"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </header>

        {/* Industry-Leading Search Experience */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search for biryani, starters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/50 border border-slate-200/50 rounded-full py-3.5 pl-12 pr-12 text-sm font-medium text-slate-800 transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
             <Sparkles size={18} onClick={() => setIsMoodModalOpen(true)} className="cursor-pointer" />
          </div>
        </div>

        {/* Circular "Discovery" Categories */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 -mx-2 px-2 items-center">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex flex-col items-center gap-2 group shrink-0"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                activeCategory === cat 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/30 scale-110' 
                  : 'bg-white border-slate-100 group-hover:border-primary/20 bg-slate-50'
              }`}>
                {cat === 'All' && <Flame size={20} className={activeCategory === cat ? 'text-white' : 'text-slate-400'} />}
                {cat === 'Thali' && <Coffee size={20} className={activeCategory === cat ? 'text-white' : 'text-slate-400'} />}
                {cat === 'Main Course' && <Zap size={20} className={activeCategory === cat ? 'text-white' : 'text-slate-400'} />}
                {cat === 'Starter' && <Smile size={20} className={activeCategory === cat ? 'text-white' : 'text-slate-400'} />}
                {cat === 'Add-ons' && <Plus size={20} className={activeCategory === cat ? 'text-white' : 'text-slate-400'} />}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                activeCategory === cat ? 'text-primary' : 'text-slate-400'
              }`}>
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>


      <div className="px-6 py-8">
        {/* Special Banner */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="bg-slate-900 rounded-[32px] p-6 mb-10 relative overflow-hidden text-white shadow-2xl shadow-slate-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
             <div className="relative z-10">
               <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">Chef's Choice</span>
               <h3 className="text-2xl font-black mt-3 mb-2 tracking-tighter uppercase italic">Legendary Dum Biryani</h3>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Original Recipes Since 1994 ✨</p>
               <button className="bg-white text-slate-900 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  Explore Menu <ChevronRight size={14} />
               </button>
             </div>
          </div>
        )}

        <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center justify-between">
          <span>{searchQuery ? `Searching for "${searchQuery}"` : activeCategory === 'All' ? 'Sensational Picks' : `${activeCategory} Creations`}</span>
          {isLoading && <Loader2 className="animate-spin text-primary" size={20} />}
        </h2>

        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // 🏗️ SKELETON LOADING STATE
              Array.from({ length: 4 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 animate-pulse">
                  <div className="w-28 h-28 bg-slate-100 rounded-2xl shrink-0" />
                  <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                      <div className="h-3 bg-slate-50 rounded-lg w-1/2" />
                      <div className="h-2 bg-slate-50 rounded-lg w-1/4" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-slate-100 rounded-lg w-16" />
                      <div className="h-10 bg-slate-100 rounded-xl w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => navigate(`/details/${item.id}`)}
                  className={`flex bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 transition-all active:scale-[0.98] cursor-pointer relative ${!item.is_in_stock ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    {!item.is_in_stock && (
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-[8px] text-white font-black uppercase tracking-widest text-center px-1">
                         Wait for Next Batch
                      </div>
                    )}
                    {item.is_special && (
                      <div className="absolute top-0 left-0 bg-primary text-slate-900 px-2 py-0.5 rounded-br-lg text-[8px] font-black uppercase tracking-widest">
                        Bestseller
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{item.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock size={10} className="text-emerald-500" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">20-Min Fresh Delivery</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60">
                        <Star className="text-yellow-400 fill-yellow-400" size={10} />
                        <span className="text-[9px] font-bold text-slate-600">4.8 (50+)</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-lg font-black text-slate-900 leading-none">₹{item.price}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); if(item.is_in_stock) addToCart({ ...item, title: item.name, image: item.image_url }); }}
                        disabled={!item.is_in_stock}
                        className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-6 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all saffron-glow active:scale-95"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          
          {filteredItems.length === 0 && !isLoading && (
            <div className="text-center py-20 opacity-30">
               <Filter className="mx-auto mb-4" size={48} />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Biryani found</p>
            </div>
          )}
        </div>
      </div>
      {/* MOOD MODAL */}
      <AnimatePresence>
        {isMoodModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoodModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2 italic">Mood Magic</h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8">What are you craving today?</p>

                {!moodResult && !isCruncing ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'spicy', label: 'Spicy & Bold', sub: 'Chicken Fire', icon: <Flame size={18} /> },
                      { id: 'mild', label: 'Rich & Creamy', sub: 'Soul Food', icon: <Smile size={18} /> },
                      { id: 'light', label: 'Healthy & Light', sub: 'Fast Fuel', icon: <Zap size={18} /> },
                      { id: 'surprise', label: 'Chef Choice', sub: 'Mystery Feast', icon: <Sparkles size={18} /> }
                    ].map(mood => (
                      <button 
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.id)}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-3xl text-left hover:border-primary/30 transition-all group"
                      >
                        <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{mood.icon}</div>
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{mood.label}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{mood.sub}</p>
                      </button>
                    ))}
                  </div>
                ) : isCruncing ? (
                  <div className="py-12 space-y-4">
                    <Loader2 size={40} className="animate-spin text-primary mx-auto" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse italic">Scanning flavors...</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="relative h-48 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200">
                      <img src={moodResult.image_url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <p className="text-white text-xs font-black uppercase tracking-tighter">{moodResult.name}</p>
                        <p className="text-white/80 text-[8px] font-bold uppercase tracking-widest leading-none">Perfect Match Found</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => { setIsMoodModalOpen(false); navigate(`/details/${moodResult.id}`); }}
                      className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-300"
                    >
                      Taste The Magic 🪄
                    </button>
                    
                    <button 
                      onClick={() => setMoodResult(null)}
                      className="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                    >
                      Try Another Choice
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
