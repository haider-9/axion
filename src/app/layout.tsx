import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import FloatingIcon from '@/components/FloatingIcon';
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Axion Lighting Solutions',
  description:
    'Premium indoor and outdoor lighting solutions. Modern, trustworthy, and luxurious designs with a warm touch.',
  keywords:
    'lighting, indoor lighting, outdoor lighting, premium, modern, luxury, axion',
  openGraph: {
    title: 'Axion Lighting Solutions',
    description:
      'Premium indoor and outdoor lighting solutions. Modern, trustworthy, and luxurious designs with a warm touch.',
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Axion Lighting Solutions',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Axion Lighting Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axion Lighting Solutions',
    description: 'Premium indoor and outdoor lighting solutions.',
    images: ['/Logo.png'],
  },
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${inter.variable}`}>
        <Layout>
          {children}
        </Layout>
        <FloatingIcon />
      </body>
    </html>
  );
}
