import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, BookOpen, MessageSquare, Send, CheckCircle2, MapPin, Mail, Clock, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { INSTITUTE_INFO, BATCHES } from '../../data/content';
import { submitEnquiry } from '../../lib/supabase';

export const EnquirySection = ({ preSelectedCourse }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: BATCHES[0].name,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update selected course if passed from batch card click
  useEffect(() => {
    if (preSelectedCourse) {
      setFormData((prev) => ({ ...prev, course: preSelectedCourse }));
    }
  }, [preSelectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        course: formData.course,
        message: formData.message.trim() || null
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        course: BATCHES[0].name,
        message: ''
      });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-dark" id="enquiry">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Admissions & Contact</span>
          <h2 className="section-title">Book a Free Counseling & Demo Class</h2>
          <p className="section-subtitle">
            Speak directly with our senior academic counselors to understand batch timings, fees, and scholarship tests.
          </p>
        </div>

        <div className="enquiry-grid">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-sidebar">
            <a href={`tel:${INSTITUTE_INFO.phoneRaw}`} className="contact-card-item">
              <div className="contact-icon-box">
                <Phone size={22} />
              </div>
              <div className="contact-info-text">
                <h4>Call Admissions Desk</h4>
                <p>{INSTITUTE_INFO.phone}</p>
                <span className="contact-sub-text">Direct line • Instant consultation</span>
              </div>
            </a>

            <a
              href={`https://wa.me/${INSTITUTE_INFO.whatsappRaw}?text=Hi%2C%20I%20am%20interested%20in%20KKCC%20coaching%20classes`}
              target="_blank"
              rel="noreferrer"
              className="contact-card-item"
            >
              <div className="contact-icon-box" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                <MessageCircle size={22} />
              </div>
              <div className="contact-info-text">
                <h4>WhatsApp Support</h4>
                <p>{INSTITUTE_INFO.whatsapp}</p>
                <span className="contact-sub-text">Quick response on syllabus & fees</span>
              </div>
            </a>

            <a href={`mailto:${INSTITUTE_INFO.email}`} className="contact-card-item">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div className="contact-info-text">
                <h4>Email Inquiries</h4>
                <p>{INSTITUTE_INFO.email}</p>
                <span className="contact-sub-text">For fee structure & detailed brochure</span>
              </div>
            </a>

            <div className="contact-card-item" style={{ cursor: 'default' }}>
              <div className="contact-icon-box">
                <MapPin size={22} />
              </div>
              <div className="contact-info-text">
                <h4>Institute Location</h4>
                <p style={{ fontSize: '0.95rem' }}>{INSTITUTE_INFO.address}</p>
                <span className="contact-sub-text">{INSTITUTE_INFO.timings}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="enquiry-form-container">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="enquiry-form-header">
                    <h3>Request Academic Consultation</h3>
                    <p>Fill out this quick form and our counseling team will call you within 2 hours.</p>
                  </div>

                  {errorMsg && (
                    <div className="form-error-msg" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="student-name">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <User size={18} className="form-input-icon" />
                      <input
                        id="student-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="student-phone">
                      Phone Number <span className="required-star">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <Phone size={18} className="form-input-icon" />
                      <input
                        id="student-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="student-course">
                      Interested Program / Class <span className="required-star">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <BookOpen size={18} className="form-input-icon" />
                      <select
                        id="student-course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="form-control form-select"
                        required
                      >
                        {BATCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name} ({b.classes})
                          </option>
                        ))}
                        <option value="Scholarship Test">KKCC Talent Scholarship Test</option>
                        <option value="General Inquiry">General Counseling / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="student-msg">
                      Message / Specific Questions <span style={{ opacity: 0.6 }}>(Optional)</span>
                    </label>
                    <div className="form-input-wrapper">
                      <MessageSquare size={18} className="form-input-icon" style={{ top: '16px' }} />
                      <textarea
                        id="student-msg"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mention school, current score, target year, or specific doubt..."
                        className="form-control form-textarea"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary form-btn-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Admission Enquiry</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="form-disclaimer">
                    🔒 Your details are 100% confidential. No spam guaranteed.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="form-success-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="success-icon-circle">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3>Enquiry Submitted Successfully!</h3>
                  <p>
                    Thank you for reaching out to <strong>{INSTITUTE_INFO.name}</strong>. Our senior academic counselor will call you within 2 hours with batch timings and demo schedule.
                  </p>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Enquiry
                    </button>
                    <a href={`tel:${INSTITUTE_INFO.phoneRaw}`} className="btn btn-primary">
                      <Phone size={16} />
                      <span>Call Now For Quick Help</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
