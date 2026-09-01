import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

export const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--ink)',
          color: '#FFFFFF'
        }}
      >
        <Loader2 size={32} className="animate-spin" color="var(--accent-bright)" />
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
};
