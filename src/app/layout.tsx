import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TaxCat - Professional Tax Advisory & Preparation',
  description: 'Tax filing made easy, smart, and secure. Professional tax preparation and advisory services for individuals and small businesses in Canada.',
  keywords: 'tax preparation, tax advisory, Canadian taxes, small business taxes, personal taxes, tax filing',
  authors: [{ name: 'TaxCat' }],
  openGraph: {
    title: 'TaxCat - Professional Tax Advisory & Preparation',
    description: 'Tax filing made easy, smart, and secure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 