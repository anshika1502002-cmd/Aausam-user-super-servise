import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { motion, AnimatePresence } from 'motion/react';
import { Bike, Utensils, ShoppingBag, Zap, Clock, ChevronRight, Wallet, MapPin } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function UserDashboard() {
  const { profile } = useSelector((state: RootState) => state.user);
  const [activeRides, setActiveRides] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!profile) return;

    const q = query(
      collection(db, "rides"), 
      where("userId", "==", profile.uid),
      where("status", "in", ["pending", "accepted"])
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActiveRides(docs);
    }, (err) => {
      console.error("User dashboard snapshot error:", err);
    });

    return () => unsubscribe();
  }, [profile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Good day, {profile?.displayName?.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-2">What can we help you with today?</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-lg shadow-slate-100 border border-slate-50 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6B00]">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wallet Balance</p>
            <p className="text-xl font-black text-slate-900">₹{profile?.walletBalance?.toLocaleString()}</p>
          </div>
          <button className="ml-4 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all">Top Up</button>
        </div>
      </header>

      {/* Active Rides Section */}
      <AnimatePresence>
        {activeRides.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 overflow-hidden"
          >
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">Active Rides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {activeRides.map((ride) => (
                <div key={ride.id} className="bg-slate-900 text-white p-8 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00] rounded-full -mr-16 -mt-16 blur-2xl opacity-20"></div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white">
                        <Bike size={20} />
                      </div>
                      <div>
                        <p className="font-bold">Ride to Destination</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ride.status === 'pending' ? 'Searching for partner...' : 'Partner on the way'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black">₹{ride.fare}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <MapPin size={16} className="text-[#FF6B00]" />
                    <p className="truncate">{ride.pickup.address || 'Pickup Point'}</p>
                  </div>
                  <div className="mt-6 flex gap-2">
                     <div className="h-1 bg-white/10 flex-1 rounded-full overflow-hidden">
                        <div className={`h-full bg-[#FF6B00] transition-all duration-1000 ${ride.status === 'pending' ? 'w-1/3' : 'w-2/3'}`}></div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { name: 'Book Ride', icon: Bike, link: '/user/rides', color: 'bg-blue-600', shadow: 'shadow-blue-200' },
          { name: 'Order Food', icon: Utensils, link: '/user/food', color: 'bg-orange-600', shadow: 'shadow-orange-200' },
          { name: 'Groceries', icon: ShoppingBag, link: '/user/grocery', color: 'bg-green-600', shadow: 'shadow-green-200' },
          { name: 'Services', icon: Zap, link: '/user/services', color: 'bg-yellow-600', shadow: 'shadow-yellow-200' },
        ].map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={item.link} className={`group block relative overflow-hidden ${item.color} rounded-[32px] p-6 h-48 transition-all hover:-translate-y-2 hover:shadow-2xl ${item.shadow}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
              <item.icon className="text-white mb-6" size={40} />
              <h3 className="text-white text-xl font-bold">{item.name}</h3>
              <div className="mt-2 flex items-center text-white/70 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                Explore <ChevronRight size={14} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions / History */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Activity</h2>
            <button className="text-[#FF6B00] font-bold text-sm">View All</button>
          </div>
          <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                     {i === 0 ? <Bike className="text-blue-500" /> : i === 1 ? <Utensils className="text-orange-500" /> : <ShoppingBag className="text-green-500" />}
                   </div>
                   <div>
                     <p className="font-bold text-slate-900">{i === 0 ? 'Ride to Airport' : i === 1 ? 'Paradise Biryani' : 'Blinkit Store'}</p>
                     <p className="text-xs text-slate-400 font-medium">May 14, 2026 • 2:30 PM</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-slate-900">₹{i === 0 ? '450' : i === 1 ? '780' : '150'}</p>
                   <p className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${i === 0 ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                     {i === 0 ? 'Completed' : 'Cancelled'}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Special Offers</h2>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-xl"></div>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2">Exclusive</p>
            <h3 className="text-2xl font-bold mb-4">50% Off on your first ride!</h3>
            <p className="text-indigo-100/70 text-sm mb-6">Use code FIRST50. Limited time offer.</p>
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm">Apply Now</button>
          </div>
          <div className="bg-[#FF6B00] rounded-[32px] p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Refer & Earn</h3>
            <p className="text-orange-100 text-sm mb-4">Share with friends and get ₹100 each.</p>
            <button className="w-full py-3 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition-all backdrop-blur-md">Share Link</button>
          </div>
        </div>
      </div>
    </div>
  );
}
