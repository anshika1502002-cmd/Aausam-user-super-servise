import React from 'react';
import { motion } from 'motion/react';
import { Zap, Wrench, Scissors, Waves, Home, ShieldCheck, Star, Calendar } from 'lucide-react';

const SERVICES = [
  { id: 'elec', name: 'Electrician', icon: Zap, color: 'bg-yellow-500' },
  { id: 'plum', name: 'Plumber', icon: Wrench, color: 'bg-blue-500' },
  { id: 'sal', name: 'Salon', icon: Scissors, color: 'bg-pink-500' },
  { id: 'clean', name: 'AC Repair', icon: Waves, color: 'bg-cyan-500' },
  { id: 'home', name: 'Cleaning', icon: Home, color: 'bg-green-500' },
];

export default function HomeServices() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Professional services, <br /><span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">trusted by thousands.</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="text-green-500" size={20} /> Every professional is background checked & certified.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5 relative overflow-hidden">
               <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                 <service.icon size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.name}</h3>
               <div className="flex items-center gap-1 mb-6">
                 {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                 <span className="text-xs text-slate-400 font-bold ml-2">4.9 (2k+ reviews)</span>
               </div>
               <button className="w-full py-4 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-900 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                 Book Service <Calendar size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Professionals */}
      <div className="bg-slate-900 rounded-[40px] p-12 text-white">
        <h2 className="text-3xl font-bold mb-12 tracking-tight">Top Rated Professionals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { name: 'Raj Kumar', role: 'Electrician', photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=2570&auto=format&fit=crop' },
            { name: 'Anita Shah', role: 'Salon Expert', photo: 'https://images.unsplash.com/photo-1594744803329-a584af1cae24?q=80&w=2574&auto=format&fit=crop' },
            { name: 'Suresh Patil', role: 'AC Expert', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop' },
          ].map((pro, i) => (
            <div key={i} className="flex items-center gap-6">
              <img src={pro.photo} alt={pro.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-800" />
              <div>
                <p className="font-bold text-xl">{pro.name}</p>
                <p className="text-slate-400 font-medium text-sm mb-2">{pro.role}</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">5.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
