import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured && supabase) {
      // Check active Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }).catch((err) => {
        console.error('Error fetching Supabase session:', err);
        if (mounted) setLoading(false);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });

      return () => {
        mounted = false;
        subscription?.unsubscribe();
      };
    } else {
      // Check local demo session
      const savedUser = localStorage.getItem('kkcc_demo_admin');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setUser(data.user);
      return data;
    } else {
      // Demo admin credentials fallback
      if (email.trim().toLowerCase() === 'admin@kelikunj.com' && password === 'admin123') {
        const demoUser = {
          id: 'demo-admin-id',
          email: 'admin@kelikunj.com',
          user_metadata: { role: 'administrator', name: 'KKCC Director' }
        };
        setUser(demoUser);
        localStorage.setItem('kkcc_demo_admin', JSON.stringify(demoUser));
        return { user: demoUser };
      } else {
        throw new Error('Invalid credentials. (Demo login: admin@kelikunj.com / admin123)');
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('kkcc_demo_admin');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
