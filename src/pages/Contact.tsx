import React, { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ChevronDown,
  Navigation,
  Globe,
  MessageSquare,
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import CustomSelect from '../components/ui/CustomSelect';
import InteractiveContactMap from '../components/contact/InteractiveContactMap';
import '../styles/Contact.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const FAQ_ITEMS = [
  {
    q: 'How fast can SST deploy an on-site inspection or assessment team?',
    a: 'For Andhra Pradesh and Telangana regions, our engineering teams can typically conduct an on-site survey within 24–48 hours. For Pan-India enterprise deployments, site surveys are scheduled based on the project scope and rollout timeline.'
  },
  {
    q: 'Do you provide turnkey execution from design to handover?',
    a: 'Yes, SST specializes in complete turnkey infrastructure projects. We handle everything from system architecture, equipment procurement, cabling, and installation to final testing, commissioning, and staff training.'
  },
  {
    q: 'What is covered under SST’s AMC (Annual Maintenance Contract)?',
    a: 'Our AMC packages include scheduled preventive maintenance, firmware updates, 24/7 emergency breakdown support, spare parts replacement management, and SLA-guaranteed technician dispatch.'
  },
  {
    q: 'Can you integrate modern IP security with our legacy infrastructure?',
    a: 'Absolutely. We design hybrid architectures that seamlessly integrate newer IP surveillance, access control, and wireless networks with existing legacy analog or serial systems without operational downtime.'
  }
];

const SERVICE_OPTIONS = [
  { value: 'turnkey-projects', label: 'Turnkey Infrastructure Projects' },
  { value: 'video-surveillance', label: 'CCTV & Video Surveillance' },
  { value: 'access-control', label: 'Access Control & Biometrics' },
  { value: 'fire-fighting', label: 'Fire & Life Safety Systems' },
  { value: 'network-infrastructure', label: 'Network Infrastructure & Cabling' },
  { value: 'switches-storage', label: 'Servers, Switches & Storage' },
  { value: 'logistics', label: 'Logistics & Fleet GPS Tracking' },
  { value: 'electrical-electronics', label: 'Electrical & Electronic Systems' },
  { value: 'wireless-network', label: 'Enterprise Wireless & Point-to-Point' },
  { value: 'intrusion-detection', label: 'Intrusion Detection & Alarms' },
  { value: 'amc-support', label: 'Annual Maintenance Contract (AMC)' },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone && !/^[+]?[\d\s()-]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide details about your inquiry';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Format WhatsApp message with inquiry details
    let fullMessage = `*New Contact Inquiry - SST Portal*\n\n`;
    fullMessage += `*Name:* ${formData.name}\n`;
    fullMessage += `*Email:* ${formData.email}\n`;
    if (formData.phone) fullMessage += `*Phone:* ${formData.phone}\n`;
    if (formData.company) fullMessage += `*Company:* ${formData.company}\n`;
    if (formData.service) {
      const selectedLabel = SERVICE_OPTIONS.find(s => s.value === formData.service)?.label || formData.service;
      fullMessage += `*Service Required:* ${selectedLabel}\n`;
    }
    fullMessage += `\n*Message:*\n${formData.message}`;

    const whatsappUrl = `https://wa.me/919494139156?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="contact-page-wrapper">
        {/* =========================================================================
            1. HERO SECTION WITH INDUSTRIAL COMMAND DECK & DIRECT ACTIONS
            ========================================================================= */}
        <section className="contact-hero-premium">
          {/* Subtle Ambient Blueprint Grid and Glows */}
          <div className="contact-hero-grid-pattern" />
          <div className="contact-hero-glow-blob orange" />
          <div className="contact-hero-glow-blob blue" />

          <div className="container relative z-10">
            <div className="contact-hero-split-grid">
              
              {/* Left Column: Heading, Direct Channels & SLA Metrics */}
              <motion.div
                className="contact-hero-left"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Live Status Eyebrow Badge */}
                <div className="contact-hero-eyebrow-badge">
                  <span className="contact-beacon-ping-wrapper">
                    <span className="contact-beacon-dot" />
                    <span className="contact-beacon-pulse" />
                  </span>
                  <span className="contact-badge-text">CENTRAL DISPATCH ONLINE • PAN-INDIA RESPONSE</span>
                </div>

                <h1 className="contact-hero-heading">
                  LET'S BUILD &amp; SECURE <br />
                  YOUR <span className="text-orange">INFRASTRUCTURE.</span>
                </h1>

                <p className="contact-hero-desc">
                  Connect with our engineering specialists for turnkey enterprise security, surveillance, networking, and critical infrastructure solutions. Fast-track surveys and 24/7 technical dispatch across India.
                </p>

                {/* Direct Action Fast-Links */}
                <div className="contact-quick-channels">
                  <a
                    href="tel:+919494139156"
                    className="quick-channel-card"
                    title="Call Direct Hotline"
                  >
                    <div className="quick-channel-icon-box phone">
                      <Phone size={17} />
                    </div>
                    <div className="quick-channel-info">
                      <span className="quick-channel-label">Direct Hotline</span>
                      <span className="quick-channel-val">+91 94941 39156</span>
                    </div>
                  </a>

                  <a
                    href="mailto:info@sstco.in"
                    className="quick-channel-card"
                    title="Enterprise RFP & Inquiry Mail"
                  >
                    <div className="quick-channel-icon-box mail">
                      <Mail size={17} />
                    </div>
                    <div className="quick-channel-info">
                      <span className="quick-channel-label">Official Mail</span>
                      <span className="quick-channel-val">info@sstco.in</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919494139156?text=Hi%20SST%20Team%2C%20I%20have%20an%20infrastructure%2Fsecurity%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-channel-card whatsapp"
                    title="Instant WhatsApp Chat"
                  >
                    <div className="quick-channel-icon-box whatsapp">
                      <MessageSquare size={17} />
                    </div>
                    <div className="quick-channel-info">
                      <span className="quick-channel-label">Instant WhatsApp</span>
                      <span className="quick-channel-val">Start Fast Chat</span>
                    </div>
                  </a>
                </div>

                {/* SLA Trust Metrics Bar */}
                <div className="contact-hero-sla-strip">
                  <div className="sla-item">
                    <span className="sla-val">&lt; 24h</span>
                    <span className="sla-lbl">Site Survey (AP &amp; TS)</span>
                  </div>
                  <div className="sla-divider" />
                  <div className="sla-item">
                    <span className="sla-val">24/7</span>
                    <span className="sla-lbl">Emergency AMC Dispatch</span>
                  </div>
                  <div className="sla-divider" />
                  <div className="sla-item">
                    <span className="sla-val">Pan-India</span>
                    <span className="sla-lbl">Rollout Capability</span>
                  </div>
                </div>

                {/* Smooth Scroll to Form Button */}
                <div className="contact-hero-cta-row">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="contact-hero-scroll-btn"
                  >
                    <span>Submit Inquiry Message Below</span>
                    <ArrowDownRight size={16} />
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Interactive HQ Map Console */}
              <div className="contact-hero-right">
                <InteractiveContactMap />
              </div>

            </div>
          </div>
        </section>


        {/* =========================================================================
            2. FLOATING SPLIT CONTACT CARD (Form on Left + Info on Right)
            ========================================================================= */}
        <section id="contact-form-section" className="contact-card-section">
          <div className="container">
            <motion.div
              className="contact-split-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left Panel: White Message Form */}
              <div className="contact-form-panel">
                <div className="contact-form-header">
                  <div>
                    <span className="contact-form-eyebrow">DIRECT INQUIRY</span>
                    <h2 className="contact-form-title">Send us a Message</h2>
                  </div>
                  <div className="contact-form-header-icon">
                    <Mail size={20} strokeWidth={2} />
                  </div>
                </div>

                {isSuccess && (
                  <motion.div
                    className="contact-success-banner"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <CheckCircle2 size={22} className="flex-shrink-0" />
                    <div>
                      <h4 className="success-banner-title">Inquiry Sent Successfully!</h4>
                      <p className="success-banner-desc">
                        Thank you for reaching out. We have prepared your details for WhatsApp dispatch, and an SST technical specialist will follow up with you promptly.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} noValidate className="contact-form-grid">
                  <div className="contact-field-row">
                    {/* Your Name */}
                    <div className="contact-input-group floating-group">
                      <input
                        type="text"
                        id="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`contact-clean-input ${errors.name ? 'input-has-error' : ''}`}
                      />
                      <label htmlFor="name" className="contact-floating-label">
                        Your Name <span className="contact-input-req">*</span>
                      </label>
                      {errors.name && <span className="contact-field-error">{errors.name}</span>}
                    </div>

                    {/* Email Address */}
                    <div className="contact-input-group floating-group">
                      <input
                        type="email"
                        id="email"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`contact-clean-input ${errors.email ? 'input-has-error' : ''}`}
                      />
                      <label htmlFor="email" className="contact-floating-label">
                        Email Address <span className="contact-input-req">*</span>
                      </label>
                      {errors.email && <span className="contact-field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="contact-field-row">
                    {/* Phone Number */}
                    <div className="contact-input-group floating-group">
                      <input
                        type="tel"
                        id="phone"
                        placeholder=" "
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`contact-clean-input ${errors.phone ? 'input-has-error' : ''}`}
                      />
                      <label htmlFor="phone" className="contact-floating-label">Phone Number</label>
                      {errors.phone && <span className="contact-field-error">{errors.phone}</span>}
                    </div>

                    {/* Company */}
                    <div className="contact-input-group floating-group">
                      <input
                        type="text"
                        id="company"
                        placeholder=" "
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="contact-clean-input"
                      />
                      <label htmlFor="company" className="contact-floating-label">Company / Organization</label>
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div className="contact-input-group">
                    <label className="contact-input-label">Service Interested In</label>
                    <CustomSelect
                      value={formData.service}
                      onChange={(val) => handleChange('service', val)}
                      placeholder="Select a technology or infrastructure service"
                      options={SERVICE_OPTIONS}
                    />
                  </div>

                  {/* Message */}
                  <div className="contact-input-group floating-group">
                    <div style={{ position: 'relative' }}>
                      <textarea
                        id="message"
                        placeholder=" "
                        value={formData.message}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            handleChange('message', e.target.value);
                          }
                        }}
                        rows={2}
                        className={`contact-clean-textarea ${errors.message ? 'input-has-error' : ''}`}
                      />
                      <label htmlFor="message" className="contact-floating-label">
                        Project Details / Inquiry <span className="contact-input-req">*</span>
                      </label>
                      <div style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '0.75rem', color: formData.message.length >= 500 ? '#ef4444' : '#94a3b8', fontWeight: 500 }}>
                        {formData.message.length} / 500
                      </div>
                    </div>
                    {errors.message && <span className="contact-field-error">{errors.message}</span>}
                  </div>

                  {/* File Upload Dropzone */}
                  <label className="enterprise-file-upload">
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          alert(`File selected: ${e.target.files[0].name}`);
                        }
                      }} 
                    />
                    <div className="upload-icon-box" style={{ width: '2rem', height: '2rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                    </div>
                    <div className="upload-text">
                      <span className="upload-title" style={{ fontSize: '0.75rem' }}>Attach RFP or Floorplan (Optional)</span>
                    </div>
                  </label>

                  {/* Rectangular Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-linear-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="submit-btn-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', marginRight: '8px' }} />
                        <span>ENCRYPTING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} style={{ marginRight: '8px' }} />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                  
                  {/* Trust Badges */}
                  <div className="enterprise-trust-strip">
                    <div className="trust-item">
                      <ShieldCheck size={14} className="text-orange" />
                      <span>256-bit Secure</span>
                    </div>
                    <div className="trust-item">
                      <CheckCircle2 size={14} className="text-orange" />
                      <span>ISO Compliant</span>
                    </div>
                    <div className="trust-item">
                      <Clock size={14} className="text-orange" />
                      <span>24/7 SLA Support</span>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="enterprise-social-proof">
                    <p className="social-proof-title">TRUSTED FOR CRITICAL INFRASTRUCTURE</p>
                    <div className="client-logos-row">
                      <Building2 size={20} className="social-proof-icon" />
                      <Navigation size={20} className="social-proof-icon" />
                      <Globe size={20} className="social-proof-icon" />
                      <span className="social-proof-text">100+ Enterprise Deployments</span>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right Panel: Dark Navy Contact Information */}
              <div className="contact-info-panel">
                {/* Subtle SST Logo Emblem in Background */}
                <img
                  src="/images/logo/LOGO.png"
                  alt=""
                  aria-hidden="true"
                  className="contact-info-watermark"
                />

                <div className="contact-info-top">
                  <h3 className="contact-info-title">Contact Information</h3>
                  <p className="contact-info-sub">
                    Direct access to our central executive office, technical dispatch, and project management desks.
                  </p>

                  <div className="contact-info-list">
                    {/* Head Office Address */}
                    <div className="contact-info-item">
                      <div className="contact-info-icon-box">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="contact-info-label">Headquarters Location</div>
                        <div className="contact-info-val" style={{ marginBottom: '10px' }}>
                          D.No.4-28, Plot 9, Nandanavanam Layout,<br />
                          Vellanki 2, Anandapuram Mandal,<br />
                          Visakhapatnam - 531163, Andhra Pradesh
                        </div>
                        <a 
                          href="https://maps.google.com/?q=SST+Visakhapatnam" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', transition: 'background-color 0.2s', textDecoration: 'none' }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        >
                          <Navigation size={12} />
                          Get Directions
                        </a>
                      </div>
                    </div>

                    {/* Phone Support */}
                    <div className="contact-info-item">
                      <div className="contact-info-icon-box">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="contact-info-label">Direct Phone &amp; Support</div>
                        <div className="contact-info-val">
                          <a href="tel:+919494139156">+91 9494 139 156</a><br />
                          <a href="tel:+917095306939">+91 7095 306 939</a>
                        </div>
                      </div>
                    </div>

                    {/* Official Emails */}
                    <div className="contact-info-item">
                      <div className="contact-info-icon-box">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="contact-info-label">Official Inquiries &amp; RFPs</div>
                        <div className="contact-info-val">
                          <a href="mailto:info@sstco.in">info@sstco.in</a><br />
                          <a href="mailto:sstvisakhapatnam@gmail.com">sstvisakhapatnam@gmail.com</a>
                        </div>
                      </div>
                    </div>

                    {/* Operational Hours */}
                    <div className="contact-info-item">
                      <div className="contact-info-icon-box">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="contact-info-label">Working Hours</div>
                        <div className="contact-info-val">
                          Monday – Saturday: 9:00 AM – 7:00 PM<br />
                          <span style={{ color: '#F97316', fontSize: '0.82rem', fontWeight: 600 }}>
                            24/7 Dedicated AMC Emergency Dispatch
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect Icons */}
                <div className="contact-info-bottom">
                  <div className="contact-social-label">Follow &amp; Connect</div>
                  <div className="contact-social-links">
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label="LinkedIn"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label="Instagram"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>

                    {/* WhatsApp Direct */}
                    <a
                      href="https://wa.me/919494139156"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare size={15} />
                    </a>

                    {/* Twitter/X */}
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label="Twitter"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* =========================================================================
            4. ENTERPRISE FAQ ACCORDION SECTION
            ========================================================================= */}
        <section className="contact-faq-section">
          <div className="container">
            <div className="faq-container">
              <div className="faq-header-wrap">
                <span className="contact-hero-eyebrow" style={{ color: '#F4511E' }}>
                  <span className="contact-eyebrow-dot" style={{ backgroundColor: '#F4511E', boxShadow: '0 0 8px #F4511E' }} />
                  COMMON INQUIRIES
                </span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.975rem', marginTop: '0.6rem' }}>
                  Quick answers to common questions about our technical consultations, turnarounds, and support agreements.
                </p>
              </div>

              <div className="faq-accordion-list">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-accordion-btn"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-text">{faq.q}</span>
                        <div className="faq-accordion-icon">
                          <ChevronDown size={16} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="faq-accordion-content">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Direct WhatsApp Callout Banner */}
              <div className="contact-cta-banner">
                <div className="cta-banner-content">
                  <h3 className="cta-banner-title">Need Immediate Project Support?</h3>
                  <p className="cta-banner-desc">
                    Connect directly with our senior infrastructure engineer on WhatsApp for fast response times and instant scope evaluations.
                  </p>
                </div>
                <div className="cta-banner-actions">
                  <a
                    href="https://wa.me/919494139156?text=Hi%20SST%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20infrastructure%20and%20security%20solutions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-whatsapp-btn"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Us Now</span>
                  </a>
                  <a
                    href="tel:+919494139156"
                    className="cta-call-btn"
                  >
                    <Phone size={16} />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
