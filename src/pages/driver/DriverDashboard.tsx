import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, DollarSign, List, Bell, Power, Star, User, Navigation } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { handleFirestoreError, OperationType } from '../../utils/firebaseErrors';

export default function DriverDashboard() {
  const { profile } = useSelector((state: RootState) => state.user);
  const [isOnline, setIsOnline] = React.useState(false);
  const [requests, setRequests] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!isOnline) {
      setRequests([]);
      return;
    }

    const q = query(collection(db, "rides"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(docs);
      if (docs.length > 0) {
        toast('New ride request available!', { icon: '🔔' });
      }
    }, (err) => {
      console.error("Snapshot error:", err);
    });

    return () => unsubscribe();
  }, [isOnline]);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? 'You are now offline' : 'You are now online');
  };

  const acceptRide = async (rideId: string) => {
    if (!profile) return;
    try {
      const rideRef = doc(db, "rides", rideId);
      await updateDoc(rideRef, {
        status: "accepted",
        driverId: profile.uid,
        updatedAt: serverTimestamp(),
      });
      toast.success('Ride accepted! Start navigating to pickup.');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, "rides");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight tracking-tight">Driver Center</h1>
          <p className="text-slate-500 mt-2">Manage your rides and earnings.</p>
        </div>
        <button 
          onClick={toggleStatus}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl ${
            isOnline 
            ? 'bg-green-500 text-white shadow-green-500/20' 
            : 'bg-slate-900 text-white shadow-slate-900/20'
          }`}
        >
          <Power size={20} /> {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Today Earnings', value: '₹1,240', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Rides Completed', value: '14', icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Rating', value: '4.92', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-lg shadow-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-100">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Ride Requests</h2>
            <Bell size={20} className="text-[#FF6B00] animate-bounce" />
          </div>
          <div className="p-0 text-center py-8">
            {isOnline ? (
              <div className="space-y-0">
                {requests.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    <AnimatePresence>
                      {requests.map((request) => (
                        <motion.div 
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="p-6 hover:bg-slate-50 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-orange-100 text-[#FF6B00] rounded-2xl flex items-center justify-center">
                              <User size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{request.userName || 'Customer'}</p>
                              <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                                {request.pickup.address || 'Location Hidden'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right mr-4">
                              <p className="font-bold text-slate-900">₹{request.fare}</p>
                              <p className="text-[10px] font-bold text-green-500 uppercase">Cash</p>
                            </div>
                            <button 
                              onClick={() => acceptRide(request.id)}
                              className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                            >
                              Accept
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-12">
                    <div className="relative">
                      <div className="w-16 h-16 bg-orange-100 text-[#FF6B00] rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <MapPin size={32} />
                      </div>
                      <div className="absolute top-0 left-0 w-16 h-16 bg-orange-100 rounded-full animate-ping opacity-25"></div>
                    </div>
                    <p className="text-lg font-bold text-slate-900">Searching for rides...</p>
                    <p className="text-slate-400 text-sm mt-2">New requests will appear here once found.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-50">
                <Power size={64} className="text-slate-300 mb-6" />
                <p className="text-lg font-bold text-slate-900">You are offline</p>
                <p className="text-slate-400 text-sm mt-2">Go online to start receiving ride requests.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Performance</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Acceptance Rate</span>
                <span>94%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[94%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Weekly Target</span>
                <span>₹5,000 / ₹10,000</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[50%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
