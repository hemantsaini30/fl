import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck2, HelpCircle, TrendingUp, Building2, CheckCircle2 } from 'lucide-react';
import { ABOUT_SECTION, METHODOLOGY, INSTITUTE_INFO } from '../../data/content';

const iconMap = {
  Users: Users,
  FileCheck2: FileCheck2,
  HelpCircle: HelpCircle,
  TrendingUp: TrendingUp
};

export const AboutSection = () => {
  return (
    <section className="section section-light" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">{ABOUT_SECTION.badge}</span>
          <h2 className="section-title">{ABOUT_SECTION.title}</h2>
          <p className="section-subtitle">
            "{INSTITUTE_INFO.tagline}"
          </p>
        </div>

        {/* Story & Building Image Grid */}
        <div className="about-grid">
          {/* Building Photo with Floating Info Card */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={ABOUT_SECTION.exteriorImage}
              alt="Keli Kunj Coaching Classes Building Campus Delhi"
              className="about-main-img"
              loading="lazy"
            />
            <div className="about-floating-card">
              <div className="about-floating-icon">
                <Building2 size={24} />
              </div>
              <div className="about-floating-text">
                <h4>Vikas Marg Campus</h4>
                <p>Equipped with state-of-the-art smart lecture theatres & study library.</p>
              </div>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            className="about-text-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p>{ABOUT_SECTION.story}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="var(--accent)" />
                <span>100% NCERT & Board syllabus aligned curriculum</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="var(--accent)" />
                <span>Proven results in CBSE 10th/12th, JEE Main/Adv & NEET</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="var(--accent)" />
                <span>One-on-one personal mentorship for every student</span>
              </div>
            </div>
            <a href="#courses" className="btn btn-outline-dark">
              Explore Our Batches
            </a>
          </motion.div>
        </div>

        {/* Methodology Title */}
        <div className="methodology-header">
          <span className="section-tag">Our Methodology</span>
          <h3 className="section-title" style={{ fontSize: '2rem' }}>How We Teach For Maximum Retention</h3>
        </div>

        {/* 4 Methodology Cards */}
        <div className="methodology-grid">
          {METHODOLOGY.map((item, index) => {
            const IconComponent = iconMap[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={item.id}
                className="methodology-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="methodology-icon-box">
                  <IconComponent size={26} />
                </div>
                <h4 className="methodology-title">{item.title}</h4>
                <p className="methodology-desc">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
