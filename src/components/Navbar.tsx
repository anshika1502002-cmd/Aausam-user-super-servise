import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { auth } from '../config/firebase';
import { logout } from '../redux/userSlice';
import { User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { profile } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-bold text-xl italic shadow-lg shadow-orange-500/20">A</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Aausam</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/user/rides" className="hover:text-[#FF6B00] transition-colors">Rides</Link>
            <Link to="/user/food" className="hover:text-[#FF6B00] transition-colors">Food</Link>
            <Link to="/user/grocery" className="hover:text-[#FF6B00] transition-colors">Grocery</Link>
            <Link to="/user/services" className="hover:text-[#FF6B00] transition-colors">Services</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {profile ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">Hi, {profile.displayName?.split(' ')[0]}</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-[#FF6B00]">
                  Log In
                </Link>
                <Link to="/login" className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <Link to="/user/rides" onClick={() => setIsOpen(false)}>Rides</Link>
              <Link to="/user/food" onClick={() => setIsOpen(false)}>Food</Link>
              <Link to="/user/grocery" onClick={() => setIsOpen(false)}>Grocery</Link>
              <Link to="/user/services" onClick={() => setIsOpen(false)}>Services</Link>
              <hr />
              {profile ? (
                <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2">
                  <LogOut size={20} /> Sign Out
                </button>
              ) : (
                <Link to="/login" className="text-[#FF6B00] font-medium" onClick={() => setIsOpen(false)}>Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
