import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const SERVICE_CENTERS = [
  { name: 'Lakeshore', lat: 19.162, lng: 73.078 },
  { name: 'Downtown', lat: 19.148, lng: 73.080 },
  { name: 'Lodha Crown', lat: 19.136, lng: 73.085 }
];

const MAX_RADIUS_KM = 2.0; // Tight radius for strict complex-level delivery

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const useAddressStore = create((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,

  fetchAddresses: async (userId) => {
    if (!userId) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ addresses: data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addAddress: async (userId, addressData) => {
    const currentAddresses = get().addresses;
    if (currentAddresses.length >= 5) {
      return { success: false, error: "Address limit reached (Max 5). Please delete an old address." };
    }

    set({ isLoading: true, error: null });
    
    try {
      // 1. Geocode the address using Nominatim
      const query = `${addressData.address_line}, Palava Taloja, Maharashtra 421204`;
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      
      const geoRes = await fetch(geoUrl, {
        headers: { 'User-Agent': 'BiryaniApp/1.0 (contact@biryaniapp.local)' }
      });
      const geoData = await geoRes.json();
      
      let lat = addressData.lat;
      let lng = addressData.lng;

      if (!lat && geoData.length > 0) {
        lat = parseFloat(geoData[0].lat);
        lng = parseFloat(geoData[0].lon);
      }

      if (!lat) throw new Error("Could not pinpoint location. Please try adding more details like building name.");

      // 2. Check Serviceability
      const isServiceable = SERVICE_CENTERS.some(center => {
        const dist = calculateDistance(lat, lng, center.lat, center.lng);
        return dist <= MAX_RADIUS_KM;
      });

      // 3. Save to Supabase (Bypass for Test Mode)
      if (userId === '00000000-0000-0000-0000-000000000000') {
        const mockAddress = {
          id: `mock-addr-${Date.now()}`,
          user_id: userId,
          label: addressData.label || 'Home',
          address_line: addressData.address_line,
          lat,
          lng,
          is_serviceable: isServiceable,
          created_at: new Date().toISOString()
        };
        
        set(state => ({ 
          addresses: [mockAddress, ...state.addresses], 
          isLoading: false 
        }));
        
        return { success: true, isServiceable };
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: userId,
          label: addressData.label || 'Home',
          address_line: addressData.address_line,
          lat,
          lng,
          is_serviceable: isServiceable
        })
        .select()
        .single();

      if (error) throw error;

      set(state => ({ 
        addresses: [data, ...state.addresses], 
        isLoading: false 
      }));

      return { success: true, isServiceable };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deleteAddress: async (addressId) => {
    try {
      const { error } = await supabase.from('addresses').delete().eq('id', addressId);
      if (error) throw error;
      set(state => ({
        addresses: state.addresses.filter(a => a.id !== addressId)
      }));
    } catch (err) {
      set({ error: err.message });
    }
  }
}));

export default useAddressStore;
