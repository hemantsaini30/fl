import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { FACULTY } from '../../data/content';

export const FacultySection = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section section-light" id="faculty">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Faculty & Mentors</span>
          <h2 className="section-title">Learn From Delhi's Finest Subject Masters</h2>
          <p className="section-subtitle">
            Passionate educators with over a decade of dedicated teaching experience and exceptional track records.
          </p>
        </div>

        {/* Navigation Arrow Controls (Visible on mobile/tablet or when scrolling) */}
        <div className="mobile-carousel-controls">
          <span className="mobile-swipe-hint">Swipe to see all faculty members →</span>
          <div className="carousel-nav-arrows">
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll faculty left"
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll faculty right"
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Faculty Track / Grid */}
        <div className="faculty-grid" ref={trackRef}>
          {FACULTY.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              className="faculty-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="faculty-avatar-wrapper">
                <img
                  src={teacher.photo}
                  alt={`Faculty ${teacher.name} - ${teacher.subject}`}
                  className="faculty-avatar"
                  loading="lazy"
                />
              </div>

              <h3 className="faculty-name">{teacher.name}</h3>
              <div className="faculty-subject">{teacher.subject}</div>

              <div className="faculty-meta">
                <span className="faculty-exp-badge">
                  {teacher.experience} Exp.
                </span>
              </div>

              <div className="faculty-qual" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <GraduationCap size={16} color="var(--accent)" />
                <span>{teacher.qualification}</span>
              </div>

              <p className="faculty-bio">{teacher.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
