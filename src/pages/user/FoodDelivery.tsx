import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, Clock, Heart, ShoppingCart } from 'lucide-react';

const RESTAURANTS = [
  { id: 1, name: 'Paradise Biryani', rating: 4.5, time: '30-35 mins', cuisine: 'Biryani, North Indian', price: '₹400 for two', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2574&auto=format&fit=crop' },
  { id: 2, name: 'Burger King', rating: 4.2, time: '20-25 mins', cuisine: 'Burgers, Fast Food', price: '₹300 for two', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2672&auto=format&fit=crop' },
  { id: 3, name: 'The Pizza Company', rating: 4.8, time: '40-45 mins', cuisine: 'Italian, Pizza', price: '₹600 for two', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2670&auto=format&fit=crop' },
  { id: 4, name: 'Healthy Salads', rating: 4.6, time: '15-20 mins', cuisine: 'Salads, Health', price: '₹500 for two', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop' },
];

const CATEGORIES = ['All', 'Biryani', 'Burgers', 'Pizza', 'Salads', 'Sweets', 'Chinese', 'South Indian'];

export default function FoodDelivery() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Delicious food, <br /><span className="text-[#FF6B00]">delivered fast.</span></h1>
        <div className="relative group flex-1 md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF6B00] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for restaurants or dishes..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-sm font-medium border border-slate-100 shadow-sm focus:border-[#FF6B00] outline-none transition-all"
          />
        </div>
      </div>

      {/* Categories Scroller */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-12 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
              ? 'bg-[#FF6B00] text-white shadow-lg shadow-orange-500/20' 
              : 'bg-white text-slate-500 border border-slate-100 hover:border-orange-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurants Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {RESTAURANTS.map((res, idx) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-4 shadow-xl shadow-slate-200/50">
              <img 
                src={res.image} 
                alt={res.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                 <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                   <Star size={12} className="text-yellow-500 fill-yellow-500" /> {res.rating}
                 </div>
                 <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                   <Clock size={12} className="text-slate-500" /> {res.time}
                 </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#FF6B00] transition-colors">{res.name}</h3>
            <p className="text-sm text-slate-500 font-medium mb-1">{res.cuisine}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{res.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="h-16 w-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/30 group active:scale-95 transition-all">
          <ShoppingCart size={24} />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</div>
        </button>
      </div>
    </div>
  );
}
