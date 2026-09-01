import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeId, selectTheme, themes, currentTheme } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="theme-selector-wrapper" ref={dropdownRef}>
      <button
        className="theme-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme palette"
        title="Change theme color palette"
      >
        <Palette size={16} />
        <span>Theme: {currentTheme.name.split(' ')[0]}</span>
        <div className="theme-active-dot" style={{ backgroundColor: currentTheme.primary }} />
      </button>

      {isOpen && (
        <div className="theme-popover" role="dialog" aria-label="Theme options">
          <div className="theme-popover-header">
            <span>Color Palette (5 Themes)</span>
          </div>
          {themes.map((theme) => {
            const isActive = theme.id === themeId;
            return (
              <button
                key={theme.id}
                className={`theme-option-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  selectTheme(theme.id);
                  setIsOpen(false);
                }}
              >
                <div
                  className="theme-swatch"
                  style={{
                    backgroundColor: theme.primary,
                    boxShadow: `0 0 10px ${theme.glow}`
                  }}
                />
                <div className="theme-info">
                  <span className="theme-name">{theme.name}</span>
                  <span className="theme-desc">{theme.subtitle}</span>
                </div>
                {isActive && <Check size={16} className="theme-check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
