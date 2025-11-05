/**
 * Navigation Component
 * Responsive header with logo, navigation links, and CTAs
 * Based on Wealthsimple's navigation from tax.html
 */

import React, { useState, useEffect } from 'react';
import { colors, effects } from '../tokens';

interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationLink[];
}

interface NavigationProps {
  /** Logo configuration */
  logo?: {
    src: string;
    alt: string;
    href?: string;
  };

  /** Navigation links */
  links?: NavigationLink[];

  /** Primary CTA button */
  primaryCTA?: {
    label: string;
    href: string;
    external?: boolean;
  };

  /** Secondary CTA button */
  secondaryCTA?: {
    label: string;
    href: string;
    external?: boolean;
  };

  /** Brand theme (taxcat or ekbooks) */
  brand?: 'taxcat' | 'ekbooks';

  /** Whether navigation is sticky */
  sticky?: boolean;

  /** Skip to main content link */
  skipToMain?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  logo = {
    src: '/logos/taxcat-logo.svg',
    alt: 'TaxCat',
    href: '/'
  },
  links = [],
  primaryCTA = {
    label: 'Start filing',
    href: '/signup'
  },
  secondaryCTA = {
    label: 'Log in',
    href: '/login'
  },
  brand = 'taxcat',
  sticky = true,
  skipToMain = true
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky behavior
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const brandColors = brand === 'taxcat' ? colors.taxcat : colors.ekbooks;

  return (
    <>
      {/* Skip to main content */}
      {skipToMain && (
        <div className="skip-to-main">
          <a
            href="#main"
            className="skip-link"
            onFocus={(e) => e.target.style.opacity = '1'}
            onBlur={(e) => e.target.style.opacity = '0'}
          >
            Skip to main content
          </a>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`navigation ${sticky ? 'sticky' : ''} ${isScrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main menu"
      >
        {/* Scroll detector for sticky behavior */}
        <div className="scroll-detector" />

        <div className="nav-background">
          <div className="nav-wrapper">
            <header className="nav-header">
              {/* Logo */}
              <div className="logo-container">
                <a href={logo.href} className="logo-link">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="logo-image"
                    height="26"
                    width="172"
                  />
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="desktop-nav">
                {/* Navigation Links */}
                <ul className="nav-links" role="menubar">
                  {links.map((link, index) => (
                    <li key={index} className="nav-item" role="none">
                      {link.children ? (
                        <div className="dropdown-container">
                          <button
                            className="dropdown-button"
                            aria-expanded="false"
                            aria-controls={`dropdown-${index}`}
                            role="menuitem"
                          >
                            <span className="dropdown-label">{link.label}</span>
                            <span className="dropdown-caret" aria-hidden="true">
                              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </button>
                          <div className="dropdown-menu" id={`dropdown-${index}`} role="menu">
                            <div className="dropdown-content">
                              {link.children.map((child, childIndex) => (
                                <a
                                  key={childIndex}
                                  href={child.href}
                                  className="dropdown-link"
                                  role="menuitem"
                                  {...(child.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                >
                                  <span>{child.label}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={link.href}
                          className="nav-link"
                          role="menuitem"
                          {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          <span>{link.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="nav-ctas">
                  {secondaryCTA && (
                    <a
                      href={secondaryCTA.href}
                      className="cta-secondary"
                      {...(secondaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <span>{secondaryCTA.label}</span>
                    </a>
                  )}
                  {primaryCTA && (
                    <a
                      href={primaryCTA.href}
                      className="cta-primary"
                      {...(primaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <span>{primaryCTA.label}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="hamburger-lines">
                  <span className="hamburger-line top"></span>
                  <span className="hamburger-line bottom"></span>
                </span>
              </button>
            </header>

            {/* Mobile Menu */}
            <div
              className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
              id="mobile-menu"
              role="region"
              aria-labelledby="mobile-menu-button"
            >
              <div className="mobile-menu-content">
                {/* Mobile Navigation Links */}
                <ul className="mobile-nav-links">
                  {links.map((link, index) => (
                    <li key={index} className="mobile-nav-item">
                      {link.children ? (
                        <details className="mobile-dropdown">
                          <summary className="mobile-dropdown-summary">
                            {link.label}
                            <svg className="mobile-dropdown-caret" width="12" height="12" viewBox="0 0 8 14" fill="none">
                              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </summary>
                          <ul className="mobile-dropdown-links">
                            {link.children.map((child, childIndex) => (
                              <li key={childIndex}>
                                <a
                                  href={child.href}
                                  className="mobile-dropdown-link"
                                  {...(child.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <a
                          href={link.href}
                          className="mobile-nav-link"
                          {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA Buttons */}
                <div className="mobile-ctas">
                  {secondaryCTA && (
                    <a
                      href={secondaryCTA.href}
                      className="mobile-cta-secondary"
                      {...(secondaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <span>{secondaryCTA.label}</span>
                    </a>
                  )}
                  {primaryCTA && (
                    <a
                      href={primaryCTA.href}
                      className="mobile-cta-primary"
                      {...(primaryCTA.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <span>{primaryCTA.label}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        /* Skip to main content */
        .skip-to-main {
          position: absolute;
          top: -40px;
          left: 6px;
          z-index: 9999;
        }

        .skip-link {
          display: inline-block;
          padding: 8px 16px;
          background: ${brandColors.primary};
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skip-link:focus {
          opacity: 1;
        }

        /* Navigation */
        .navigation {
          position: relative;
          z-index: 1000;
        }

        .navigation.sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }

        .scroll-detector {
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background: transparent;
        }

        .nav-background {
          background: ${colors.base.white};
          border-bottom: 1px solid ${colors.primary[200]};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navigation.scrolled .nav-background {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom-color: ${colors.primary[300]};
        }

        .nav-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 640px) {
          .nav-wrapper {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .nav-wrapper {
            padding: 0 3rem;
          }
        }

        .nav-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
        }

        /* Logo */
        .logo-link {
          display: block;
          text-decoration: none;
        }

        .logo-image {
          height: 26px;
          width: auto;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: block;
          padding: 0.5rem 0;
          color: ${colors.primary[800]};
          text-decoration: none;
          font-weight: 500;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover,
        .nav-link:focus {
          color: ${brandColors.primary};
        }

        /* Dropdown */
        .dropdown-container {
          position: relative;
        }

        .dropdown-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          background: none;
          border: none;
          color: ${colors.primary[800]};
          font-weight: 500;
          cursor: pointer;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-button:hover,
        .dropdown-button:focus {
          color: ${brandColors.primary};
        }

        .dropdown-caret {
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-button[aria-expanded="true"] .dropdown-caret {
          transform: rotate(90deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: ${colors.base.white};
          border: 1px solid ${colors.primary[200]};
          border-radius: ${effects.borderRadius.lg};
          box-shadow: ${effects.boxShadow.lg};
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-container:hover .dropdown-menu,
        .dropdown-button[aria-expanded="true"] ~ .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-content {
          padding: 1rem;
        }

        .dropdown-link {
          display: block;
          padding: 0.5rem 0;
          color: ${colors.primary[700]};
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-link:hover,
        .dropdown-link:focus {
          color: ${brandColors.primary};
        }

        /* CTA Buttons */
        .nav-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: transparent;
          color: ${colors.primary[800]};
          text-decoration: none;
          font-weight: 500;
          border-radius: ${effects.borderRadius.md};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-secondary:hover,
        .cta-secondary:focus {
          background: ${colors.primary[50]};
          color: ${brandColors.primary};
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: ${brandColors.primary};
          color: white;
          text-decoration: none;
          font-weight: 500;
          border-radius: ${effects.borderRadius.md};
          box-shadow: ${effects.boxShadow.sm};
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary:hover,
        .cta-primary:focus {
          background: ${brandColors.primaryDark};
          box-shadow: ${effects.boxShadow.md};
          transform: translateY(-1px);
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: ${effects.borderRadius.md};
          transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 1024px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu-button:hover,
        .mobile-menu-button:focus {
          background: ${colors.primary[50]};
        }

        .hamburger-lines {
          position: relative;
          width: 20px;
          height: 14px;
        }

        .hamburger-line {
          position: absolute;
          width: 20px;
          height: 2px;
          background: ${colors.primary[800]};
          border-radius: 1px;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger-line.top {
          top: 0;
        }

        .hamburger-line.bottom {
          bottom: 0;
        }

        .mobile-menu-button[aria-expanded="true"] .hamburger-line.top {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-button[aria-expanded="true"] .hamburger-line.bottom {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 100%;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colors.base.white};
          transform: translateX(100%);
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-content {
          padding: 2rem 1.5rem;
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0 0 2rem 0;
          padding: 0;
        }

        .mobile-nav-item {
          margin-bottom: 1rem;
        }

        .mobile-nav-link {
          display: block;
          padding: 1rem 0;
          color: ${colors.primary[800]};
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: 500;
          border-bottom: 1px solid ${colors.primary[100]};
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:focus {
          color: ${brandColors.primary};
        }

        /* Mobile Dropdown */
        .mobile-dropdown {
          border-bottom: 1px solid ${colors.primary[100]};
        }

        .mobile-dropdown-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem 0;
          background: none;
          border: none;
          color: ${colors.primary[800]};
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
        }

        .mobile-dropdown-caret {
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-dropdown[open] .mobile-dropdown-caret {
          transform: rotate(90deg);
        }

        .mobile-dropdown-links {
          list-style: none;
          margin: 0;
          padding: 0 0 1rem 1rem;
        }

        .mobile-dropdown-link {
          display: block;
          padding: 0.75rem 0;
          color: ${colors.primary[700]};
          text-decoration: none;
          font-size: 1rem;
        }

        .mobile-dropdown-link:hover,
        .mobile-dropdown-link:focus {
          color: ${brandColors.primary};
        }

        /* Mobile CTAs */
        .mobile-ctas {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-cta-secondary,
        .mobile-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-decoration: none;
          font-weight: 500;
          border-radius: ${effects.borderRadius.md};
          text-align: center;
          font-size: 1rem;
        }

        .mobile-cta-secondary {
          background: transparent;
          color: ${colors.primary[800]};
          border: 2px solid ${colors.primary[200]};
        }

        .mobile-cta-secondary:hover,
        .mobile-cta-secondary:focus {
          background: ${colors.primary[50]};
          border-color: ${brandColors.primary};
          color: ${brandColors.primary};
        }

        .mobile-cta-primary {
          background: ${brandColors.primary};
          color: white;
          box-shadow: ${effects.boxShadow.sm};
        }

        .mobile-cta-primary:hover,
        .mobile-cta-primary:focus {
          background: ${brandColors.primaryDark};
          box-shadow: ${effects.boxShadow.md};
        }
      `}</style>
    </>
  );
};

export default Navigation;