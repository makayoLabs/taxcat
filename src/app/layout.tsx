import './globals.css';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import { Providers } from '@/components/Providers';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'TaxCat - Smarter Tax Help That Actually Cares',
  description:
    'Professional tax expertise meets modern simplicity. Get the maximum refund without the corporate complexity.',
  keywords: 'tax filing, Canadian taxes, tax refund, tax preparation, TaxCat',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://taxcat.ca'),
  icons: {
    icon: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}>
      <body className={`${inter.className} theme-taxcat antialiased`}>
        <Providers>
          <UnifiedNavigation />
          {children}
          <PerformanceMonitor />
        </Providers>

        {/* Analytics Placeholder */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(): void {dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
