import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../../data/content';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const StatsSection = () => {
  return (
    <section className="stats-strip" id="stats">
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number-wrapper">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1.4} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
