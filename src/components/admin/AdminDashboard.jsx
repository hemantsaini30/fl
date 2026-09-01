import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, RefreshCw, Search, Phone, Mail, Clock, Shield, Inbox, CheckCircle2, AlertCircle, ArrowLeft, Calendar, BookOpen, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchEnquiries, markEnquiryAsRead } from '../../lib/supabase';
import { INSTITUTE_INFO } from '../../data/content';
import { ThemeSelector } from '../common/ThemeSelector';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await fetchEnquiries();
      setEnquiries(data || []);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      await markEnquiryAsRead(id, !currentStatus);
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_read: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error('Error updating enquiry status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const totalCount = enquiries.length;
  const unreadCount = enquiries.filter((e) => !e.is_read).length;
  const readCount = totalCount - unreadCount;

  const filteredEnquiries = enquiries.filter((item) => {
    // Filter tab condition
    if (filter === 'unread' && item.is_read) return false;
    if (filter === 'read' && !item.is_read) return false;

    // Search condition
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(q);
      const phoneMatch = item.phone?.toLowerCase().includes(q);
      const courseMatch = item.course?.toLowerCase().includes(q);
      const msgMatch = item.message?.toLowerCase().includes(q);
      return nameMatch || phoneMatch || courseMatch || msgMatch;
    }
    return true;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="admin-layout">
      {/* Top Header */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-nav-left">
            <Link to="/" className="nav-brand" style={{ gap: '8px' }}>
              <div className="brand-logo-mark" style={{ width: '34px', height: '34px', fontSize: '0.95rem' }}>KK</div>
              <span className="brand-name" style={{ fontSize: '1rem' }}>{INSTITUTE_INFO.shortName}</span>
            </Link>
            <span className="admin-badge">Admin</span>
          </div>

          <div className="admin-nav-right">
            <ThemeSelector />

            <div className="admin-user-pill hide-on-mobile">
              <Shield size={14} color="var(--accent-soft)" />
              <span>{user?.email || 'admin@kelikunj.com'}</span>
            </div>

            <button
              className="btn btn-secondary btn-sm admin-icon-btn"
              onClick={loadData}
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span className="btn-text-hide-mobile">Refresh</span>
            </button>

            <button
              className="btn btn-secondary btn-sm admin-signout-btn"
              onClick={logout}
              title="Sign Out"
            >
              <LogOut size={15} />
              <span className="btn-text-hide-mobile">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Info Strip */}
        <div className="admin-mobile-substrip show-on-mobile">
          <div className="admin-user-mobile">
            <Shield size={13} color="var(--accent-soft)" />
            <span>{user?.email || 'admin@kelikunj.com'}</span>
          </div>
          <Link to="/" className="admin-mobile-site-link">
            <ArrowLeft size={13} />
            <span>Public Site</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-content">
        <div className="admin-page-title-row">
          <div>
            <h1 className="admin-page-title">Admissions Enquiries</h1>
            <p className="admin-page-subtitle">
              Real-time incoming student leads and counseling requests.
            </p>
          </div>
          <Link to="/" className="btn btn-secondary btn-sm hide-on-mobile">
            <ArrowLeft size={16} />
            <span>View Public Site</span>
          </Link>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrapper">
              <Inbox size={24} />
            </div>
            <div className="admin-stat-info">
              <h4>Total Enquiries</h4>
              <p>{totalCount}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrapper unread">
              <AlertCircle size={24} />
            </div>
            <div className="admin-stat-info">
              <h4>Unread Requests</h4>
              <p>{unreadCount}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrapper read">
              <CheckCircle2 size={24} />
            </div>
            <div className="admin-stat-info">
              <h4>Resolved / Read</h4>
              <p>{readCount}</p>
            </div>
          </div>
        </div>

        {/* Table Filter & Search Controls */}
        <div className="admin-table-toolbar">
          <div className="admin-filter-tabs">
            <button
              className={`admin-filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({totalCount})
            </button>
            <button
              className={`admin-filter-tab ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
            <button
              className={`admin-filter-tab ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read ({readCount})
            </button>
          </div>

          <div className="admin-search-wrapper">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by student, phone, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
        </div>

        {/* 1. Mobile Cards View (Visible on screens <= 768px) */}
        <div className="admin-mobile-cards-view show-on-mobile-block">
          {filteredEnquiries.length > 0 ? (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className={`admin-lead-card ${!enquiry.is_read ? 'unread' : ''}`}
              >
                <div className="admin-lead-card-header">
                  <div className="student-name-cell">
                    {!enquiry.is_read && <div className="unread-bullet" />}
                    <span className="admin-lead-name">{enquiry.name}</span>
                  </div>
                  <span className={`status-tag ${enquiry.is_read ? 'read' : 'unread'}`}>
                    {enquiry.is_read ? 'Read' : 'Unread'}
                  </span>
                </div>

                <div className="admin-lead-card-meta">
                  <span className="course-badge">{enquiry.course || 'General'}</span>
                  <div className="admin-lead-time">
                    <Clock size={13} />
                    <span>{formatDate(enquiry.created_at)}</span>
                  </div>
                </div>

                <a href={`tel:${enquiry.phone}`} className="admin-lead-call-btn">
                  <Phone size={15} />
                  <span>Call {enquiry.phone}</span>
                </a>

                {enquiry.message && (
                  <div className="admin-lead-msg-box">
                    <MessageSquare size={14} className="admin-lead-msg-icon" />
                    <p>{enquiry.message}</p>
                  </div>
                )}

                <div className="admin-lead-card-footer">
                  <button
                    className="btn btn-secondary btn-sm admin-lead-action-btn"
                    onClick={() => handleToggleStatus(enquiry.id, enquiry.is_read)}
                    disabled={updatingId === enquiry.id}
                  >
                    {enquiry.is_read ? 'Mark Unread' : '✓ Mark as Read'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Inbox size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p>No enquiries found matching your filter.</p>
            </div>
          )}
        </div>

        {/* 2. Desktop Data Table (Visible on screens > 768px) */}
        <div className="admin-table-container hide-on-mobile-block">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Phone Number</th>
                <th>Course / Batch</th>
                <th>Message / Inquiry</th>
                <th>Received At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className={!enquiry.is_read ? 'unread' : ''}>
                    <td>
                      <div className="student-name-cell">
                        {!enquiry.is_read && <div className="unread-bullet" title="Unread enquiry" />}
                        <span>{enquiry.name}</span>
                      </div>
                    </td>

                    <td>
                      <a href={`tel:${enquiry.phone}`} className="phone-link">
                        <Phone size={14} />
                        <span>{enquiry.phone}</span>
                      </a>
                    </td>

                    <td>
                      <span className="course-badge">{enquiry.course || 'General'}</span>
                    </td>

                    <td>
                      <div className="enquiry-msg-cell" title={enquiry.message || 'No additional message provided'}>
                        {enquiry.message || <span style={{ opacity: 0.4 }}>—</span>}
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: '0.825rem', color: 'rgba(250, 250, 252, 0.6)' }}>
                        {formatDate(enquiry.created_at)}
                      </span>
                    </td>

                    <td>
                      <span className={`status-tag ${enquiry.is_read ? 'read' : 'unread'}`}>
                        {enquiry.is_read ? 'Read' : 'Unread'}
                      </span>
                    </td>

                    <td>
                      <button
                        className="admin-action-btn"
                        onClick={() => handleToggleStatus(enquiry.id, enquiry.is_read)}
                        disabled={updatingId === enquiry.id}
                      >
                        {enquiry.is_read ? 'Mark Unread' : 'Mark as Read'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <Inbox size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
                      <p>No enquiries found matching your filter criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
