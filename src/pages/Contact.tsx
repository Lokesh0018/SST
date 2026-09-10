import React, { useState, type FormEvent } from 'react';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^[+]?[\d\s()-]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    const whatsappUrl = `https://wa.me/919494139156?text=${encodeURIComponent(formData.message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="contact-hero contact-hero-bg">
        <div className="container">
          <div className="contact-hero-header">
            <div>
              <SectionHeading as="h1" highlight="NEXT.">
                LET'S BUILD WHAT'S NEXT.
              </SectionHeading>
              <p className="contact-hero-text">
                Have a client, infrastructure requirement or security challenge? We're ready to help.
              </p>
            </div>
            <div className="contact-hero-right">
              <p className="contact-hero-right-text">
                Connecting<br />People<br />Places<br /><span className="contact-hero-right-highlight">Possibilities</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left - Contact Info */}
            <div>
              <div className="contact-info-list">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <ContactItem
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    }
                    title="Call Anytime"
                    detail={
                      <>
                        +91 9494 139 156<br />
                        +91 7095 306 939
                      </>
                    }
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <ContactItem
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    }
                    title="Send E-Mail"
                    detail={
                      <>
                        info@sstco.in<br />
                        sstvisakhapatnam@gmail.com
                      </>
                    }
                  />
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <ContactItem
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    }
                    title="Our Location"
                    detail={
                      <>
                        D.No.4-28, Plot 9,<br />
                        Nandanavanam Layout, Vellanki 2,<br />
                        Visakhapatnam - 531163
                      </>
                    }
                  />
                </div>
                {/* Social Media */}
                <div className="contact-socials animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h3 className="contact-socials-title">Follow Us</h3>
                  <div className="contact-socials-list">
                    <a href="#" aria-label="Facebook" className="contact-social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" aria-label="Twitter" className="contact-social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="contact-social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" aria-label="Pinterest" className="contact-social-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.604 0 12.017 0z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {isSubmitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="contact-success-title">Thank You</h3>
                  <p className="contact-success-text">Your inquiry has been received. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form animate-fade-in-up" style={{ animationDelay: '0.4s' }} noValidate>
                  <div className="contact-form-row">
                    <FormField
                      label="Name"
                      required
                      error={errors.name}
                      value={formData.name}
                      onChange={(v) => handleChange('name', v)}
                      placeholder="Your name"
                    />
                    <FormField
                      label="Email"
                      type="email"
                      required
                      error={errors.email}
                      value={formData.email}
                      onChange={(v) => handleChange('email', v)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="contact-form-row">
                    <FormField
                      label="Phone"
                      type="tel"
                      error={errors.phone}
                      value={formData.phone}
                      onChange={(v) => handleChange('phone', v)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    <FormField
                      label="Company"
                      value={formData.company}
                      onChange={(v) => handleChange('company', v)}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="contact-form-label">Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="contact-form-select"
                    >
                      <option value="">Select a service</option>
                      <option value="turnkey-projects">Turnkey Projects</option>
                      <option value="intrusion-detection">Intrusion Detection</option>
                      <option value="access-control">Access Control</option>
                      <option value="switches-storage">Switches & Storage</option>
                      <option value="logistics">Logistics</option>
                      <option value="electrical-electronics">Electrical & Electronics</option>
                      <option value="fire-fighting">Fire Fighting</option>
                      <option value="video-surveillance">Video Surveillance</option>
                      <option value="wireless-network">Wireless Technology</option>
                      <option value="hardware-tools">Hardware & Tools</option>
                      <option value="network-infrastructure">Network Infrastructure</option>
                    </select>
                  </div>
                  <div>
                    <label className="contact-form-label">
                      Message <span className="contact-form-req">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      placeholder="Tell us about your client"
                      className={`contact-form-textarea ${
                        errors.message ? 'contact-form-error-input' : ''
                      }`}
                    />
                    {errors.message && <p className="contact-form-error">{errors.message}</p>}
                  </div>
                  <div className="contact-form-btn">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                      icon={
                        !isSubmitting ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        ) : undefined
                      }
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* Map Section */}
          <div className="contact-map-container animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <iframe
              title="Our Location"
              src="https://maps.google.com/maps?q=D.No.4-28,+Plot+9,+Nandanavanam+Layout,+Vellanki+2,+Visakhapatnam+-+531163&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '1rem', marginTop: '4rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function ContactItem({ icon, title, detail }: { icon: React.JSX.Element; title: string; detail: React.ReactNode }) {
  return (
    <div className="contact-item">
      <div className="contact-item-icon">
        {icon}
      </div>
      <div>
        <h3 className="contact-item-title">{title}</h3>
        <p className="contact-item-detail">{detail}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  type = 'text',
  required,
  error,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="contact-form-label">
        {label} {required && <span className="contact-form-req">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`contact-form-input ${
          error ? 'contact-form-error-input' : ''
        }`}
        required={required}
        aria-invalid={!!error}
      />
      {error && <p className="contact-form-error">{error}</p>}
    </div>
  );
}
