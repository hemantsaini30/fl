import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { BATCHES } from '../../data/content';

export const BatchesSection = ({ onSelectCourse }) => {
  const trackRef = useRef(null);

  const handleEnrollClick = (courseName) => {
    if (onSelectCourse) {
      onSelectCourse(courseName);
    }
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 360;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section section-dim" id="courses">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Academic Batches</span>
          <h2 className="section-title">Structured Programs Tailored For Ranks</h2>
          <p className="section-subtitle">
            From foundation building in secondary school to rigorous test simulations for national competitive exams.
          </p>
        </div>

        {/* Navigation Arrow Controls (Visible on mobile/tablet or when scrolling) */}
        <div className="mobile-carousel-controls">
          <span className="mobile-swipe-hint">Swipe to explore programs →</span>
          <div className="carousel-nav-arrows">
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll batches left"
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll batches right"
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Batches Track / Grid */}
        <div className="batches-grid" ref={trackRef}>
          {BATCHES.map((batch, index) => (
            <motion.div
              key={batch.id}
              className="batch-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <div className="batch-top">
                  <span className="batch-class-badge">{batch.classes}</span>
                  <span className="pill pill-accent">{batch.badge}</span>
                </div>

                <h3 className="batch-name">{batch.name}</h3>
                <div className="batch-target">Target: {batch.targetExam}</div>
                <p className="batch-desc">{batch.description}</p>

                <div className="batch-subjects-wrapper">
                  <div className="batch-subjects-label">Curriculum Subjects</div>
                  <div className="batch-subjects-tags">
                    {batch.subjects.map((subject, sIdx) => (
                      <span key={sIdx} className="subject-tag">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="batch-footer">
                <div className="batch-schedule">
                  <Clock size={16} color="var(--accent)" />
                  <span>{batch.schedule}</span>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEnrollClick(batch.name)}
                >
                  <span>Enquire Batch</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
