import styles from './SplitHero.module.css'
import CTAButton from './CTAButton'
import Image from 'next/image'
import React from 'react'

export default function SplitHero(): JSX.Element {
  return (
    <section
      className={styles.section}
      style={{
        // Custom props allow per-section theming
        '--background': '#E6E1D8',
        '--background-start-color': '#E6E1D8',
      } as React.CSSProperties}
    >
      <div className={styles.container}>
        <div className={styles.hero}>
          {/* Left: Text */}
          <div className={styles.textContainer}>
            <div className={styles.eyebrow}><p>Wealthsimple Presents</p></div>
            <h1 className="ws-balance ws-display-lg:3xl">For Nerds Only</h1>
            <div className="ws-text-lg:2xl">
              <p>Money nerds, assemble! On October 22 we’re announcing major upgrades for traders, portfolios, and a shiny surprise or two.</p>
            </div>
            <CTAButton as="a" href="/register">Register now</CTAButton>
          </div>

          {/* Right: Video with fallback image */}
          <div className={styles.mediaContainer} aria-hidden="true">
            <video
              className={styles.videoEl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/fallback.jpg"
              disableRemotePlayback
            >
              <source src="/video-h265.mp4" type='video/mp4; codecs="hvc1"' />
              <source src="/video.webm" type="video/webm" />
            </video>
            <Image
              src="/fallback.jpg"
              alt=""
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}







