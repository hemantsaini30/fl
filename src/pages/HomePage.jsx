import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { BatchesSection } from '../components/sections/BatchesSection';
import { FacultySection } from '../components/sections/FacultySection';
import { AchieversSection } from '../components/sections/AchieversSection';
import { FacilitiesSection } from '../components/sections/FacilitiesSection';
import { TripsSection } from '../components/sections/TripsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { EnquirySection } from '../components/sections/EnquirySection';
import { Footer } from '../components/common/Footer';

export const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (courseName) => {
    setSelectedCourse(courseName);
  };

  return (
    <div className="home-page">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Stats Strip */}
      <StatsSection />

      {/* 4. About & Methodology */}
      <AboutSection />

      {/* 5. Batches / Courses */}
      <BatchesSection onSelectCourse={handleSelectCourse} />

      {/* 6. Faculty */}
      <FacultySection />

      {/* 7. Achievers (Dark Section with Carousel & Year Filters) */}
      <AchieversSection />

      {/* 8. Facilities (Asymmetric Photo Grid) */}
      <FacilitiesSection />

      {/* 9. Trips & Gallery (Carousel) */}
      <TripsSection />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Enquiry Form (Dark Section) */}
      <EnquirySection preSelectedCourse={selectedCourse} />

      {/* 12. Footer */}
      <Footer />
    </div>
  );
};
