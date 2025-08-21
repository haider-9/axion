'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="relative min-h-screen">
      {!isHomePage && <div className="h-24 bg-black"></div>}

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
