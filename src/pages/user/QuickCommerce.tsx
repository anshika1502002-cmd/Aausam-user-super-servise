import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Timer, ArrowRight, Star, Plus } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Fresh Milk', price: 45, unit: '500ml', image: 'https://images.unsplash.com/photo-1563636619-e910ef2a844b?q=80&w=2574&auto=format&fit=crop', category: 'Dairy' },
  { id: 2, name: 'Organic Bananas', price: 60, unit: '6 pcs', image: 'https://images.unsplash.com/photo-1571771894821-ad9962417b4b?q=80&w=2680&auto=format&fit=crop', category: 'Fruits' },
  { id: 3, name: 'Brown Bread', price: 40, unit: '400g', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2672&auto=format&fit=crop', category: 'Bakery' },
  { id: 4, name: 'Potatoes', price: 25, unit: '1kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=2670&auto=format&fit=crop', category: 'Vegetables' },
  { id: 5, name: 'Green Grapes', price: 90, unit: '500g', image: 'https://images.unsplash.com/photo-1601275868399-45bec4f4cd9d?q=80&w=2574&auto=format&fit=crop', category: 'Fruits' },
  { id: 6, name: 'Curd (Dahi)', price: 30, unit: '200g', image: 'https://images.unsplash.com/photo-1528750955925-cd3375d975ab?q=80&w=2574&auto=format&fit=crop', category: 'Dairy' },
];

export default function QuickCommerce() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Banner */}
      <div className="bg-green-600 rounded-[40px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-fit mb-6">
            <Timer size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">10 Mins Delivery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Groceries <br />at your doorstep.</h1>
          <p className="text-green-100 max-w-sm mb-8 leading-relaxed">Shop from thousands of essentials and get them delivered in minutes.</p>
          <button className="px-8 py-4 bg-white text-green-600 rounded-2xl font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
            Shop Essentials <ArrowRight size={18} />
          </button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" 
          alt="Groceries" 
          className="w-full md:w-[400px] h-[350px] object-cover rounded-[32px] shadow-2xl rotate-3 relative z-10"
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full -mr-32 -mt-32"></div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Flash Sale</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-red-500 animate-pulse">Ends in 05:42:15</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {PRODUCTS.map((prod, idx) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group"
          >
            <div className="bg-white rounded-[32px] p-4 border border-slate-100 group-hover:border-green-200 transition-all hover:shadow-xl hover:shadow-green-500/5">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg text-green-600 hover:bg-green-600 hover:text-white transition-all">
                  <Plus size={20} />
                </button>
              </div>
              <p className="font-bold text-slate-900 text-sm truncate">{prod.name}</p>
              <p className="text-xs text-slate-400 font-medium mb-2">{prod.unit}</p>
              <p className="font-black text-slate-900">₹{prod.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
