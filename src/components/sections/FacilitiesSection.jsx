import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FACILITIES } from '../../data/content';

export const FacilitiesSection = () => {
  return (
    <section className="section section-light" id="facilities">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus & Infrastructure</span>
          <h2 className="section-title">Designed For Focus & High Performance</h2>
          <p className="section-subtitle">
            Modern air-conditioned classrooms, dedicated discussion areas, and a quiet reference library in East Delhi.
          </p>
        </div>

        {/* Asymmetric 1 Large + 3 Smaller Grid */}
        <div className="facilities-grid">
          {FACILITIES.map((facility, index) => (
            <motion.div
              key={facility.id}
              className={`facility-card ${facility.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="facility-img"
                loading="lazy"
              />
              <div className="facility-overlay">
                <span className="facility-tag">{facility.tag}</span>
                <h3 className="facility-title">{facility.title}</h3>
                <p className="facility-desc">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
