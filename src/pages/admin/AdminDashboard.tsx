import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Map, PieChart, Activity, ShoppingCart } from 'lucide-react';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DATA = [
  { name: 'Mon', rev: 4000 },
  { name: 'Tue', rev: 3000 },
  { name: 'Wed', rev: 5000 },
  { name: 'Thu', rev: 2780 },
  { name: 'Fri', rev: 1890 },
  { name: 'Sat', rev: 2390 },
  { name: 'Sun', rev: 3490 },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Super Admin</h1>
            <p className="text-slate-500 mt-1">Platform-wide overview and health.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-4 border-white object-cover" src={`https://i.pravatar.cc/100?u=${i}`} alt="Admin" />
              ))}
           </div>
           <span className="text-xs font-bold text-slate-400 ml-2">+12 Moderators Online</span>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '₹14.8M', icon: PieChart, color: 'text-violet-500', bg: 'bg-violet-50' },
          { label: 'Total Users', value: '82,490', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Live Orders', value: '1,420', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Active Drivers', value: '4,200', icon: Map, color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-8`}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Revenue Trends</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth +24%</span>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="rev" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-8">System Health</h2>
          <div className="space-y-6">
            {[
              { name: 'Ride Hailing API', status: 'Healthy', color: 'bg-green-500' },
              { name: 'Payment Gateway', status: 'Degraded', color: 'bg-yellow-500' },
              { name: 'Firebase Sync', status: 'Healthy', color: 'bg-green-500' },
              { name: 'Notification Server', status: 'Healthy', color: 'bg-green-500' },
            ].map((sys, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50">
                <span className="font-bold text-slate-700">{sys.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${sys.color}`}></div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{sys.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

