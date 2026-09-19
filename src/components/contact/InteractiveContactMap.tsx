import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function InteractiveContactMap() {
  const [copied, setCopied] = useState(false);

  const addressText = 'D.No.4-28, Plot 9, Nandanavanam Layout, Vellanki 2, Anandapuram Mandal, Visakhapatnam - 531163, Andhra Pradesh, India';
  const mapQuery = encodeURIComponent('28, Plot 9, 2-12, Vellanki, Andhra Pradesh 531163, India');
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const googleMapsViewUrl = `https://maps.google.com/maps?q=${mapQuery}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <motion.div
      className="contact-hq-console"
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Console Top Bar */}
      <div className="hq-console-header">
        <div className="hq-console-title-group">
          <div className="hq-console-avatar">
            <Building2 size={18} className="text-orange" />
          </div>
          <div>
            <div className="hq-console-title">Sri Sadguru Traders HQ</div>
            <div className="hq-console-subtitle">Central Operations &amp; Engineering Hub</div>
          </div>
        </div>

        <div className="hq-console-status-pill">
          <span className="hq-live-radar-dot" />
          <span>Active Hub</span>
        </div>
      </div>

      {/* Embedded High-Tech Interactive Map Viewport */}
      <div className="hq-console-map-window">
        <iframe
          title="Sri Sadguru Traders Visakhapatnam Location Map"
          src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="hq-console-iframe"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Map Quick Action Overlay */}
        <div className="hq-map-quick-actions">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hq-map-action-btn primary"
            title="Get Navigation Directions"
          >
            <Navigation size={13} />
            <span>Get Directions</span>
          </a>

          <a
            href={googleMapsViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hq-map-action-btn secondary"
            title="Open in Full Google Maps"
          >
            <ExternalLink size={13} />
            <span>Full Map</span>
          </a>
        </div>
      </div>

      {/* Console Bottom Info Deck */}
      <div className="hq-console-footer">
        <div className="hq-console-address-row">
          <MapPin size={16} className="hq-pin-icon" />
          <p className="hq-address-text">
            D.No.4-28, Plot 9, Nandanavanam Layout, Vellanki, Visakhapatnam – 531163
          </p>
          <button
            onClick={handleCopyAddress}
            className={`hq-copy-btn ${copied ? 'copied' : ''}`}
            title="Copy HQ Address"
            type="button"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="hq-console-meta-strip">
          <div className="hq-meta-item">
            <Clock size={13} className="text-orange" />
            <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
          </div>
          <div className="hq-meta-item amc">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>24/7 AMC Emergency Dispatch</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
