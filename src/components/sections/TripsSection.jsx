import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { TRIPS } from '../../data/content';

export const TripsSection = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 404; // card width + gap
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section section-dim carousel-section" id="gallery">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Compass size={14} style={{ marginRight: '4px' }} />
            Life at KKCC
          </span>
          <h2 className="section-title">Trips, Events & Celebrations</h2>
          <p className="section-subtitle">
            Balancing intensive academic preparation with inspiring science excursions and joyful milestones.
          </p>
        </div>

        {/* Navigation Arrows Header */}
        <div className="carousel-controls-bar" style={{ justifyContent: 'flex-end' }}>
          <div className="carousel-nav-arrows">
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll trips left"
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll trips right"
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div className="carousel-track-container">
          <div className="carousel-track" ref={trackRef}>
            {TRIPS.map((trip, index) => (
              <motion.div
                key={trip.id}
                className="trip-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="trip-image-box">
                  <img
                    src={trip.photo}
                    alt={trip.title}
                    className="trip-photo"
                    loading="lazy"
                  />
                  <span className="trip-tag-badge">{trip.tag}</span>
                </div>

                <div className="trip-content">
                  <h3 className="trip-title">{trip.title}</h3>
                  <p className="trip-desc">{trip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
