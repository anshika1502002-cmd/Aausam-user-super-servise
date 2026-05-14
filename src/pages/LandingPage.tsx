import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bike, Car, ShoppingBag, Utensils, Zap, Package, ArrowRight, Star } from 'lucide-react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CATEGORIES = [
  { id: 'rides', name: 'Rides', icon: Bike, color: 'bg-blue-500', link: '/user/rides', desc: 'Bike, Auto, Cab' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-500', link: '/user/food', desc: 'Hungry? Order now' },
  { id: 'grocery', name: 'Grocery', icon: ShoppingBag, color: 'bg-green-500', link: '/user/grocery', desc: '10 min delivery' },
  { id: 'services', name: 'Services', icon: Zap, color: 'bg-yellow-500', link: '/user/services', desc: 'Home repairs & more' },
  { id: 'parcel', name: 'Parcel', icon: Package, color: 'bg-purple-500', link: '/user/rides', desc: 'Send items locally' },
];

export default function LandingPage() {
  const { profile } = useSelector((state: RootState) => state.user);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Star size={14} fill="currentColor" /> {profile ? `Welcome back, ${profile.displayName}` : 'All Services in One Place'}
              </span>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
                Your Life, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD700]">Simplified.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Book a ride, order food, get groceries delivered, or hire home services—all from the most powerful super app in India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="btn-primary flex items-center gap-2 px-10">
                  Join Aausam <ArrowRight size={18} />
                </Link>
                <Link to="/user/rides" className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm">
                  Book a Ride
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="w-[500px] h-[500px] bg-gradient-to-tr from-orange-100 to-yellow-50 rounded-full blur-3xl absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd59c5bc3f90?q=80&w=2670&auto=format&fit=crop" 
                alt="Delivery Service" 
                className="w-full h-[600px] object-cover rounded-[40px] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Fastest Delivery</p>
                  <p className="font-bold text-slate-900">In 10 Mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Our Services</h2>
            <p className="text-slate-500">Everything you need, just a tap away.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link to={cat.link} className="group block bg-white p-6 rounded-[32px] border border-slate-100 hover:border-orange-200 transition-all hover:shadow-xl hover:shadow-orange-500/5">
                  <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <cat.icon size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
