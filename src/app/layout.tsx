import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'A modern, minimalistic developer portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3061580844965201"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
