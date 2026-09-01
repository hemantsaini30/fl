import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSTITUTE_INFO } from '../../data/content';

// Crisp inline SVGs for social media icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Institute Branding */}
          <div className="footer-brand">
            <div className="brand-logo-mark" style={{ marginBottom: '16px' }}>KK</div>
            <h3>{INSTITUTE_INFO.name}</h3>
            <p>"{INSTITUTE_INFO.tagline}"</p>
            <div className="footer-social-links">
              <a
                href={INSTITUTE_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={INSTITUTE_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
              <a
                href={INSTITUTE_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={INSTITUTE_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Institute</a></li>
              <li><a href="#courses">Academic Batches</a></li>
              <li><a href="#faculty">Faculty Team</a></li>
              <li><a href="#achievers">Results & Ranks</a></li>
              <li><a href="#facilities">Campus Facilities</a></li>
              <li><a href="#gallery">Life at KKCC</a></li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Programs</h4>
            <ul className="footer-links-list">
              <li><a href="#courses">Foundation (Class 9 & 10)</a></li>
              <li><a href="#courses">Senior Secondary (11 & 12)</a></li>
              <li><a href="#courses">JEE Main & Advanced</a></li>
              <li><a href="#courses">NEET-UG Medical Batch</a></li>
              <li><a href="#enquiry">Scholarship Test Series</a></li>
              <li><a href="#enquiry">Doubt-Clearing Modules</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Visit Our Campus</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <span>{INSTITUTE_INFO.address}</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} className="footer-contact-icon" />
                <a href={`tel:${INSTITUTE_INFO.phoneRaw}`}>{INSTITUTE_INFO.phone}</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} className="footer-contact-icon" />
                <a href={`mailto:${INSTITUTE_INFO.email}`}>{INSTITUTE_INFO.email}</a>
              </div>
              <div className="footer-contact-item">
                <Clock size={18} className="footer-contact-icon" />
                <span>{INSTITUTE_INFO.timings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} {INSTITUTE_INFO.name}. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Empowering students across Delhi</span>
            <Link to="/admin" className="footer-admin-link" title="Staff Portal">
              <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
