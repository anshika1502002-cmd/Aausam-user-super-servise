import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/UserDashboard';
import RideBooking from './pages/user/RideBooking';
import FoodDelivery from './pages/user/FoodDelivery';
import QuickCommerce from './pages/user/QuickCommerce';
import HomeServices from './pages/user/HomeServices';
import DriverDashboard from './pages/driver/DriverDashboard';
import VendorDashboard from './pages/vendor/VendorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  useAuth();
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* User Routes */}
            <Route path="/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="/user/rides" element={<ProtectedRoute role="user"><RideBooking /></ProtectedRoute>} />
            <Route path="/user/food" element={<ProtectedRoute role="user"><FoodDelivery /></ProtectedRoute>} />
            <Route path="/user/grocery" element={<ProtectedRoute role="user"><QuickCommerce /></ProtectedRoute>} />
            <Route path="/user/services" element={<ProtectedRoute role="user"><HomeServices /></ProtectedRoute>} />
            
            {/* Driver Routes */}
            <Route path="/driver" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
            
            {/* Vendor Routes */}
            <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}
