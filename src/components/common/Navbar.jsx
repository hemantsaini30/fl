import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { INSTITUTE_INFO } from '../../data/content';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { themes, themeId, selectTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Results', href: '#achievers' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Life at KKCC', href: '#gallery' },
    { label: 'Contact', href: '#enquiry' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo */}
          <a href="#" className="nav-brand" onClick={handleLinkClick}>
            <div className="brand-logo-mark">KK</div>
            <div className="brand-text">
              <span className="brand-name">{INSTITUTE_INFO.name}</span>
              <span className="brand-sub">Delhi • Est. 2016</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-menu">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Theme Filter + Call Now + Mobile Toggle */}
          <div className="nav-actions">
            <ThemeSelector />

            <a href={`tel:${INSTITUTE_INFO.phoneRaw}`} className="btn btn-call">
              <Phone size={16} />
              <span>Call Now</span>
            </a>

            <button
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
            <div className="mobile-drawer-header">
              <div className="nav-brand">
                <div className="brand-logo-mark">KK</div>
                <div className="brand-text">
                  <span className="brand-name">{INSTITUTE_INFO.shortName}</span>
                  <span className="brand-sub">Delhi</span>
                </div>
              </div>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleLinkClick}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Theme Palette Selector */}
            <div className="mobile-theme-section">
              <div className="mobile-theme-title">Select Color Theme</div>
              <div className="mobile-themes-grid">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    className={`mobile-theme-circle ${t.id === themeId ? 'active' : ''}`}
                    style={{ backgroundColor: t.primary }}
                    onClick={() => selectTheme(t.id)}
                    title={t.name}
                  />
                ))}
              </div>
            </div>

            <a
              href={`tel:${INSTITUTE_INFO.phoneRaw}`}
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleLinkClick}
            >
              <Phone size={18} />
              <span>Call: {INSTITUTE_INFO.phone}</span>
            </a>
          </div>
        </>
      )}
    </>
  );
};
