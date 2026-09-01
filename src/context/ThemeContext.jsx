import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../data/content';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(() => {
    const saved = localStorage.getItem('kkcc_theme');
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
    return 'violet'; // default signature theme
  });

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  useEffect(() => {
    // Set data-theme on root HTML tag
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Apply CSS variables dynamically to ensure instantaneous switch & custom property overrides
    const root = document.documentElement;
    root.style.setProperty('--accent', currentTheme.primary);
    root.style.setProperty('--accent-soft', currentTheme.accentSoft);
    root.style.setProperty('--accent-bright', currentTheme.accentBright);
    root.style.setProperty('--ink', currentTheme.ink);
    root.style.setProperty('--ink-soft', currentTheme.inkSoft);
    root.style.setProperty('--paper', currentTheme.paper);
    root.style.setProperty('--paper-dim', currentTheme.paperDim);
    root.style.setProperty('--charcoal', currentTheme.charcoal);
    root.style.setProperty('--charcoal-mute', currentTheme.charcoalMute);
    root.style.setProperty('--accent-glow', currentTheme.glow);

    localStorage.setItem('kkcc_theme', themeId);
  }, [themeId, currentTheme]);

  const selectTheme = (id) => {
    if (THEMES.some(t => t.id === id)) {
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeId, currentTheme, selectTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
