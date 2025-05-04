
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import { Toaster } from "@/components/ui/toaster";
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
         // Redirect on login/logout
         if (_event === 'SIGNED_IN' && location.pathname !== '/dashboard') {
           navigate('/dashboard', { replace: true });
         } else if (_event === 'SIGNED_OUT' && location.pathname !== '/') {
           navigate('/', { replace: true });
         }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener will handle navigation
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route 
              path="/" 
              element={<LandingPage session={session} setSession={setSession} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                session ? <DashboardPage session={session} handleLogout={handleLogout} /> : <LandingPage session={session} setSession={setSession} />} 
                // Simple protection: Redirect to landing if no session
            />
            {/* Add other routes here if needed */}
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
