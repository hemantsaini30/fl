import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Key, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INSTITUTE_INFO } from '../../data/content';
import { Link } from 'react-router-dom';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, isSupabaseConfigured } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@kelikunj.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="admin-login-page">
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="admin-login-header">
          <div className="admin-login-brand-icon">
            <Lock size={28} />
          </div>
          <h2>Staff Admin Portal</h2>
          <p>{INSTITUTE_INFO.name} — Admissions Desk</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="admin-demo-box">
            <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Demo Mode Active</span>
            </div>
            <p>
              Supabase env variables not detected in frontend. You can sign in using default credentials:
            </p>
            <div style={{ marginTop: '8px', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px' }}>
              admin@kelikunj.com / admin123
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              style={{
                marginTop: '8px',
                background: 'var(--accent)',
                border: 'none',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Autofill Demo Login
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="form-error-msg" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <div className="form-input-wrapper">
              <Mail size={18} className="form-input-icon" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kelikunj.com"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="form-input-wrapper">
              <Key size={18} className="form-input-icon" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-control"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary form-btn-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ color: 'rgba(250, 250, 252, 0.5)', fontSize: '0.85rem' }}>
            ← Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
