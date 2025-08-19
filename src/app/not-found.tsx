
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 rounded-full w-32 h-32 flex items-center justify-center mb-8 shadow-lg">
          <span className="text-blue-600 text-7xl font-extrabold">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6 max-w-md text-center">
          Sorry, the page you are looking for does not exist or has been moved.<br />
          Please check the URL or go back to the homepage.
        </p>
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all">
            Go to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
