import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { ACHIEVERS } from '../../data/content';

export const AchieversSection = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const trackRef = useRef(null);

  const years = ['All', '2026', '2025', '2024'];

  const filteredAchievers = selectedYear === 'All'
    ? ACHIEVERS
    : ACHIEVERS.filter((item) => item.year === selectedYear);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 344; // card width + gap
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section section-dark carousel-section" id="achievers">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Trophy size={14} style={{ marginRight: '4px' }} />
            Hall of Fame
          </span>
          <h2 className="section-title">Our Achievers & Board Toppers</h2>
          <p className="section-subtitle">
            Consistent top ranks in CBSE 10th & 12th, JEE Main/Advanced, and NEET-UG year after year.
          </p>
        </div>

        {/* Carousel Filter Pills & Chevron Navigation */}
        <div className="carousel-controls-bar">
          <div className="filter-pills-group">
            {years.map((year) => (
              <button
                key={year}
                className={`filter-pill ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year === 'All' ? 'All Years' : `Batch ${year}`}
              </button>
            ))}
          </div>

          <div className="carousel-nav-arrows">
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll achievers left"
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll achievers right"
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Track */}
        <div className="carousel-track-container">
          <div className="carousel-track" ref={trackRef}>
            <AnimatePresence mode="popLayout">
              {filteredAchievers.map((achiever) => (
                <motion.div
                  key={achiever.id}
                  className="achiever-card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="achiever-image-box">
                    <img
                      src={achiever.photo}
                      alt={`${achiever.name} - ${achiever.achievement}`}
                      className="achiever-photo"
                      loading="lazy"
                    />
                    <span className="achiever-year-badge">{achiever.year}</span>
                    <span className="achiever-course-badge">{achiever.course}</span>
                  </div>

                  <div className="achiever-content">
                    <div>
                      <h3 className="achiever-name">{achiever.name}</h3>
                      <div className="achiever-result">{achiever.achievement}</div>
                    </div>
                    <div className="achiever-highlight">{achiever.highlight}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
