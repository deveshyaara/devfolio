import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import ClientOnlyComponents from '@/components/client-only';

export const metadata: Metadata = {
  metadataBase: new URL('https://devesh.co.in'),
  title: 'Devesh Tiwari — Software Engineer',
  description:
    'Software Engineer specializing in backend systems, full-stack products, AI/ML applications, Smart TV ecosystems and intelligent developer tools.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Devesh Tiwari — Software Engineer',
    description:
      'Building scalable software systems, full-stack products, AI-powered applications and intelligent developer tools.',
    url: 'https://devesh.co.in',
    siteName: 'Devesh Tiwari',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devesh Tiwari — Software Engineer',
    description:
      'Backend · Full-Stack · AI/ML — scalable software systems, AI applications, and intelligent developer tools.',
  },
};

const FAVICON_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%230a0a0a'/><text x='50%25' y='50%25' dy='0.34em' text-anchor='middle' font-family='Helvetica,Arial,sans-serif' font-weight='800' font-size='20' fill='%23ffffff'>D</text></svg>";

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Devesh Tiwari',
  url: 'https://devesh.co.in',
  jobTitle: 'Software Engineer',
  description:
    'Computer Science and Engineering student building scalable software systems, full-stack products, AI-powered applications, and intelligent developer tools.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Sambhram Institute of Technology',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'AlgoUniversity',
  },
  sameAs: [
    'https://github.com/deveshyaara',
    'https://www.linkedin.com/in/deveshcodes/',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href={FAVICON_SVG} />
        <link
          rel="preload"
          href="/assets/fonts/gyByhwUxId8gMEwcGFWNOITd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body
        style={{
          fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: '#ECECEC',
          color: '#0A0A0A',
          margin: 0,
          padding: 0,
        }}
      >
        <ClientOnlyComponents />
        {children}

        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          />
        )}
      </body>
    </html>
  );
}
