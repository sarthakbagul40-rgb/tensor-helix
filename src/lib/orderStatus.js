import { CheckCircle2, ChefHat, Clock, PackageCheck, Truck, XCircle } from 'lucide-react';

export const ORDER_STATUS = {
  pending: {
    label: 'Placed',
    progress: 12,
    tone: 'bg-amber-50 text-amber-700 border-amber-100',
    title: 'Order received',
    detail: 'We have received your order and will confirm it shortly.',
    icon: Clock,
  },
  placed: {
    label: 'Placed',
    progress: 12,
    tone: 'bg-amber-50 text-amber-700 border-amber-100',
    title: 'Order received',
    detail: 'We have received your order and will confirm it shortly.',
    icon: Clock,
  },
  accepted: {
    label: 'Accepted',
    progress: 28,
    tone: 'bg-blue-50 text-blue-700 border-blue-100',
    title: 'Kitchen accepted',
    detail: 'Your order is confirmed and queued in the kitchen.',
    icon: CheckCircle2,
  },
  preparing: {
    label: 'Preparing',
    progress: 58,
    tone: 'bg-orange-50 text-orange-700 border-orange-100',
    title: 'Freshly preparing',
    detail: 'The biryani is being prepared with fresh ingredients.',
    icon: ChefHat,
  },
  out_for_delivery: {
    label: 'Out for delivery',
    progress: 84,
    tone: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    title: 'Out for delivery',
    detail: 'Your order has left the kitchen and is on the way.',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    progress: 100,
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    title: 'Delivered',
    detail: 'Enjoy your feast. Thank you for ordering with us.',
    icon: PackageCheck,
  },
  cancelled: {
    label: 'Cancelled',
    progress: 100,
    tone: 'bg-red-50 text-red-700 border-red-100',
    title: 'Order cancelled',
    detail: 'This order was cancelled. Contact us if this looks wrong.',
    icon: XCircle,
  },
};

export const ORDER_STATUS_FLOW = [
  'placed',
  'accepted',
  'preparing',
  'out_for_delivery',
  'delivered',
];

export const normalizeOrderStatus = (status) => {
  const cleanStatus = String(status || 'placed').toLowerCase();
  return ORDER_STATUS[cleanStatus] ? cleanStatus : 'placed';
};

export const getOrderStatusMeta = (status) => ORDER_STATUS[normalizeOrderStatus(status)];

export const getOrderItems = (order) => {
  if (Array.isArray(order?.items)) return order.items;
  if (Array.isArray(order?.items?.cart)) return order.items.cart;
  return [];
};

export const getOrderCustomer = (order) => {
  const embedded = order?.items?.customer || {};
  return {
    name: order?.customer_name || embedded.name || 'Guest',
    phone: order?.customer_phone || order?.phone || embedded.phone || '',
    address: order?.address_line || order?.address || embedded.address || '',
  };
};

export const formatOrderId = (id) => `#${String(id || '').slice(-6).toUpperCase()}`;
