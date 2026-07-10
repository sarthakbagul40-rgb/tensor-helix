import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';

const Layout = () => {
  const location = useLocation();
  const cart = useCartStore((state) => state.cart);
  const { user } = useAuthStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders', badge: cartCount > 0 ? cartCount : null },
    { icon: User, label: 'Profile', path: '/profile', isProfile: true }
  ];

  return (
    <div className="min-h-screen bg-white pb-24 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card mx-4 mb-6 rounded-twelve py-3 px-6 flex justify-between items-center safe-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`relative flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 font-medium'}`}
            >
              {item.isProfile && user ? (
                <div className={`w-6 h-6 rounded-full border-2 overflow-hidden ${isActive ? 'border-primary' : 'border-slate-200'}`}>
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ) : (
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              )}
              <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
