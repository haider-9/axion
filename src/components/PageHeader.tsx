'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ name: string; href?: string }>;
}

const PageHeader = ({ title, titleHighlight, subtitle, breadcrumbs }: PageHeaderProps) => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const defaultBreadcrumbs =
    breadcrumbs ||
    (() => {
      const paths = pathname.split('/').filter(Boolean);
      const breadcrumbItems = [{ name: 'Home', href: '/' }];

      let currentPath = '';
      paths.forEach((path, index) => {
        currentPath += `/${path}`;
        const isLast = index === paths.length - 1;
        breadcrumbItems.push({
          name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
          href: isLast ? '' : currentPath,
        });
      });

      return breadcrumbItems;
    })();

  return (
    <div className="w-full bg-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumbs */}
        <div className="text-md font-bold text-[var(--color-logo)] mb-8">
          {defaultBreadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span>{crumb.name}</span>
              )}
              {index < defaultBreadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </div>

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {titleHighlight ? (
              <>
                {title} <span className="text-blue-600">{titleHighlight}</span>
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
