import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { setUser, setLoading, setError } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = React.useState('user');

  const handleFirestoreError = (error: any, operation: string, path: string) => {
    const errInfo = {
      error: error.message,
      operation,
      path,
      auth: auth.currentUser?.uid,
    };
    console.error('Firestore Error:', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    try {
      console.log('Starting Google Login...');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Auth success:', user.uid);

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      let userSnap;
      try {
        userSnap = await getDoc(userRef);
      } catch (err: any) {
        handleFirestoreError(err, 'get', `users/${user.uid}`);
      }

      let userData;
      if (userSnap && userSnap.exists()) {
        userData = userSnap.data();
      } else {
        // Create new user profile
        userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: selectedRole,
          walletBalance: 1000,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        console.log('Creating new user profile:', userData);
        try {
          await setDoc(userRef, userData);
        } catch (err: any) {
          handleFirestoreError(err, 'write', `users/${user.uid}`);
        }
      }

      dispatch(setUser(userData));
      toast.success(`Logged in as ${userData.role}`);
      
      // Redirect based on role
      if (userData.role === 'admin') navigate('/admin');
      else if (userData.role === 'driver') navigate('/driver');
      else if (userData.role === 'vendor') navigate('/vendor');
      else navigate('/user');

    } catch (error: any) {
      console.error('Login Error:', error);
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FF6B00] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-xl shadow-orange-500/20">A</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Login or Sign Up</h1>
          <p className="text-slate-500 text-sm">Join the Aausam community in one click.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {['user', 'driver', 'vendor'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedRole === role 
                  ? 'bg-orange-50 text-[#FF6B00] border-orange-200 border-2' 
                  : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all hover:border-[#FF6B00]/30 active:scale-[0.98]"
          >
            <Chrome size={20} className="text-[#4285F4]" />
            Continue with Google
          </button>

          <p className="text-center text-xs text-slate-400 leading-relaxed pt-4">
            By signing in, you agree to our <br />
            <span className="font-bold text-slate-900 underline decoration-orange-200">Terms of Service</span> and <span className="font-bold text-slate-900 underline decoration-orange-200">Privacy Policy</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
