/**
 * Footer Component
 * Multi-column footer with links, newsletter signup, and social media
 * Based on Wealthsimple's footer from tax.html
 */

import React, { useState } from 'react';
import { colors, effects } from '../tokens';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface FooterProps {
  /** Footer columns with links */
  columns?: FooterColumn[];

  /** Newsletter signup configuration */
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    disclaimer?: string;
    onSubmit?: (email: string) => void | Promise<void>;
  };

  /** Social media links */
  socialLinks?: SocialLink[];

  /** Legal links */
  legalLinks?: FooterLink[];

  /** Copyright text */
  copyright?: string;

  /** Language selector */
  languageSelector?: {
    current: string;
    options: Array<{ code: string; name: string; href: string }>;
  };

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';
}

const Footer: React.FC<FooterProps> = ({
  columns = [
    {
      title: 'About us',
      links: [
        { label: 'Our company', href: '/about' },
        { label: 'Newsroom', href: '/newsroom', external: true },
        { label: 'Culture Manual', href: '/culture' },
        { label: 'Careers', href: '/careers' },
        { label: 'Security & privacy', href: '/security' },
        { label: 'Wealthsimple Foundation', href: '/foundation', external: true },
        { label: 'Giveback program', href: '/giveback' },
        { label: 'Advisor Insights', href: '/insights', external: true },
        { label: 'Product Insider', href: '/product-news', external: true },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Accessibility', href: '/legal/accessibility' },
        { label: 'Privacy policy', href: '/legal/privacy' },
        { label: 'Terms of use', href: '/legal/terms' },
      ]
    },
    {
      title: 'Accounts',
      links: [
        { label: 'RRSP', href: '/accounts/rrsp' },
        { label: 'TFSA', href: '/accounts/tfsa' },
        { label: 'FHSA', href: '/accounts/fhsa' },
        { label: 'USD savings', href: '/accounts/usd' },
        { label: 'Registered savings account', href: '/accounts/registered-savings' },
        { label: 'Non-registered account', href: '/accounts/non-registered' },
        { label: 'Margin', href: '/accounts/margin' },
        { label: 'Spousal RRSP', href: '/accounts/spousal-rrsp' },
        { label: 'RESP', href: '/accounts/resp' },
        { label: 'Corporate', href: '/accounts/corporate' },
        { label: 'LIRA', href: '/accounts/lira' },
        { label: 'All accounts', href: '/accounts' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Chequing', href: '/chequing' },
        { label: 'Credit card', href: '/credit-card' },
        { label: 'Stocks & ETFs', href: '/self-directed-investing' },
        { label: 'Managed investing', href: '/managed-investing' },
        { label: 'Mortgages', href: '/mortgages' },
        { label: 'Tax', href: '/tax' },
        { label: 'Crypto', href: '/crypto' },
        { label: 'For Business', href: '/for-business' },
      ]
    },
    {
      title: 'Social',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/wealthsimple/', external: true },
        { label: 'X', href: 'https://x.com/Wealthsimple', external: true },
        { label: 'YouTube', href: 'https://www.youtube.com/c/wealthsimple/', external: true },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wealthsimple/', external: true },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Transfer an account', href: '/get-in-touch' },
        { label: 'Work with an advisor', href: '/advice' },
        { label: 'Help centre', href: 'https://help.wealthsimple.com/hc/en-ca', external: true },
        { label: 'Contact us', href: '/contact' },
        { label: 'Refer a friend', href: '/referrals' },
      ]
    }
  ],
  newsletter = {
    title: 'TLDR',
    description: 'Sign up for our weekly non-boring newsletter about money, markets, and more.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    disclaimer: 'By providing your email, you are consenting to receive communications from Wealthsimple Media Inc. Visit our Privacy Policy for more info, or contact us at privacy@wealthsimple.com or 80 Spadina Ave., Toronto, ON.'
  },
  socialLinks,
  legalLinks = [
    { label: 'Accessibility', href: '/legal/accessibility/statement' },
    { label: 'Privacy policy', href: '/legal/privacy' },
    { label: 'Terms of use', href: '/legal/terms' },
  ],
  copyright = '© 2016–2025, Wealthsimple Technologies Inc. All Rights Reserved.',
  languageSelector = {
    current: 'English',
    options: [
      { code: 'en', name: 'English', href: '/en-ca/tax' },
      { code: 'fr', name: 'Français', href: '/fr-ca/tax' }
    ]
  },
  brand = 'taxcat'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (newsletter.onSubmit) {
        await newsletter.onSubmit(email);
      }
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-background">
        <div className="footer-wrapper">
          {/* TLDR Newsletter Section */}
          <div className="tldr-section">
            <div className="tldr-content">
              <div className="tldr-text">
                <img
                  src="/_next/static/media/tldr.6a6ee71e.png"
                  alt=""
                  className="tldr-logo"
                  width="264"
                  height="64"
                />
                <p className="tldr-description">{newsletter.description}</p>
                <p className="tldr-link">
                  <a href="https://tldr-archive.wealthsimple.com/archive" target="_blank" rel="noopener noreferrer">
                    Meet TLDR
                  </a>
                </p>
              </div>

              <div className="newsletter-signup">
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form" noValidate>
                  <div className="newsletter-input-group">
                    <label htmlFor="newsletter-email" className="visually-hidden">
                      {newsletter.placeholder}
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={newsletter.placeholder}
                      className="newsletter-input"
                      required
                      aria-describedby={submitStatus === 'error' ? 'newsletter-error' : undefined}
                    />
                    <button
                      type="submit"
                      className="newsletter-button"
                      disabled={isSubmitting || !email.trim()}
                    >
                      <span>{isSubmitting ? 'Subscribing...' : newsletter.buttonText}</span>
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="newsletter-success" role="status" aria-live="polite">
                      <p>Thank you! We've sent you an email confirmation.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="newsletter-error" id="newsletter-error" role="alert" aria-live="polite">
                      <p>Something went wrong. Please try again.</p>
                    </div>
                  )}
                </form>

                {newsletter.disclaimer && (
                  <div className="newsletter-disclaimer">
                    <p>{newsletter.disclaimer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Footer Links */}
          <nav className="footer-nav" aria-label="Footer directory">
            <div className="footer-grid">
              {columns.map((column, index) => (
                <div key={index} className="footer-column">
                  <h3 className="footer-column-title">{column.title}</h3>
                  <ul className="footer-links">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="footer-link-item">
                        <a
                          href={link.href}
                          className="footer-link"
                          {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="footer-bottom">
            {/* Language Selector */}
            {languageSelector && (
              <div className="language-selector">
                <button
                  className="language-button"
                  aria-expanded="false"
                  aria-controls="language-menu"
                  aria-label="Select website language"
                >
                  <span>{languageSelector.current}</span>
                  <svg className="language-caret" width="12" height="12" viewBox="0 0 14 8" fill="none">
                    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <ul id="language-menu" className="language-menu" role="menu" hidden>
                  {languageSelector.options.map((option) => (
                    <li key={option.code} role="none">
                      <a
                        href={option.href}
                        className="language-option"
                        role="menuitem"
                        {...(option.code !== 'en' && { hrefLang: option.code })}
                      >
                        {option.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal and Copyright */}
            <div className="footer-legal">
              <div className="legal-links">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="legal-link"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="copyright-section">
                <p className="copyright-text">{copyright}</p>
                <p className="footer-disclaimers">
                  For further details see our{' '}
                  <a href="/legal/legal-disclaimers" className="footer-link">
                    Legal Disclosures
                  </a>
                  . By using this website, you accept our{' '}
                  <a href="/legal/terms" className="footer-link">
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a href="/legal/privacy" className="footer-link">
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="footer-disclaimers">
                  For information about filing a complaint please visit{' '}
                  <a href="/legal/file-complaint" className="footer-link">
                    How to File a Complaint
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          background: ${colors.primary[900]};
          color: ${colors.base.white};
        }

        .footer-background {
          background: ${colors.primary[900]};
        }

        .footer-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 640px) {
          .footer-wrapper {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-wrapper {
            padding: 0 3rem;
          }
        }

        /* TLDR Newsletter Section */
        .tldr-section {
          padding: 3rem 0;
          border-bottom: 1px solid ${colors.primary[700]};
        }

        .tldr-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .tldr-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        .tldr-text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tldr-logo {
          width: 264px;
          height: auto;
        }

        .tldr-description {
          font-size: 1rem;
          line-height: 1.5;
          color: ${colors.primary[100]};
          margin: 0;
        }

        @media (min-width: 768px) {
          .tldr-description {
            font-size: 1.25rem;
          }
        }

        .tldr-link {
          margin: 0;
        }

        .tldr-link a {
          color: ${brandColors.primary};
          text-decoration: none;
          font-weight: 500;
        }

        .tldr-link a:hover,
        .tldr-link a:focus {
          text-decoration: underline;
        }

        /* Newsletter Signup */
        .newsletter-signup {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .newsletter-input-group {
          display: flex;
          gap: 0;
          border-radius: ${effects.borderRadius.md};
          overflow: hidden;
          background: ${colors.base.white};
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          font-size: 1rem;
          color: ${colors.primary[800]};
          background: transparent;
        }

        .newsletter-input:focus {
          outline: none;
        }

        .newsletter-input::placeholder {
          color: ${colors.primary[400]};
        }

        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: ${brandColors.primary};
          color: ${colors.base.white};
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .newsletter-button:hover:not(:disabled),
        .newsletter-button:focus:not(:disabled) {
          background: ${brandColors.primaryDark};
        }

        .newsletter-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .newsletter-success,
        .newsletter-error {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .newsletter-success {
          color: ${colors.semantic.success};
        }

        .newsletter-error {
          color: ${colors.semantic.error};
        }

        .newsletter-disclaimer {
          font-size: 0.75rem;
          color: ${colors.primary[300]};
          line-height: 1.4;
        }

        .newsletter-disclaimer p {
          margin: 0;
        }

        /* Footer Navigation */
        .footer-nav {
          padding: 3rem 0;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-column-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${colors.primary[200]};
          margin: 0 0 1rem 0;
        }

        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-link-item {
          margin-bottom: 0.5rem;
        }

        .footer-link {
          color: ${colors.primary[100]};
          text-decoration: none;
          font-size: 0.875rem;
          line-height: 1.4;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-link:hover,
        .footer-link:focus {
          color: ${brandColors.primary};
        }

        /* Footer Bottom */
        .footer-bottom {
          padding: 2rem 0;
          border-top: 1px solid ${colors.primary[700]};
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        /* Language Selector */
        .language-selector {
          position: relative;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          background: none;
          border: none;
          color: ${colors.primary[200]};
          cursor: pointer;
          font-size: 0.875rem;
        }

        .language-caret {
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .language-button[aria-expanded="true"] .language-caret {
          transform: rotate(180deg);
        }

        .language-menu {
          position: absolute;
          bottom: 100%;
          left: 0;
          background: ${colors.primary[800]};
          border: 1px solid ${colors.primary[600]};
          border-radius: ${effects.borderRadius.md};
          min-width: 120px;
          list-style: none;
          margin: 0;
          padding: 0.5rem 0;
          box-shadow: ${effects.boxShadow.lg};
        }

        .language-option {
          display: block;
          padding: 0.5rem 1rem;
          color: ${colors.primary[100]};
          text-decoration: none;
          font-size: 0.875rem;
          transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .language-option:hover,
        .language-option:focus {
          background: ${colors.primary[700]};
        }

        /* Legal and Copyright */
        .footer-legal {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .footer-legal {
            flex-direction: row;
            gap: 3rem;
          }
        }

        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .legal-link {
          color: ${colors.primary[300]};
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .legal-link:hover,
        .legal-link:focus {
          color: ${brandColors.primary};
        }

        .copyright-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .copyright-text {
          font-size: 0.875rem;
          color: ${colors.primary[300]};
          margin: 0;
        }

        .footer-disclaimers {
          font-size: 0.75rem;
          color: ${colors.primary[400]};
          line-height: 1.4;
          margin: 0;
        }

        .footer-disclaimers .footer-link {
          color: ${colors.primary[300]};
          text-decoration: underline;
        }

        .footer-disclaimers .footer-link:hover,
        .footer-disclaimers .footer-link:focus {
          color: ${brandColors.primary};
        }

        /* Visually hidden utility */
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;