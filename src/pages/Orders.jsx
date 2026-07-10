import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Loader2, MapPin, PackageSearch, Phone, Receipt, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import {
  formatOrderId,
  getOrderCustomer,
  getOrderItems,
  getOrderStatusMeta,
  normalizeOrderStatus,
  ORDER_STATUS_FLOW,
} from '../lib/orderStatus';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { lastOrderId, lastOrderTime } = useCartStore();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let channel;

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (user?.id) {
          query = query.eq('user_id', user.id);
        } else if (lastOrderId) {
          query = query.eq('id', lastOrderId);
        } else {
          setOrders([]);
          setIsLoading(false);
          return;
        }

        const { data, error } = await query;
        if (error) throw error;
        setOrders(data || []);
        setSelectedOrderId((current) => current || data?.[0]?.id || null);
      } catch (error) {
        console.error('Order history fetch failed:', error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    if (user?.id) {
      channel = supabase
        .channel(`customer_orders_${user.id}`)
        .on('postgres_changes', { event: '*', table: 'orders', filter: `user_id=eq.${user.id}` }, fetchOrders)
        .subscribe();
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [lastOrderId, user?.id]);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) || orders[0],
    [orders, selectedOrderId],
  );

  const selectedStatus = getOrderStatusMeta(selectedOrder?.status);
  const StatusIcon = selectedStatus.icon;
  const selectedItems = getOrderItems(selectedOrder);
  const customer = getOrderCustomer(selectedOrder);

  const fallbackProgress = lastOrderTime && !selectedOrder
    ? Math.min(Math.round(((Date.now() - new Date(lastOrderTime).getTime()) / (1000 * 60) / 45) * 100), 100)
    : 0;

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-32 font-sans">
      <header className="bg-white px-6 pt-12 pb-6 flex items-center justify-between shadow-sm sticky top-0 z-50 rounded-b-[32px]">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-800"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-black text-slate-900 tracking-[0.2em] uppercase leading-none">Orders</h1>
          <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1.5 opacity-60">Live Kitchen Status</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <ShoppingBag size={20} />
        </div>
      </header>

      <main className="px-6 pt-8 space-y-8 max-w-5xl mx-auto">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="animate-spin text-primary" size={36} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Loading orders</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 text-center shadow-sm">
            <PackageSearch size={56} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">No orders yet</h2>
            <p className="text-sm text-slate-400 font-bold leading-relaxed mb-8">
              Your order history will appear here after checkout.
            </p>
            {lastOrderTime && (
              <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Recent local order</p>
                <p className="text-3xl font-black text-slate-900">{fallbackProgress}%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Estimated progress</p>
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
              <div className="space-y-3">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-1">Order History</h2>
                {orders.map((order) => {
                  const meta = getOrderStatusMeta(order.status);
                  const isSelected = selectedOrder?.id === order.id;
                  return (
                    <button
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`w-full text-left bg-white border p-5 rounded-[28px] transition-all ${
                        isSelected ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-black text-slate-900">{formatOrderId(order.id)}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                        </div>
                        <span className={`border px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${meta.tone}`}>
                          {meta.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-5">
                        <p className="text-2xl font-black text-slate-900">Rs {order.total_amount || 0}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {getOrderItems(order).length} items
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.section
                key={selectedOrder?.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[42px] p-7 lg:p-9 border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className="flex items-start justify-between gap-5 mb-8">
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-2">
                      {formatOrderId(selectedOrder.id)}
                    </p>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedStatus.title}</h2>
                    <p className="text-sm font-bold text-slate-400 mt-2">{selectedStatus.detail}</p>
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <StatusIcon size={26} />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedStatus.progress}%` }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {ORDER_STATUS_FLOW.map((status) => {
                      const activeIndex = ORDER_STATUS_FLOW.indexOf(normalizeOrderStatus(selectedOrder.status));
                      const statusIndex = ORDER_STATUS_FLOW.indexOf(status);
                      return (
                        <div key={status} className={`h-2 rounded-full ${statusIndex <= activeIndex ? 'bg-primary' : 'bg-slate-100'}`} />
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 rounded-3xl p-5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer</p>
                    <p className="font-black text-slate-900">{customer.name}</p>
                    {customer.phone && (
                      <p className="text-xs font-bold text-slate-500 flex items-center gap-2 mt-2">
                        <Phone size={13} /> {customer.phone}
                      </p>
                    )}
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Delivery</p>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed flex gap-2">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      {customer.address || 'Address saved with restaurant'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Items</h3>
                  {selectedItems.map((item, index) => (
                    <div key={`${item.id || item.title}-${index}`} className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <Receipt size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase">{item.title || item.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty {item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-slate-900">Rs {(item.price || 0) * (item.quantity || 1)}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </section>

            <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.3em]">
              Serving Pallava Phase 2 and Lodha Crown
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Orders;
