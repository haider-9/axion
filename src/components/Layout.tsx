'use client';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;