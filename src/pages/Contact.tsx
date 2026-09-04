import React, { useState, type FormEvent } from 'react';
import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';

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
      <section className="pt-44 lg:pt-48 pb-16" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <SectionHeading as="h1" highlight="NEXT.">
                LET'S BUILD WHAT'S NEXT.
              </SectionHeading>
              <p className="mt-6 text-base text-charcoal/60 leading-relaxed max-w-lg">
                Have a project, infrastructure requirement or security challenge? We're ready to help.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal/30 leading-relaxed">
                Connecting<br />People<br />Places<br /><span className="text-orange">Possibilities</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div>
              <div className="space-y-8">
                <ContactItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                  title="Call Us"
                  detail="+91 XXXXX XXXXX"
                />
                <ContactItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                  title="Email Us"
                  detail="info@sstinfra.com"
                />
                <ContactItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  title="Visit Our Office"
                  detail="Visakhapatnam, India"
                />
                <ContactItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                  title="Business Hours"
                  detail="Mon – Sat | 9:00 AM – 6:00 PM"
                />
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {isSubmitted ? (
                <div className="p-12 rounded-2xl bg-cream/50 border border-cream-dark/30 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-2">Thank You</h3>
                  <p className="text-charcoal/60">Your inquiry has been received. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-cream/50 border border-cream-dark/30 text-charcoal text-sm focus:outline-none focus:border-orange transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="video-surveillance">Video Surveillance</option>
                      <option value="access-control">Access Control</option>
                      <option value="network-infrastructure">Network Infrastructure</option>
                      <option value="electrical">Electrical & Electronic</option>
                      <option value="fire-safety">Fire & Safety</option>
                      <option value="logistics">Logistics & Operations</option>
                      <option value="turnkey">Turnkey Projects</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">
                      Message <span className="text-orange">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      placeholder="Tell us about your project"
                      className={`w-full px-4 py-3 rounded-lg bg-cream/50 border text-charcoal text-sm focus:outline-none focus:border-orange transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-cream-dark/30'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
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
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function ContactItem({ icon, title, detail }: { icon: React.JSX.Element; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">{title}</h3>
        <p className="text-sm text-charcoal/60 mt-0.5">{detail}</p>
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
      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-2">
        {label} {required && <span className="text-orange">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-cream/50 border text-charcoal text-sm focus:outline-none focus:border-orange transition-colors ${
          error ? 'border-red-400' : 'border-cream-dark/30'
        }`}
        required={required}
        aria-invalid={!!error}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
