import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ChevronDown } from 'lucide-react';
import { HERO_MEDIA, INSTITUTE_INFO } from '../../data/content';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background Video & Scrim Overlay */}
      <div className="hero-media-wrapper">
        <video
          className="hero-video"
          src={HERO_MEDIA.videoUrl}
          poster={HERO_MEDIA.posterUrl}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-scrim-overlay" />
        <div className="hero-mesh-glow" />
      </div>

      <div className="container hero-content">
        {/* Admissions Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-badge-dot" />
          <span>Admissions Open 2026-27 • CBSE | JEE | NEET</span>
        </motion.div>

        {/* Word-by-Word Animated Headline */}
        <motion.h1
          className="hero-headline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {HERO_MEDIA.headlineWords.map((word, index) => {
            const isHighlight = word.toLowerCase().includes('excellence') || word.toLowerCase().includes('ambitions');
            return (
              <span key={index} className="hero-word-mask">
                <motion.span
                  className={`hero-word ${isHighlight ? 'highlight' : ''}`}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="hero-subheading"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          {HERO_MEDIA.subheading}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <a href="#enquiry" className="btn btn-primary btn-lg">
            <span>Get in touch</span>
            <ArrowRight size={18} />
          </a>
          <a href="#achievers" className="btn btn-secondary btn-lg">
            <Award size={18} />
            <span>See our results</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <a href="#stats" className="hero-scroll-hint" aria-label="Scroll down">
        <div className="scroll-mouse-icon">
          <div className="scroll-mouse-wheel" />
        </div>
        <span>Scroll</span>
      </a>
    </section>
  );
};
