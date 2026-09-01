import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/content';

export const TestimonialsSection = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 340;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section section-light" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Trusted By Delhi's Parents & Top Rankers</h2>
          <p className="section-subtitle">
            Real stories of academic growth, discipline, and success from our alumni and their families.
          </p>
        </div>

        {/* Navigation Arrow Controls (Visible on mobile/tablet or when scrolling) */}
        <div className="mobile-carousel-controls">
          <span className="mobile-swipe-hint">Swipe to read parent & student reviews →</span>
          <div className="carousel-nav-arrows">
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll reviews left"
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="carousel-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll reviews right"
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Testimonials Track / Grid */}
        <div className="testimonials-grid" ref={trackRef}>
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div>
                <Quote size={32} className="testimonial-quote-icon" />
                <p className="testimonial-quote">"{item.quote}"</p>
              </div>

              <div className="testimonial-author">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="testimonial-avatar"
                  loading="lazy"
                />
                <div className="testimonial-info">
                  <h4>{item.name}</h4>
                  <p>{item.relation}</p>
                  <div className="testimonial-stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
