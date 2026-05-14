import React from 'react';
import { motion } from 'motion/react';
import { Store, Package, TrendingUp, Users, Settings, Plus } from 'lucide-react';

export default function VendorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Store Portal</h1>
          <p className="text-slate-500 mt-2">Manage your inventory and orders.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add New Product
        </button>
      </header>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Sales', value: '₹48,290', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Active Orders', value: '12', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Customers', value: '254', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Inventory', value: '89 Items', icon: Store, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-100">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          <button className="text-[#FF6B00] font-bold text-sm hover:underline">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Order ID</th>
                <th className="px-8 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Customer</th>
                <th className="px-8 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Amount</th>
                <th className="px-8 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-slate-900">#ORD-{1024 + item}</td>
                  <td className="px-8 py-4 text-slate-600 font-medium tracking-tight">Rohan Sharma</td>
                  <td className="px-8 py-4 font-black text-slate-900">₹{600 + item * 50}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Delivered</span>
                  </td>
                  <td className="px-8 py-4">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors"><Settings size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
